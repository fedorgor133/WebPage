import { z } from 'zod';

const SearchSchema = z
  .object({
    location: z
      .string()
      .min(1, 'Location is required')
      .min(3, 'Location is too short')
      .max(50, 'Location is too long'),
    budget: z.coerce
      .number()
      .min(1, 'Budget is required')
      .max(1000, 'Budget is too high')
      .min(1, 'Budget is too low'),
    checkIn: z.coerce.date().min(new Date(), 'Check-in date is in the past'),
    checkOut: z.coerce.date().min(new Date(), 'Check-out date is in the past')
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'Check out date must be after check in date',
    path: ['checkOut']
  });

type SearchFormType = z.infer<typeof SearchSchema>;

export { SearchSchema };

export type { SearchFormType };
