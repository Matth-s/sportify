"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthFormContainer from "./AuthFormContainer";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { signupSchema, signupType } from "../schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupAction } from "../actions/signup-action";
import FormErrorMessage from "@/components/FormErrorMessage";
import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import FormSuccessMessage from "@/components/FormSuccessMessage";
import AuthFormLink from "./AuthFormLink";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<signupType>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const {
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const onSubmit = async (data: signupType) => {
    setSuccess(undefined);

    try {
      const res = await signupAction(data);

      if (res.error) {
        return form.setError("root", {
          message: res.error,
        });
      }

      if (res?.success) {
        setSuccess("Un email de confirmation vous a été envoyé");
      }
    } catch {
      form.setError("root", {
        message: "Une erreur est survenue",
      });
    }
  };

  return (
    <AuthFormContainer
      linkFooter={
        <AuthFormLink
          text="Vous avez déjà un compte ?"
          path="/authentification/connexion"
          textLink="Connectez-vous"
        />
      }
      cardTitle="Inscrivez-vous à Sport-groupe"
      cardDescription="Inscrivez vous avec des identifiants avec Strava"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} type={showPassword ? "text" : "password"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} type={showPassword ? "text" : "password"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ShowPasswordCheckbox
            text="Afficher les mots de passe"
            isChecked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />

          <FormSuccessMessage message={success} />
          <FormErrorMessage message={root?.message} />

          <SubmitButton isDisabled={isSubmitting} textButton="S'inscrire" />
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default SignupForm;
