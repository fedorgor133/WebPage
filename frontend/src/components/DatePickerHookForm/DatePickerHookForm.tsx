import * as React from 'react';
import { format } from 'date-fns';
import { LuCalendar } from 'react-icons/lu';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { IconType } from 'react-icons';
import { ControllerRenderProps } from 'react-hook-form';

type DatePickerHookFormProps = {
  icon?: IconType;
  text?: string;
  field: ControllerRenderProps<
    {
      location: string;
      budget: number;
      checkIn: Date;
      checkOut: Date;
    },
    'checkIn' | 'checkOut'
  >;
} & React.ComponentProps<'input'>;

function DatePickerHookForm(props: DatePickerHookFormProps) {
  const { icon, text, className, field } = props;

  const Icon = icon || LuCalendar;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !field.value && 'text-muted-foreground',
            className
          )}
        >
          <Icon className="text-muted-foreground" />
          {field.value ? (
            format(field.value, 'PP')
          ) : (
            <span>{text || 'Pick a date'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePickerHookForm;
