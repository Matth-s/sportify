"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  newPasswordSchema,
  newPasswordType,
} from "../schemas/new-password-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordAction } from "../actions/new-password-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthRes } from "../types/res-auth-types";

import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import FormSuccessMessage from "@/components/FormSuccessMessage";
import FormErrorMessage from "@/components/FormErrorMessage";
import SubmitButton from "@/components/SubmitButton";

type NewPasswordFormProps = {
  token: string;
};

const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<newPasswordType>({
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const {
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const onSubmit = async (data: newPasswordType): Promise<void> => {
    setSuccess(undefined);

    try {
      const res: AuthRes = await newPasswordAction(data);

      if (res.error) {
        return form.setError("root", {
          message: res.error,
        });
      }

      if (res?.success) {
        toast.success("Le mot de passe a été modifié avec succès");
        router.replace("/authentification/connexion");
      }
    } catch {
      form.setError("root", {
        message: "Une erreur est survenue",
      });
    }
  };

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>Nouveau mot de passe</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
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
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
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
              text="Afficher les mots de passe"
              isChecked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />

            <FormSuccessMessage message={success} />
            <FormErrorMessage message={root?.message} />

            <SubmitButton isDisabled={isSubmitting} textButton="S'inscrire" />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewPasswordForm;
