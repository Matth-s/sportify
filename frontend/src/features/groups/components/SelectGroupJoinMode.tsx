import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { joinMode } from "../constants/group-constant";
import { JoinMode } from "../types/group-enum-type";

type SelectGroupJoinModeProps = {
  value: JoinMode;
  onChange: () => void;
};

const SelectGroupJoinMode = ({ onChange, value }: SelectGroupJoinModeProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {joinMode.map((mode) => (
            <SelectItem key={mode.value} value={mode.value}>
              {mode.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectGroupJoinMode;
