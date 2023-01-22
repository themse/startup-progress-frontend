import { v4 as uuidv4 } from 'uuid';

import { ProgressEntity, Steps } from 'app/common/entities/Progress';

export const progressStepList: Required<ProgressEntity>[] = [
  {
    id: uuidv4(),
    step: Steps.FOUNDATION,
    task: 'Setup virtual office',
    isChecked: false,
    priority: 1000,
  },
  {
    id: uuidv4(),
    step: Steps.FOUNDATION,
    task: 'Set mission & vision',
    isChecked: false,
    priority: 1002,
  },
  {
    id: uuidv4(),
    step: Steps.FOUNDATION,
    task: 'Select business name',
    isChecked: false,
    priority: 1003,
  },
  {
    id: uuidv4(),
    step: Steps.FOUNDATION,
    task: 'By domains',
    isChecked: false,
    priority: 1004,
  },
  {
    id: uuidv4(),
    step: Steps.DISCOVERY,
    task: 'Create roadmap',
    isChecked: false,
    priority: 1000,
  },
  {
    id: uuidv4(),
    step: Steps.DISCOVERY,
    task: 'Competitor analysis',
    isChecked: false,
    priority: 1001,
  },
  {
    id: uuidv4(),
    step: Steps.DELIVERY,
    task: 'Release marketing website',
    isChecked: false,
    priority: 1001,
  },
  {
    id: uuidv4(),
    step: Steps.DELIVERY,
    task: 'Release MVP',
    isChecked: false,
    priority: 1002,
  },
];
