import { FC, useEffect, useState } from 'react';

import { Steps, stepsOrderList } from 'app/common/entities/Progress';
import { Checkmark as CheckmarkIcon } from 'components/icons/Checkmark';
import { ProgressStepType, useLocalStorage } from 'hooks/useLocalStorage';
import { REPOSITORY_PREFIX as PROGRESS_REPO_PREFIX } from 'app/common/repositories/ProgressRepository';
import { ProgressStepList } from './ProgressStepList';

export const ProgressSteps: FC = () => {
  const { getAllStepList, onToggleTask, prePopulateData } =
    useLocalStorage(PROGRESS_REPO_PREFIX);
  const [progressStepList, setProgressStepList] = useState<ProgressStepType>();
  const [stepCompletedStatuses, setStepCompletedStatuses] = useState<
    Map<Steps, boolean>
  >(() =>
    Object.values(Steps)
      .filter((stepItem) => stepItem !== Steps.NONE)
      .reduce((acc, item) => acc.set(item, false), new Map())
  );

  const onToggle = (taskId: string): void => {
    const updatedTask = onToggleTask(taskId);

    const taskList = progressStepList?.[updatedTask.step] ?? [];
    const updatedTaskList = taskList.map((taskItem) =>
      taskItem.id === updatedTask.id
        ? { ...taskItem, ...updatedTask }
        : taskItem
    );

    const updatedProgressStepList = {
      ...progressStepList,
      [updatedTask.step]: updatedTaskList,
    };

    setProgressStepList(updatedProgressStepList);
  };

  useEffect(() => {
    prePopulateData();
  }, [prePopulateData]);

  useEffect(() => {
    const stepList = getAllStepList();

    setProgressStepList(stepList);
  }, [getAllStepList]);

  useEffect(() => {
    if (progressStepList) {
      const updatedStepCompletedStatuses = new Map(stepCompletedStatuses);

      stepCompletedStatuses.forEach((_, stepName) => {
        const isCompleted = progressStepList[stepName].every(
          (step) => step.isChecked
        );

        updatedStepCompletedStatuses.set(stepName, isCompleted);
      });
      setStepCompletedStatuses(updatedStepCompletedStatuses);
    }
  }, [progressStepList]);

  return (
    <div className="bg-tertiary w-80 p-7">
      <section className="bg-white px-6 py-4">
        <h1 className="text-lg font-bold py-1">My startup progress</h1>
        {progressStepList &&
          stepsOrderList.map((stepName, idx) => (
            <div className="my-2" key={stepName}>
              <header className="flex justify-between items-center">
                <h2 className="flex gap-3 text-xl font-bold tracking-wide my-4">
                  <span className="bg-black text-sm text-white rounded-full w-[30px] h-[30px] flex justify-center items-center">
                    {idx + 1}
                  </span>
                  {stepName}
                </h2>
                {stepCompletedStatuses.get(stepName) && (
                  <CheckmarkIcon className="w-8 h-8 text-black" />
                )}
              </header>
              <ProgressStepList
                stepName={stepName}
                progressStepList={progressStepList}
                onToggle={onToggle}
              />
            </div>
          ))}
      </section>
    </div>
  );
};
