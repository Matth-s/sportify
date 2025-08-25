import { formatAuthError } from "@/helpers/format-auth-error";
import { authClient } from "@/lib/auth-client";
import { AuthRes } from "../types/res-auth-types";

export const confirmEmailAction = async (token: string): Promise<AuthRes> => {
  const { error } = await authClient.verifyEmail({
    query: {
      token,
    },
  });

  if (error) {
    return {
      error: formatAuthError(error.code ?? ""),
    };
  }

  return {
    success: true,
  };
};
