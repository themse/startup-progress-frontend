import { FC, useEffect } from 'react';

import { Checkmark as CheckmarkIcon } from 'components/icons/Checkmark';
import { ProgressStepList } from './ProgressStepList';
import { useProgressStep } from 'hooks/useProgressStep';
import { useStepCompletedStatus } from 'hooks/useStepCompletedStatus';

export const ProgressSteps: FC = () => {
  const { progressStepList, onToggle } = useProgressStep();

  const { completedStatusList, onChangeCompletedStatusList } =
    useStepCompletedStatus();

  useEffect(() => {
    if (progressStepList) {
      onChangeCompletedStatusList(progressStepList);
    }
  }, [progressStepList, onChangeCompletedStatusList]);

  return (
    <div className="bg-tertiary w-80 p-7">
      <section className="bg-white px-6 py-4">
        <h1 className="text-lg font-bold py-1">My startup progress</h1>
        {progressStepList &&
          completedStatusList.map(
            ({ stepName, isCompleted, isDisabled }, idx) => (
              <div className="my-2" key={stepName}>
                <header className="flex justify-between items-center">
                  <h2 className="flex gap-3 text-xl font-bold tracking-wide my-4">
                    <span className="bg-black text-sm text-white rounded-full w-[30px] h-[30px] flex justify-center items-center">
                      {idx + 1}
                    </span>
                    {stepName}
                  </h2>
                  {isCompleted && (
                    <CheckmarkIcon className="w-8 h-8 text-black" />
                  )}
                </header>
                <ProgressStepList
                  progressStepList={progressStepList[stepName]}
                  onToggle={onToggle}
                  isDisabled={isDisabled}
                />
              </div>
            )
          )}
      </section>
    </div>
  );
};
