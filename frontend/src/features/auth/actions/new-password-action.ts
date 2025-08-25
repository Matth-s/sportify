import { authClient } from "@/lib/auth-client";
import { newPasswordType } from "../schemas/new-password-schema";
import { formatAuthError } from "@/helpers/format-auth-error";

export const newPasswordAction = async (data: newPasswordType) => {
  const { token, password } = data;

  const { error } = await authClient.resetPassword({
    token,
    newPassword: password,
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
