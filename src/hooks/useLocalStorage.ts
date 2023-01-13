import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  ProgressRepository,
  REPOSITORY_PREFIX as progressRepoPrefix,
} from 'app/common/repositories/ProgressRepository';
import { ProgressEntity, Steps } from 'app/common/entities/Progress';

const repositoryFactory = (prefixKey: string) => {
  if (prefixKey === progressRepoPrefix) {
    return ProgressRepository.getInstance();
  }
  throw new Error(`Repository with prefix [${prefixKey}] not found`);
};

type ProgressStepType = { [key: string]: ProgressEntity[] };

type DataReturn = {
  getAllStepList: () => ProgressStepType;
  getValuesByStep: (step: Steps) => ProgressEntity[] | null;
  onToggleTask: (taskId: string) => ProgressEntity | never;
};

export const useLocalStorage = (prefixKey: string): DataReturn => {
  const repository = repositoryFactory(prefixKey);

  const getAllStepList = useCallback((): ProgressStepType => {
    const data = repository.find();

    const mappedData = data
      .filter((item) => item.step !== Steps.NONE)
      .sort((a, b) => a.priority - b.priority)
      .reduce((acc, item) => {
        // eslint-disable-next-line no-param-reassign
        acc[item.step] = acc[item.step] ? [...acc[item.step], item] : [item];

        return acc;
      }, {} as ProgressStepType);

    return mappedData;
  }, [repository]);

  const getValuesByStep = useCallback(
    (step: Steps): ProgressEntity[] | null => {
      const stepList = getAllStepList();

      return step in stepList ? stepList[step] : null;
    },
    [getAllStepList]
  );

  const _generateStorageKey = useCallback((data: ProgressEntity): string => {
    const taskId = data.id ?? uuidv4();

    return [data.step, taskId].join('-');
  }, []);

  const onToggleTask = useCallback(
    (taskId: string): ProgressEntity | never => {
      const data = repository.find();
      const task = data.find((item) => item.id === taskId);

      if (task) {
        const updatedTask = { ...task, isChecked: !task.isChecked };
        const storageKey = _generateStorageKey(task);

        return repository.update(storageKey, updatedTask);
      } else {
        throw new Error(`Task with id ${taskId} not found`);
      }
    },
    [_generateStorageKey, repository]
  );

  return {
    getAllStepList,
    getValuesByStep,
    onToggleTask,
  };
};
