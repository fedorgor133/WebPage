import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  text?: string;
  children?: ReactNode;
  className?: string;
  filled?: boolean;
} & ComponentProps<'button'>;

function Button(props: Props) {
  const { text = 'Click', children, className, filled, ...rest } = props;
  const classes = twMerge(
    'border-2 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-50 transition-colors',
    filled
      ? 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 active:bg-cyan-500'
      : 'bg-transparent text-cyan-600',
    className
  );

  return (
    <button {...rest} className={classes}>
      {children || text}
    </button>
  );
}

export default Button;
