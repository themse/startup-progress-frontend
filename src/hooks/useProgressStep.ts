import { useEffect, useState } from 'react';

import {
  ProgressStepType,
  useProgressStepStorage,
} from './useProgressStepStorage';

type DataReturn = {
  onToggle: (taskId: string) => void;

  progressStepList?: ProgressStepType;
};

export const useProgressStep = (): DataReturn => {
  const { getAllStepList, onToggleTask, prePopulateData } =
    useProgressStepStorage();

  const [progressStepList, setProgressStepList] = useState<ProgressStepType>();

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

  return { progressStepList, onToggle };
};
