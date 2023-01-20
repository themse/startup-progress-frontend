import { FC } from 'react';

import { Steps } from 'app/common/entities/Progress';
import { ProgressStepType } from 'hooks/useLocalStorage';
import { InputCheckbox } from 'components/form/InputCheckbox';

type Props = {
  stepName: Steps;
  progressStepList: ProgressStepType;
  onToggle: (taskId: string) => void;
};

export const ProgressStepList: FC<Props> = ({
  stepName,
  progressStepList,
  onToggle,
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
              onChange={(): void => onToggle(item.id!)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
