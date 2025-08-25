"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, emailType } from "../schemas/email-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendNewVerificationEmailAction } from "../actions/send-new-confirm-email-action";
import { AuthRes } from "../types/res-auth-types";

import FormSuccessMessage from "@/components/FormSuccessMessage";
import FormErrorMessage from "@/components/FormErrorMessage";
import SubmitButton from "@/components/SubmitButton";

type FormEmailProps = {
  type: "email-verification" | "reset-password";
  textButton: string;
  title: string;
  description: string;
  submitButtonText: string;
};

const FormEmail = ({
  type,
  submitButtonText,
  textButton,
  title,
  description,
}: FormEmailProps) => {
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

  const onSubmit = async (data: emailType): Promise<void> => {
    setSuccess(undefined);

    try {
      const res: AuthRes = await sendNewVerificationEmailAction(data);

      if (res?.error) {
        return form.setError("root", {
          message: res.error,
        });
      }

      if (res.success) {
        setSuccess("Un email vous a été envoyé");
      }
    } catch {
      form.setError("root", {
        message: "Une erreur est survenue",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">{textButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
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
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSuccessMessage message={success} />
            <FormErrorMessage message={root?.message} />

            <SubmitButton
              isDisabled={isSubmitting}
              textButton={submitButtonText}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEmail;
