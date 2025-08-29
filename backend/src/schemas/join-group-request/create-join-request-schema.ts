import z from 'zod';

export const createJoinGroupRequestSchema = z.object({
  groupId: z.string(),
});

export const groupIdJoinRequestIdSchema = z.object({
  groupId: z.string(),
  joinRequestId: z.string(),
});
