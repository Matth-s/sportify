"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { askToJoinGroup } from "../services/ask-to-join-group-service";
import { toast } from "sonner";
import { formatAxiosError } from "@/helpers/format-axios-error";
import { useRouter } from "next/navigation";

type AskToJoinGroupFormProps = {
  groupId: string;
};

const AskToJoinGroupForm = ({ groupId }: AskToJoinGroupFormProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: askToJoinGroup,
    mutationKey: ["group"],
  });

  const handleClick = async () => {
    try {
      const { message, join } = await mutation.mutateAsync(groupId);

      toast.success(message);

      if (join) {
        router.push(`/groupe/${groupId}`);
      }
    } catch (err) {
      toast.error(formatAxiosError(err));
    }
  };

  return (
    <Button onClick={() => handleClick()} disabled={mutation.isPending}>
      Postuler
    </Button>
  );
};

export default AskToJoinGroupForm;
