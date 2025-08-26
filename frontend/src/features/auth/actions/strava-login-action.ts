import { formatAuthError } from "@/helpers/format-auth-error";
import { authClient } from "@/lib/auth-client";

export const stravaLoginAction = async () => {
  const { error } = await authClient.signIn.oauth2({
    providerId: "strava",
    disableRedirect: false,
    callbackURL: "http://localhost:3000",
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
