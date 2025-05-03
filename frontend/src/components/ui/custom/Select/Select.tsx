import { ComponentProps, useId, forwardRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
  className?: string;
  errorClassName?: string;
  label?: string;
  labelPosition?: 'above' | 'left';
  labelClassName?: string;
  error?: FieldError | undefined;
  children: ReactNode;
} & ComponentProps<'select'>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function (
  props,
  ref
) {
  const {
    label,
    labelPosition,
    labelClassName,
    className,
    errorClassName,
    error,
    children,
    ...rest
  } = props;

  const id = useId();

  const positionLabelClasses = labelPosition === 'above' ? 'block' : '';
  const labelClasses = twMerge('mr-4', positionLabelClasses, labelClassName);
  const selectClasses = twMerge(
    'border rounded-lg px-4 py-2 focus:outline-gray-400',
    className
  );
  const errorClasses = twMerge('text-red-300 text-sm block', errorClassName);

  return (
    <div className="relative">
      {label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <select id={id} className={selectClasses} ref={ref} {...rest}>
        {children}
      </select>
      {error && <span className={errorClasses}>{error.message}</span>}
    </div>
  );
});

export default Select;
