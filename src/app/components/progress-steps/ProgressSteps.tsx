import { FC, useEffect, useState } from 'react';

import { stepsOrderList } from 'app/common/entities/Progress';
import { Checkmark as CheckmarkIcon } from 'components/icons/Checkmark';
import { InputCheckbox } from 'components/form/InputCheckbox';
import { ProgressStepType, useLocalStorage } from 'hooks/useLocalStorage';
import { REPOSITORY_PREFIX as PROGRESS_REPO_PREFIX } from 'app/common/repositories/ProgressRepository';

export const ProgressSteps: FC = () => {
  const { getAllStepList, onToggleTask, prePopulateData } =
    useLocalStorage(PROGRESS_REPO_PREFIX);
  const [progressStepList, setProgressStepList] = useState<ProgressStepType>();

  const onToggle = (taskId: string): void => {
    const updatedTask = onToggleTask(taskId);
    // TODO implement
  };

  useEffect(() => {
    prePopulateData();
  }, [prePopulateData]);

  useEffect(() => {
    const stepList = getAllStepList();

    setProgressStepList(stepList);
  }, [getAllStepList]);

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
                <CheckmarkIcon className="w-8 h-8 text-black" />
              </header>
              <ul className="space-y-2">
                {progressStepList[stepName].map((item) => (
                  <li key={item.id}>
                    <InputCheckbox
                      name={item.id!}
                      label={item.task}
                      isChecked={item.isChecked}
                      onChange={(): void => onToggle(item.id!)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </section>
    </div>
  );
};
