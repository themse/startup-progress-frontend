export enum Steps {
  FOUNDATION = 'Foundation',
  DISCOVERY = 'Discovery',
  DELIVERY = 'Delivery',

  NONE = 'none',
}

export const stepsOrderList = [
  Steps.FOUNDATION,
  Steps.DISCOVERY,
  Steps.DELIVERY,
] as const;

export interface ProgressEntity {
  step: Steps;
  task: string;
  priority: number;
  isChecked: boolean;

  id?: string;
}
