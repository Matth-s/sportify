import { z } from 'zod';
import { groupJoinMode, sportEnum } from './group-enum';

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, {
    error: 'Le nom du groupe doit être renseigné',
  }),
  location: z
    .string()
    .trim()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  code: z
    .string()
    .trim()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  joinMode: groupJoinMode,
  sportPracticed: sportEnum.default([]),
});
