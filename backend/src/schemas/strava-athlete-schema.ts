import z from 'zod';

export const stravaAlthete = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
});

export type stravaAltheteType = z.infer<typeof stravaAlthete>;
