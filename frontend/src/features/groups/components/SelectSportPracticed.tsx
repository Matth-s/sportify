import React from "react";
import { SportPracticed } from "../types/group-enum-type";
import { MultiSelect } from "@/components/ui/multi-select";
import { sportPracticed } from "../constants/group-constant";

type SelectSportPracticedProps = {
  sportSelected: SportPracticed[];
  onChange: () => void;
};

const SelectSportPracticed = ({
  sportSelected,
  onChange,
}: SelectSportPracticedProps) => {
  return (
    <MultiSelect
      className="w-full!"
      maxCount={2}
      searchable={false}
      options={sportPracticed}
      value={sportSelected}
      onValueChange={onChange}
      placeholder="Sport pratiqué..."
    />
  );
};

export default SelectSportPracticed;
