"use client";

import React, { useEffect, useState } from "react";
import { confirmEmailAction } from "../actions/confirm-email-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthRes } from "../types/res-auth-types";

import FormErrorMessage from "@/components/FormErrorMessage";
import FormEmailDialog from "./FormEmailDialog";

type ConfirmEmailProps = {
  token: string;
};

const ConfirmEmail = ({ token }: ConfirmEmailProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [errorContent, setErrorContent] = useState<React.ReactNode>(null);

  const verifyEmail = async (): Promise<void> => {
    try {
      const res: AuthRes = await confirmEmailAction(token);

      if (res?.error) {
        //afficher le composant pour recevoir une nouvelle confirmation si le token a expiré
        if (res.error === "Le token a expiré") {
          setErrorContent(
            <FormEmailDialog
              textButton="Envoyer un nouveau email"
              title="Email de confirmation"
              description="Entrez votre email pour recevoir une nouvelle confirmation"
              submitButtonText="Recevoir l'email de confirmation"
              type="email-verification"
            />,
          );
        }

        return setError(res.error);
      }

      if (res?.success) {
        toast.success("Votre email a été vérifié avec succès");
        router.replace("/");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) return;

    verifyEmail();
  }, [token]);

  return (
    <Card className="w-lg">
      <CardHeader className="text-center">
        <CardTitle>Vérification de votre email</CardTitle>
        <CardDescription>
          Cela ne sera pas long veuillez patienter
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <Loader className="mx-auto h-10 w-10 animate-spin" />}

        {error && (
          <>
            <FormErrorMessage message={error} />
            {errorContent}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfirmEmail;
