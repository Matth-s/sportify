import z from "zod";

export const signupSchema = z
  .object({
    email: z.email({
      error: "Email invalide",
    }),
    username: z.string().trim(),
    password: z.string().min(8, {
      error: "Le mot de passe doit avoir une longueur de 8 minimum",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type signupType = z.infer<typeof signupSchema>;
