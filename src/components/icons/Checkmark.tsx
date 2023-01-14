import { FC, SVGProps } from 'react';
import clsx from 'clsx';

type Props = SVGProps<SVGSVGElement>;

export const Checkmark: FC<Props> = ({ className }) => {
  return (
    <svg
      className={clsx('fill-current', className)}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 417 417"
      role="img"
    >
      <path
        d="M159.7,364.3c-4,4-9.4,6.2-15.1,6.2s-11.1-2.2-15.1-6.2L9.4,244c-12.5-12.5-12.5-32.7,0-45.2l15.1-15.1
	c12.5-12.5,32.7-12.5,45.2,0l75.1,75.1L347.4,56.1c12.5-12.5,32.7-12.5,45.2,0l15.1,15.1c12.5,12.5,12.5,32.7,0,45.2L159.7,364.3z"
      ></path>
    </svg>
  );
};
