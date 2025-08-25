import { authClient } from "@/lib/auth-client";
import { emailType } from "../schemas/email-schema";
import { formatAuthError } from "@/helpers/format-auth-error";

export const sendRestPassword = async (data: emailType) => {
  const { error } = await authClient.requestPasswordReset({
    email: data.email,
  });

  if (error) {
    console.log(error);

    return {
      error: formatAuthError(error.code ?? ""),
    };
  }

  return {
    success: true,
  };
};
