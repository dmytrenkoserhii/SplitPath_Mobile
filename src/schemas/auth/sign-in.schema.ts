import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;
