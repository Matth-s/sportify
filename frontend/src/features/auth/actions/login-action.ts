import { authClient } from "@/lib/auth-client";
import { loginType } from "../schemas/login-schema";
import { formatAuthError } from "@/helpers/format-auth-error";

export const loginAction = async (credentials: loginType) => {
  const { identifier, password } = credentials;

  let errorCode;

  if (identifier.includes("@")) {
    //connexion avec l email

    const { error } = await authClient.signIn.email({
      email: identifier,
      password,
    });

    errorCode = error?.code ?? "";
  } else {
    //connexion avec le username
    const { error } = await authClient.signIn.username({
      username: identifier,
      password,
    });

    errorCode = error?.code ?? "";
  }

  if (errorCode) {
    return {
      error: formatAuthError(errorCode),
    };
  }

  return {
    success: true,
  };
};
