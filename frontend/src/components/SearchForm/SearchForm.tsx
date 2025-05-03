import { BiCalendarCheck, BiCalendarX } from 'react-icons/bi';
import { RiMoneyEuroCircleLine } from 'react-icons/ri';

import Text from '@/components/ui/custom/Text';
import Input from '@/components/ui/custom/Input';
import InputIcon from '@/components/ui/custom/InputIcon';

import Button from '../ui/custom/Button';
import { useForm } from 'react-hook-form';
import { SearchFormType, SearchSchema } from '@/schemas/roomSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '../ui/form';
import DatePickerHookForm from '../DatePickerHookForm';

function SearchForm() {
  const form = useForm<SearchFormType>({
    mode: 'onChange',
    resolver: zodResolver(SearchSchema)
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = form;

  function onSubmit(data: SearchFormType) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-fit w-96 mx-auto -mt-12 bg-white border border-gray-400 rounded-lg p-6 lg:w-fit lg:-mt-6 lg:row-start-2 lg:col-span-2 xl:-mt-24 2xl:-mt-52"
      >
        <Text as="span" className="font-bold text-gray-800">
          Search for available rooms
        </Text>

        <div className="flex flex-col items-stretch lg:grid lg:grid-cols-[max-content_max-content_1fr_1fr_1fr] gap-4">
          <Input
            className="py-2 w-full"
            placeholder="Location"
            {...register('location')}
            error={errors.location}
          />
          <InputIcon
            type="number"
            className="py-2"
            placeholder="Budget per night"
            startIcon={<RiMoneyEuroCircleLine className="text-gray-500" />}
            {...register('budget')}
            error={errors.budget}
          />
          <div className="relative">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <DatePickerHookForm
                  className="!py-5"
                  icon={BiCalendarCheck}
                  text="Check In"
                  field={field}
                />
              )}
            />
            {errors.checkIn && (
              <span className="text-red-300 text-sm block">
                {errors.checkIn.message}
              </span>
            )}
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <DatePickerHookForm
                  className="!py-5"
                  icon={BiCalendarX}
                  text="Check Out"
                  field={field}
                />
              )}
            />
            {errors.checkOut && (
              <span className="text-red-300 text-sm block">
                {errors.checkOut.message}
              </span>
            )}
          </div>

          <Button
            disabled={!isValid}
            className="disabled:opacity-50 disabled:cursor-not-allowed w-full py-1"
            filled
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
