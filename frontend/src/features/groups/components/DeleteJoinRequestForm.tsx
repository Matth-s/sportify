"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { formatAxiosError } from "@/helpers/format-axios-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteJoinRequest } from "../services/delete-join-service";

type DeleteJoinRequestFormProps = {
  groupId: string;
};

const DeleteJoinRequestForm = ({ groupId }: DeleteJoinRequestFormProps) => {
  const mutation = useMutation({
    mutationFn: deleteJoinRequest,
    mutationKey: ["group"],
  });

  const handleClick = async () => {
    try {
      const { message } = await mutation.mutateAsync(groupId);

      toast.success(message);
    } catch (err) {
      toast.error(formatAxiosError(err));
    }
  };

  return (
    <Button onClick={() => handleClick()} disabled={mutation.isPending}>
      Supprimer la demande
    </Button>
  );
};

export default DeleteJoinRequestForm;
