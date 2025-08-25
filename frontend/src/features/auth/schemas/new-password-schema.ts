import z from "zod";

export const newPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(1, {
      error: "Mot de passe requis",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type newPasswordType = z.infer<typeof newPasswordSchema>;
