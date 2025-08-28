import { authClient } from "@/lib/auth-client";
import { ICurrentUser } from "@/types/user-types";
import { redirect } from "next/navigation";

export const useCurrentUer = (): ICurrentUser => {
  const { isPending, data } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!data?.user) {
    return redirect("/authentification/connexion");
  }

  return data.user as ICurrentUser;
};
