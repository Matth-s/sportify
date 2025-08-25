import { authClient } from "@/lib/auth-client";
import { signupType } from "../schemas/signup-schema";
import { formatAuthError } from "@/helpers/format-auth-error";
import { AuthRes } from "../types/res-auth-types";

export const signupAction = async (
  credentials: signupType,
): Promise<AuthRes> => {
  const { password, username, email } = credentials;

  const { error } = await authClient.signUp.email({
    email,
    name: username,
    username,
    password,
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
