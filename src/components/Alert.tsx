import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { Info as InfoIcon } from './icons/Info';
import { Close as CloseIcon } from './icons/Close';
import { AlertKind } from 'context/alert/types';

const baseStyles = 'flex flex-col gap-2 p-4 xs:mx-2 text-sm rounded-lg';
const customStyles = {
  [AlertKind.INFO]:
    'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  [AlertKind.DANGER]:
    'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
  [AlertKind.SUCCESS]:
    'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
  [AlertKind.WARNING]:
    'text-yellow-700 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
  [AlertKind.DARK]:
    'text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
};

type Props = {
  title: string;
  onClose: () => void;

  type?: AlertKind;
  message?: string;
  className?: string;
  children?: ReactNode;
};

export const Alert: FC<Props> = ({
  title,
  message,
  className,
  children,
  onClose: onCloseProp,
  type = AlertKind.DANGER,
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
      {children}
    </div>
  );
};
