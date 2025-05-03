import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
} & ComponentProps<'h1'>;

function Heading(props: HeadingProps) {
  const { as = 'h1', children, variant, className, ...rest } = props;

  const Tag = as;

  const variantMap = {
    primary: 'text-cyan-600',
    secondary: 'text-blue-800',
    tertiary: 'text-indigo-400'
  };

  const classMap = {
    h1: 'font-bold text-4xl',
    h2: 'font-bold text-3xl',
    h3: 'font-bold text-2xl',
    h4: 'font-bold text-xl',
    h5: 'text-lg',
    h6: 'text-md'
  };

  const defaultClasses = 'mb-3 text-gray-800';

  const classes = twMerge(
    defaultClasses,
    classMap[Tag],
    variant && variantMap[variant],
    className
  );

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Heading;
