import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen min-w-[320px] flex justify-between flex-col py-2">
      {/* Header */}

      <main className="flex-1">{children}</main>

      {/* Footer */}
    </div>
  );
};
