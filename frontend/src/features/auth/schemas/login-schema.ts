import z from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Identifiant requis")
    .refine(
      (val) => {
        if (val.includes("@")) {
          return z.string().email().safeParse(val).success;
        }
        return true;
      },
      {
        message: "Email invalide",
      },
    ),
  password: z.string().min(1, "Mot de passe requis"),
});

export type loginType = z.infer<typeof loginSchema>;
