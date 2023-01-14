import { FC, ChangeEvent } from 'react';
import clsx from 'clsx';

import { Checkmark as CheckmarkIcon } from 'components/icons/Checkmark';

const Checkbox: FC<{ isChecked?: boolean }> = ({ isChecked = false }) => {
  return (
    <div
      className={clsx([
        'flex justify-center items-center rounded-sm w-3.5 h-3.5',
        isChecked && 'bg-primary',
        !isChecked && 'border border-secondary',
      ])}
    >
      {isChecked && <CheckmarkIcon className="w-2 h-2 text-white" />}
    </div>
  );
};

type Props = {
  name: string;
  onChange: ({ name, isChecked }: { name: string; isChecked: boolean }) => void;

  label?: string;
  isChecked?: boolean;
};

export const InputCheckbox: FC<Props> = ({
  name,
  label,
  onChange: onChangeProp,

  isChecked = false,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChangeProp({ name, isChecked: event.target.checked });
  };

  return (
    <label className="cursor-pointer flex items-center gap-2 text-sm">
      <input
        name={name}
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={onChange}
      />
      <Checkbox isChecked={isChecked} />
      {label && <p>{label}</p>}
    </label>
  );
};
