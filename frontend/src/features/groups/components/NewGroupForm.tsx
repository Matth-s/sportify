"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { JoinMode } from "../types/group-enum-type";
import {
  createGroupSchema,
  createGroupType,
} from "../schemas/create-group-schema";
import { useMutation } from "@tanstack/react-query";
import { newGroupAction } from "../services/new-group-service";
import { useRouter } from "next/navigation";
import { formatAxiosError } from "@/helpers/format-axios-error";
import { toast } from "sonner";

import SelectGroupJoinMode from "./SelectGroupJoinMode";
import SubmitButton from "@/components/SubmitButton";
import FormErrorMessage from "@/components/FormErrorMessage";
import SelectSportPracticed from "./SelectSportPracticed";

const NewGroupForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: newGroupAction,
    mutationKey: ["group"],
  });

  const form = useForm<createGroupType>({
    defaultValues: {
      name: "",
      location: "",
      code: "",
      joinMode: JoinMode.PUBLIC,
      sportPracticed: [],
    },
    resolver: zodResolver(createGroupSchema),
  });

  const {
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const onSubmit = async (data: createGroupType) => {
    try {
      const groupSaved = await mutation.mutateAsync(data);

      //redirect vers le groupe qui vient d'être crée
      router.push(`/groupe/${groupSaved.id}`);

      //affichage du toast
      toast.success(`Vous venez de créer le groupe ${data.name} avec succès`);
    } catch (err) {
      form.setError("root", {
        message: formatAxiosError(err),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un nouveau groupe</CardTitle>
        <CardDescription>
          Créer un nouveau groupes avec vos amis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du groupe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="sportPracticed"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du groupe</FormLabel>
                  <FormControl>
                    <SelectSportPracticed
                      sportSelected={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="joinMode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de groupe</FormLabel>
                  <FormControl>
                    <SelectGroupJoinMode
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormErrorMessage message={root?.message} />

            <SubmitButton
              isDisabled={isSubmitting}
              textButton="Créer le groupe"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewGroupForm;
