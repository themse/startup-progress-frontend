import { FC } from 'react';

export const Overlay: FC = () => {
  return (
    <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 overflow-hidden" />
  );
};
