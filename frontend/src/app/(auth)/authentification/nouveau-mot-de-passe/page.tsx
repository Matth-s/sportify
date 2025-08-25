import MissingParamsAuth from "@/features/auth/components/MissingParamsAuth";
import NewPasswordForm from "@/features/auth/components/NewPasswordForm";
import React from "react";

type NewPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const NewPasswordPage = async ({ searchParams }: NewPasswordPageProps) => {
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

  return <NewPasswordForm token={token} />;
};

export default NewPasswordPage;
