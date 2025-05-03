import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TextProps = {
  as?: 'p' | 'span';
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
} & ComponentProps<'p'>;

function Text(props: TextProps) {
  const { as = 'p', children, className, variant, ...rest } = props;

  const Tag = as;

  const classMap = {
    p: '',
    span: 'inline-block'
  };

  const variantMap = {
    primary: 'text-cyan-600',
    secondary: 'text-blue-800',
    tertiary: 'text-indigo-400'
  };

  const defaultClasses = 'mb-3 text-gray-600';

  const classes = twMerge(defaultClasses, classMap[Tag], variant && variantMap[variant], className);

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Text;
