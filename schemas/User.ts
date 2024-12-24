import { z } from 'zod';

const roleSchema = z.enum(['ADMIN', 'PREMIUM_USER', 'STANDARD_USER'], {
  errorMap: () => ({
    message: 'Role must be ADMIN, PREMIUM_USER, or STANDARD_USER.',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

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
  role: roleSchema,
});

export const userSchema = z.object({
  image: z.string().nullable(),
  name: z.string().nullable(),
  id: z.string(),
  role: roleSchema,
  email: z.string().email(),
  password: z.string().nullable(),
  emailVerified: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type UserSchemaType = z.infer<typeof userSchema>;
