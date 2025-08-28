"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { formatAxiosError } from "@/helpers/format-axios-error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { joinGroup } from "../services/join-group-service";

type JoinGroupFormProps = {
  groupId: string;
};

const JoinGroupForm = ({ groupId }: JoinGroupFormProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: joinGroup,
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
      Rejoindre
    </Button>
  );
};

export default JoinGroupForm;
