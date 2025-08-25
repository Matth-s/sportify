import z from "zod";

export const newPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8, {
      error: "Le mot de passe doit avoir une longueur de 8 minimum",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type newPasswordType = z.infer<typeof newPasswordSchema>;
