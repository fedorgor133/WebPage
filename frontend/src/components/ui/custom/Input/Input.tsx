import { ComponentProps, useId, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  type?: string;
  className?: string;
  errorClassName?: string;
  label?: string;
  labelPosition?: 'above' | 'left';
  labelClassName?: string;
  error?: FieldError | undefined;
} & ComponentProps<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref) {
  const {
    type = 'text',
    label,
    labelPosition,
    labelClassName,
    className,
    errorClassName,
    error,
    ...rest
  } = props;

  const id = useId();

  const positionLabelClasses = labelPosition === 'above' ? 'block' : '';
  const labelClasses = twMerge('mr-4', positionLabelClasses, labelClassName);
  const inputClasses = twMerge(
    'border rounded-lg px-6 py-2 focus:outline-gray-400',
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
      <input id={id} type={type} className={inputClasses} ref={ref} {...rest} />
      {error && <span className={errorClasses}>{error.message}</span>}
    </div>
  );
});

export default Input;
