export const formatAuthError = (code: string): string => {
  let message;

  switch (code) {
    case "TOKEN_EXPIRED":
      message = "Le token a expiré";
      break;

    case "INVALID_TOKEN":
      message = "Token invalide";
      break;

    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      message = "Cet email est déjà utilisé";
      break;

    case "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER":
      message = "Ce nom d'utilisateur est déjà utilisé";
      break;

    default: {
      message = "Une erreur est survenue";
    }
  }

  return message;
};
