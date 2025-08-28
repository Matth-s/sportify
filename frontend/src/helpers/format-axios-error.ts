import { AxiosError } from "axios";

export const formatAxiosError = (error: unknown): string => {
  console.log(error);

  if (error instanceof AxiosError) {
    const errorMessage =
      error.response?.data?.error ?? "Une erreur est survenue";

    return errorMessage;
  }

  return "Une erreur est survenue";
};
