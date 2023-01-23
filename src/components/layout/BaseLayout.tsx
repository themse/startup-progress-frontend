import { Alert } from 'components/Alert';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen min-w-[320px] flex justify-between flex-col py-2 relative">
      {/* Header */}

      <main className="flex-1">{children}</main>

      {/* Footer */}

      <Alert
        className="absolute top-2 left-1 right-1"
        title="Hello World!"
        message="Change a few things up and try
        submitting again."
        onClose={() => console.log('close')}
      />
    </div>
  );
};
