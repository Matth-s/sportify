import z from "zod";
import { groupJoinMode, sportEnum } from "./group-enum";

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, {
    error: "Le nom du groupe doit être renseigné",
  }),
  location: z.string().nullable(),
  code: z.string().nullable(),
  joinMode: groupJoinMode,
  sportPracticed: sportEnum,
});

export type createGroupType = z.infer<typeof createGroupSchema>;
