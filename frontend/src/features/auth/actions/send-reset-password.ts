import { authClient } from "@/lib/auth-client";
import { emailType } from "../schemas/email-schema";
import { formatAuthError } from "@/helpers/format-auth-error";
import { AuthRes } from "../types/res-auth-types";

export const sendRestPassword = async (data: emailType): Promise<AuthRes> => {
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
