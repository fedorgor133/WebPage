import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type HoverBoxProps = {
  children: ReactNode;
  boxContent: ReactNode;
  className?: string;
  separation?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5';
  position?: 'top' | 'bottom' | 'left' | 'right';
} & ComponentProps<'span'>;

function HoverBox(props: HoverBoxProps) {
  const { children, boxContent, position, className, ...rest } = props;

  const positionMap = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2',
    left: 'right-full top-1/2 transform -translate-y-1/2',
    right: 'left-full top-1/2 transform -translate-y-1/2'
  };

  const separationMarginMap = {
    1: 'my-1',
    2: 'my-2',
    3: 'my-3',
    4: 'my-4',
    5: 'my-5'
  };

  const separationBeforeMap = {
    1: 'before:-inset-2',
    2: 'before:-inset-3',
    3: 'before:-inset-4',
    4: 'before:-inset-5',
    5: 'before:-inset-6'
  };

  const classes = twMerge(
    'z-50 absolute w-max border border-cyan-600 bg-white p-4 rounded-lg',
    'invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 ease-in-out',
    'before:content-[""] before:inset-0 before:z-[-10] before:absolute before:opacity-0 before:group-hover:visible before:group-hover:opacity-100 before:transition-opacity before:duration-300 before:ease-in-out',
    separationMarginMap[props.separation || 1],
    separationBeforeMap[props.separation || 1],
    positionMap[position || 'top'],
    className
  );

  return (
    <div className=" relative group">
      {children}
      <span className={classes} {...rest}>
        {boxContent}
      </span>
    </div>
  );
}

export default HoverBox;
