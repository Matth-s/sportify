"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { emailSchema, emailType } from "../schemas/email-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import FormSuccessMessage from "@/components/FormSuccessMessage";
import FormErrorMessage from "@/components/FormErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendRestPassword } from "../actions/send-reset-password";

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<emailType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
  });

  const {
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const onSubmit = async (data: emailType) => {
    setSuccess(undefined);

    try {
      const res = await sendRestPassword(data);

      if (res?.error) {
        return form.setError("root", {
          message: res.error,
        });
      }

      if (res?.success) {
        setSuccess("L'email vous a été envoyé avec succès");
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
        <CardTitle>Réinitialisé le mot de passe</CardTitle>
        <CardDescription>
          Entrez votre email pour recevoir une demande de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent>
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

            <FormSuccessMessage message={success} />
            <FormErrorMessage message={root?.message} />

            <SubmitButton
              isDisabled={isSubmitting}
              textButton={"Recevoir l'email de réinitialisation"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
