import React from "react";

type FormSuccessMessageProps = {
  message?: string;
};

const FormSuccessMessage = ({ message }: FormSuccessMessageProps) => {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-green-300 bg-green-100 px-4 py-2 text-center text-sm font-semibold text-green-700 shadow-md">
      {message}
    </div>
  );
};

export default FormSuccessMessage;
