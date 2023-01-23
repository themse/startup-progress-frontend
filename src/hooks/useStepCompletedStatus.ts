import { useState, useCallback, useEffect } from 'react';

import { stepsOrderList } from 'app/common/entities/Progress';
import { ProgressStepType } from './useProgressStepStorage';

type CompletedStatus = {
  stepName: typeof stepsOrderList[number];
  isCompleted: boolean;
  isDisabled: boolean;
};

type DataReturn = {
  completedStatusList: CompletedStatus[];
  isAllStepsCompleted: boolean;

  onChangeCompletedStatusList: (progressStepList: ProgressStepType) => void;
};

const initialCompletedStatusState = stepsOrderList.map((stepName, idx) => {
  const startIdx = 0;

  return {
    stepName,
    isCompleted: false,
    isDisabled: startIdx !== idx,
  };
});

export const useStepCompletedStatus = (): DataReturn => {
  const [completedStatusList, setCompletedStatusList] = useState<
    CompletedStatus[]
  >(initialCompletedStatusState);
  const [isAllStepsCompleted, setIsAllStepsCompleted] = useState(false);

  const _initializeStatusList = (
    stepList: ProgressStepType,
    statusList: CompletedStatus[]
  ): CompletedStatus[] => {
    return statusList.map((statusData) => {
      const isCompleted = stepList![statusData.stepName].every(
        (step) => step.isChecked
      );

      return {
        ...statusData,
        isCompleted,
      };
    });
  };

  const _updateStatusDependsOnPrev = (
    statusList: CompletedStatus[]
  ): CompletedStatus[] => {
    const startIdx = 0;

    return statusList.reduce((acc, current, idx) => {
      let mutCurrent = { ...current };
      const previous = acc[idx - 1];

      if (idx === startIdx) {
        acc.push(mutCurrent);
      } else {
        mutCurrent = previous.isCompleted
          ? { ...mutCurrent, isDisabled: false }
          : { ...mutCurrent, isDisabled: true, isCompleted: false };

        acc.push(mutCurrent);
      }

      return acc;
    }, [] as CompletedStatus[]);
  };

  const onChangeCompletedStatusList = useCallback(
    (progressStepList: ProgressStepType): void => {
      setCompletedStatusList((prevStatusList) => {
        const updatedStatusList = _initializeStatusList(
          progressStepList,
          prevStatusList
        );

        return _updateStatusDependsOnPrev(updatedStatusList);
      });
    },
    []
  );

  useEffect(() => {
    const updatedIsAllStepsCompleted = completedStatusList.every(
      (statusData) => statusData.isCompleted
    );

    setIsAllStepsCompleted(updatedIsAllStepsCompleted);
  }, [completedStatusList]);

  return {
    completedStatusList,
    isAllStepsCompleted,
    onChangeCompletedStatusList,
  };
};
