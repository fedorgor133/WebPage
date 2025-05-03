import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'div'>;

function Box(props: Props) {
  const { children, className, ...rest } = props;

  const classes = twMerge('border border-cyan-600 p-4 rounded-lg', className);

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default Box;
