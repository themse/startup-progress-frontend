export enum AlertKind {
  INFO = 'info',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  DARK = 'dark',
}

export type AlertType = {
  type: AlertKind;

  title: string;
  message?: string;
};

export type AlertState = {
  alertList: AlertType[];

  pushAlert: (alertItem: AlertType) => void;
  shiftAlert: () => void;
};

export const CLOSING_TIMER_MS = 3000;
