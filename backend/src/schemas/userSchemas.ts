import { z } from 'zod';

const IdSchema = z.coerce.number({
  invalid_type_error: 'The ID must be a number',
});

const SignupSchema = z.object({
  name: z.string().min(1, 'Name required').max(50, 'Max 50 characters'),
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email required')
    .max(150, 'Max 150 characters'),
  password: z.string().min(1, 'Password required').max(16, 'Max 16 characters'),
  role: z.enum(['host', 'guest']),
});

const LoginSchema = SignupSchema.pick({
  email: true,
  password: true,
});

const ValidateEmailSchema = z.object({
  code: z.string().min(1, 'Code required').uuid('Invalid code'),
  email: z.string().min(1, 'Email required').email('Invalid email'),
});

export { IdSchema, SignupSchema, LoginSchema, ValidateEmailSchema };
