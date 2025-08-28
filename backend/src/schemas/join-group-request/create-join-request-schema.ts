import z from 'zod';

export const createJoinGroupRequestSchema = z.object({
  groupId: z.string(),
});
