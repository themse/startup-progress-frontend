import { FC, ObjectHTMLAttributes, memo } from 'react';

type Props = ObjectHTMLAttributes<HTMLObjectElement> & {
  title: string;
  src: string;
};

export const Icon: FC<Props> = memo(({ title, src, ...props }) => (
  <object
    className="pointer-events-none"
    {...props}
    type="image/svg+xml"
    data={src}
    aria-label={title}
  />
));
