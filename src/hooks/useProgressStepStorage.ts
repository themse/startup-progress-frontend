import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { REPOSITORY_PREFIX as progressRepoPrefix } from 'app/common/repositories/ProgressRepository';
import { ProgressEntity, Steps } from 'app/common/entities/Progress';
import { progressStepList as mockProgressStepList } from 'app/common/mocks/data';
import { useLocalStorage } from './useLocalStorage';

export type ProgressStepType = { [stepName: string]: ProgressEntity[] };

type DataReturn = {
  getAllStepList: () => ProgressStepType;
  onToggleTask: (taskId: string) => ProgressEntity | never;

  prePopulateData: () => void;
};

// low code level. Use hook `useProgressStep` instead
export const useProgressStepStorage = (): DataReturn => {
  const { repository } = useLocalStorage(progressRepoPrefix);

  const getAllStepList = useCallback((): ProgressStepType => {
    const rawData = repository.find();

    const mappedData = rawData
      .filter((item) => item.step !== Steps.NONE)
      .sort((a, b) => a.priority - b.priority)
      .reduce((acc, item) => {
        // eslint-disable-next-line no-param-reassign
        acc[item.step] = acc[item.step] ? [...acc[item.step], item] : [item];

        return acc;
      }, {} as ProgressStepType);

    return mappedData;
  }, [repository]);

  // For test purpose
  const prePopulateData = useCallback((): void => {
    const stepList = getAllStepList();

    if (Object.keys(stepList).length > 0) {
      return;
    }

    mockProgressStepList.forEach((item) => {
      repository.create(item, item.id);
    });
  }, [getAllStepList, repository]);

  const onToggleTask = useCallback(
    (taskId: string): ProgressEntity | never => {
      const data = repository.find();
      const task = data.find((item) => item.id === taskId);

      if (task) {
        const updatedTask = { ...task, isChecked: !task.isChecked };
        const storageKey = task.id ?? uuidv4();

        return repository.update(storageKey, updatedTask);
      } else {
        throw new Error(`Task with id ${taskId} not found`);
      }
    },
    [repository]
  );

  return {
    getAllStepList,
    onToggleTask,

    prePopulateData,
  };
};
