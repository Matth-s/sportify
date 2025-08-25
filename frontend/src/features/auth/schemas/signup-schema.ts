import z from "zod";

export const signupSchema = z
  .object({
    email: z.email({
      error: "Email invalide",
    }),
    username: z.string().trim(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type signupType = z.infer<typeof signupSchema>;
