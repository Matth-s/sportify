"use client";

import React, { useState } from "react";
import { loginSchema, loginType } from "../schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from "../actions/login-action";
import { useRouter } from "next/navigation";
import { AuthRes } from "../types/res-auth-types";

import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import FormErrorMessage from "@/components/FormErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import AuthFormContainer from "./AuthFormContainer";
import AuthFormLink from "./AuthFormLink";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<loginType>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const onSubmit = async (data: loginType) => {
    try {
      const res: AuthRes = await loginAction(data);

      if (res.error) {
        return form.setError("root", {
          message: res.error,
        });
      }

      if (res.success) {
        router.replace("/");
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
          text="Vous n'avez pas de compte ? "
          path="/authentification/inscription"
          textLink="Inscrivez-vous"
        />
      }
      cardTitle="Connectez-vous à Sport-groupe"
      cardDescription="Connectez vous avec des identifiants avec Strava"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
        >
          <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ou nom d&apos;utilisateur</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
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
                <div className="flex justify-between">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href={"/authentification/mot-de-passe-oublie"}
                    className="text-foreground text-xs hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ShowPasswordCheckbox
            text="Afficher le mot de passe"
            isChecked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />

          <FormErrorMessage message={root?.message} />

          <SubmitButton isDisabled={isSubmitting} textButton="S'inscrire" />
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default LoginForm;
