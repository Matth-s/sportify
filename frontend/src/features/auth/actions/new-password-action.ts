import { authClient } from "@/lib/auth-client";
import { newPasswordType } from "../schemas/new-password-schema";
import { formatAuthError } from "@/helpers/format-auth-error";
import { AuthRes } from "../types/res-auth-types";

export const newPasswordAction = async (
  data: newPasswordType,
): Promise<AuthRes> => {
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
