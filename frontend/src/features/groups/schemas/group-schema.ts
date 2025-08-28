import z from "zod";
import { groupJoinMode, sportEnum } from "./group-enum";

export const groupSchema = z.object({
  code: z.string().nullable(),
  createdAt: z.string(),
  id: z.string(),
  image: z.string().nullable(),
  joinMode: groupJoinMode,
  location: z.string().nullable(),
  name: z.string(),
  normalizedName: z.string(),
  sportPracticed: sportEnum,
});

export const joinRequestResponseSchema = z.object({
  join: z.boolean(),
  message: z.string(),
});

export type joinRequestResponseType = z.infer<typeof joinRequestResponseSchema>;
