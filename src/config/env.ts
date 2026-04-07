import * as z from 'zod';

const EnvSchema = z.object({
  API_URL: z.string(),
});
// console.log(import.meta.env)
export const env = EnvSchema.parse({
  API_URL: import.meta.env.VITE_APP_API_URL,
});