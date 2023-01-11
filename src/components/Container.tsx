import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return (
    <div className="xl:container px-4 xl:px-8">
      <div className="xl:-mx-4">{children}</div>
    </div>
  );
};
