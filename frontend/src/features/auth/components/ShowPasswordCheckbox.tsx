import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

type ShowPasswordCheckboxProps = {
  text: string;
  onChange: () => void;
  isChecked: boolean;
};

const ShowPasswordCheckbox = ({
  text,
  onChange,
  isChecked,
}: ShowPasswordCheckboxProps) => {
  return (
    <div className="flex flex-row gap-x-2">
      <Checkbox
        className="cursor-pointer"
        id="showPassword"
        checked={isChecked}
        onCheckedChange={onChange}
      />
      <Label htmlFor="showPassword" className="cursor-pointer">
        {text}
      </Label>
    </div>
  );
};

export default ShowPasswordCheckbox;
