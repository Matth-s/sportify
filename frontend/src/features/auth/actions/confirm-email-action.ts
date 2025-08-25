import { formatAuthError } from "@/helpers/format-auth-error";
import { authClient } from "@/lib/auth-client";

export const confirmEmailAction = async (token: string) => {
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
