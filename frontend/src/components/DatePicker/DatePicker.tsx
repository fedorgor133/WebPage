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

type DatePickerProps = {
  icon?: IconType;
  text?: string;
} & React.ComponentProps<'input'>;

function DatePicker(props: DatePickerProps) {
  const { icon, text, className } = props;

  const [date, setDate] = React.useState<Date>();
  const Icon = icon || LuCalendar;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <Icon className="text-muted-foreground" />
          {date ? format(date, 'PP') : <span>{text || 'Pick a date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
