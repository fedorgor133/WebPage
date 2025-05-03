import { ReactNode } from "react";
import Text from "../ui/custom/Text";
import { twMerge } from "tailwind-merge";

type DataCounterProps = {
  count: number;
  label?: string;
  countClassName?: string;
  labelClassName?: string;  
  plusIcon?: boolean | ReactNode;
  className?: string;
} & React.ComponentProps<'div'>;

function DataCounter(props: DataCounterProps) {
  const { count = 0, label, className,  countClassName, labelClassName, plusIcon, ...rest } = props;


  const classes = twMerge('flex flex-col items-center gap-2', className);
  const countClasses = twMerge('text-3xl font-bold text-gray-800', countClassName);
  const labelClasses = twMerge('text-sm font-medium text-gray-600', labelClassName);
  const icon = typeof plusIcon === 'boolean' ? (plusIcon ? '+' : null) : plusIcon;

  return (
    <div className={classes} {...rest}>
      <span className={countClasses}>{count}{plusIcon && <Text as="span" className="m-0" variant="primary">{icon}</Text>}</span>
      <span className={labelClasses}>{label}</span>
    </div>
  );
}

export default DataCounter;
