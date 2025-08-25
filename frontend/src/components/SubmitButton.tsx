import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  textButton: string;
  className?: string;
  isDisabled: boolean;
};

const SubmitButton = ({
  textButton,
  className,
  isDisabled,
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={isDisabled}
      className={cn("w-full cursor-pointer", className)}
    >
      {textButton}
    </Button>
  );
};

export default SubmitButton;
