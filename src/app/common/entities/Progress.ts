export enum Steps {
  FOUNDATION = 'Foundation',
  DISCOVERY = 'Discovery',
  DELIVERY = 'Delivery',

  NONE = 'none',
}

export interface ProgressEntity {
  step: Steps;
  task: string;
  priority: number;
  isChecked: boolean;

  id?: string;
}
