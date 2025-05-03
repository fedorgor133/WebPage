import { ComponentProps, useId, forwardRef, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = {
  type?: string;
  className?: string;
  errorClassName?: string;
  label?: string;
  labelPosition?: "above" | "left";
  labelClassName?: string;
  error?: FieldError | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
} & ComponentProps<"input">;

const InputIcon = forwardRef<HTMLInputElement, InputProps>(function (
  props,
  ref
) {
  const {
    type = "text",
    label,
    labelPosition,
    labelClassName,
    className,
    errorClassName,
    error,
    startIcon,
    endIcon,
    ...rest
  } = props;

  const id = useId();

  const positionLabelClasses = `mr-4 ${
    labelPosition === "above" ? "block mb-2" : ""
  }`;

  const labelClasses = twMerge('mr-4', positionLabelClasses, labelClassName);
  const inputClasses = twMerge('border w-full rounded-lg px-6 py-3 text-gray-600', className, startIcon && 'pl-8', endIcon && 'pr-8');
  const errorClasses = twMerge('text-red-300 text-sm block', errorClassName);

  return (
    <div className="relative">
      {label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {startIcon}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={inputClasses}
          ref={ref}
          {...rest}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <span className={errorClasses}>{error.message}</span>
      )}
    </div>
  );
});

export default InputIcon;
