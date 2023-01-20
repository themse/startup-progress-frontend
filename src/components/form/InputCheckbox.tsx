import { FC, ChangeEvent } from 'react';
import clsx from 'clsx';

import { Checkmark as CheckmarkIcon } from 'components/icons/Checkmark';

const Checkbox: FC<{ isChecked?: boolean; isDisabled?: boolean }> = ({
  isChecked = false,
  isDisabled = false,
}) => {
  return (
    <div
      className={clsx([
        'flex justify-center items-center rounded-sm w-3.5 h-3.5',
        isChecked && !isDisabled && 'bg-primary',
        isDisabled && 'bg-secondary',
        !isChecked && 'border border-secondary',
      ])}
    >
      {isChecked && (
        <CheckmarkIcon
          className={clsx([
            'w-2 h-2',
            !isDisabled && 'text-white',
            isDisabled && 'text-secondary',
          ])}
        />
      )}
    </div>
  );
};

type Props = {
  name: string;
  onChange: ({ name, isChecked }: { name: string; isChecked: boolean }) => void;

  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
};

export const InputCheckbox: FC<Props> = ({
  name,
  label,
  onChange: onChangeProp,

  isChecked = false,
  isDisabled = false,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChangeProp({ name, isChecked: event.target.checked });
  };

  return (
    <label
      className={clsx([
        'flex items-center gap-2 text-sm',
        !isDisabled && 'cursor-pointer',
      ])}
    >
      <input
        name={name}
        type="checkbox"
        checked={isChecked}
        className={clsx(['hidden', isDisabled && 'pointer-events-none'])}
        onChange={onChange}
        disabled={isDisabled}
      />
      <Checkbox isChecked={isChecked} isDisabled={isDisabled} />
      {label && <p>{label}</p>}
    </label>
  );
};
