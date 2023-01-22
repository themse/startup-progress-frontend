import { FC } from 'react';

import { ProgressEntity } from 'app/common/entities/Progress';
import { InputCheckbox } from 'components/form/InputCheckbox';

type Props = {
  progressStepList: ProgressEntity[];
  isDisabled?: boolean;

  onToggle: (taskId: string) => void;
};

export const ProgressStepList: FC<Props> = ({
  progressStepList,
  onToggle,

  isDisabled = false,
}) => {
  return (
    <ul className="space-y-2">
      {progressStepList.map((item) => (
        <li key={item.id}>
          <InputCheckbox
            name={item.id!}
            label={item.task}
            isChecked={item.isChecked}
            isDisabled={isDisabled}
            onChange={(): void => onToggle(item.id!)}
          />
        </li>
      ))}
    </ul>
  );
};
