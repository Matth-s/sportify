import z from "zod";

export const emailSchema = z.object({
  email: z.email({
    error: "Email invalide",
  }),
});

export type emailType = z.infer<typeof emailSchema>;
