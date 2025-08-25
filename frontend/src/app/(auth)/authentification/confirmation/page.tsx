import ConfirmEmail from "@/features/auth/components/ConfirmEmail";
import MissingParamsAuth from "@/features/auth/components/MissingParamsAuth";
import React from "react";

type ConfirmationEmailPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const ConfirmationEmailPage = async ({
  searchParams,
}: ConfirmationEmailPageProps) => {
  const token = (await searchParams).token;

  if (!token) {
    return (
      <MissingParamsAuth
        textLink="Revenir à la connexion"
        path="/authentification/connexion"
        title="Token invalide"
        description="Il semblerait que ce lien soit invalide"
      />
    );
  }

  return <ConfirmEmail token={token} />;
};

export default ConfirmationEmailPage;
