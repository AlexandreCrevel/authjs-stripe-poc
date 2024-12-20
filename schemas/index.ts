import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required.',
  }),
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  role: z.enum(['ADMIN', 'PREMIUM_USER', 'STANDARD_USER'], {
    errorMap: () => ({
      message: 'Role must be ADMIN, PREMIUM_USER, or STANDARD_USER.',
    }),
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
