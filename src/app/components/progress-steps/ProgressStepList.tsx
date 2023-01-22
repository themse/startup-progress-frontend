import { FC } from 'react';

import { Steps } from 'app/common/entities/Progress';
import { ProgressStepType } from 'hooks/useLocalStorage';
import { InputCheckbox } from 'components/form/InputCheckbox';

type Props = {
  stepName: Steps;
  progressStepList: ProgressStepType;
  isDisabled?: boolean;

  onToggle: (taskId: string) => void;
};

export const ProgressStepList: FC<Props> = ({
  stepName,
  progressStepList,
  onToggle,

  isDisabled = false,
}) => {
  return (
    <div>
      <ul className="space-y-2">
        {progressStepList[stepName].map((item) => (
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
    </div>
  );
};
