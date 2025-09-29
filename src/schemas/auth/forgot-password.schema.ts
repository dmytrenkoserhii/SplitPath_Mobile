import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
