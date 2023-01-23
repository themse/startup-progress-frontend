import { FC } from 'react';
import clsx from 'clsx';

import { Info as InfoIcon } from './icons/Info';
import { Close as CloseIcon } from './icons/Close';

enum AlertTypes {
  INFO = 'info',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  DARK = 'dark',
}

const baseStyles = 'flex flex-col gap-2 p-4 xs:mx-2 text-sm rounded-lg';
const customStyles = {
  [AlertTypes.INFO]:
    'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  [AlertTypes.DANGER]:
    'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
  [AlertTypes.SUCCESS]:
    'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
  [AlertTypes.WARNING]:
    'text-yellow-700 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
  [AlertTypes.DARK]:
    'text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
};

type Props = {
  title: string;
  onClose: () => void;

  type?: AlertTypes;
  message?: string;
  className?: string;
};

export const Alert: FC<Props> = ({
  title,
  message,
  className,
  onClose: onCloseProp,
  type = AlertTypes.DANGER,
}) => {
  const onClose = (): void => {
    onCloseProp();
  };

  return (
    <div
      className={clsx([baseStyles, customStyles[type], className])}
      role="alert"
    >
      <div className="flex gap-2">
        <InfoIcon />
        <span className="sr-only">{type}</span>
        <div>
          <span className="font-medium">{title}</span>{' '}
          {message && <span>{message}</span>}
        </div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:cursor-pointer hover:bg-blue-200 dark:hover:bg-gray-700"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
