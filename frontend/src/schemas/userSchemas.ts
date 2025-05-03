import { z } from 'zod';

const UserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name is too short')
    .max(50, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .max(100, 'Email is too long'),
  role: z.enum(['guest', 'host', 'admin']),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password is too short')
    .max(32, 'Password is too long')
});

const SignUpSchema = UserSchema.extend({
  repeatPassword: z
    .string()
    .min(1, 'Repeat Password is required')
    .min(4, 'Repeat Password is too short')
    .max(32, 'Repeat Password is too long')
}).refine((data) => data.password === data.repeatPassword, {
  message: 'Passwords do not match',
  path: ['repeatPassword']
});

const LoginSchema = UserSchema.pick({
  email: true,
  password: true
});

type SignUpFormType = z.infer<typeof SignUpSchema>;
type LoginFormType = z.infer<typeof LoginSchema>;

export { UserSchema, SignUpSchema, LoginSchema };

export type { SignUpFormType, LoginFormType };
