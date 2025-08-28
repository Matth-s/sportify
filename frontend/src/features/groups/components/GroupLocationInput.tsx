import React from "react";

type GroupLocationInputProps = {
  code: string | null;
  location: string | null;
};

const GroupLocationInput = ({ code, location }: GroupLocationInputProps) => {
  console.log(code, location);

  return <div></div>;
};

export default GroupLocationInput;
