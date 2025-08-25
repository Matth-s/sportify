import { formatAuthError } from "@/helpers/format-auth-error";
import { authClient } from "@/lib/auth-client";
import { emailType } from "../schemas/email-schema";
import { AuthRes } from "../types/res-auth-types";

export const sendNewVerificationEmailAction = async (
  data: emailType,
): Promise<AuthRes> => {
  const { error } = await authClient.sendVerificationEmail({
    email: data.email,
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
