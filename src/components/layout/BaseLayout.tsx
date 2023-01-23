import { FC, ReactNode } from 'react';

import { Alert } from 'components/Alert';
import { useAlert } from 'context/alert';

type Props = {
  children: ReactNode;
};

export const BaseLayout: FC<Props> = ({ children }) => {
  const { alertList, shiftAlert: closeAlert } = useAlert();

  return (
    <div className="min-h-screen min-w-[320px] flex justify-between flex-col py-2 relative">
      {/* Header */}

      <main className="flex-1">{children}</main>

      {/* Footer */}

      {alertList.length > 0 && (
        <Alert
          className="absolute top-2 left-1 right-1"
          type={alertList[0].type}
          title={alertList[0].title}
          message={alertList[0].message}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};
