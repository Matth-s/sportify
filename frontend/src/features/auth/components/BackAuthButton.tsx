import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackAuthButton = () => {
  return (
    <div className="mb-3">
      <Link
        href="/authentification/connexion"
        className="flex w-fit flex-row items-center gap-x-1 text-xs hover:underline"
      >
        <ChevronLeft size={14} />
        <p>Revenir à la connexion</p>
      </Link>
    </div>
  );
};

export default BackAuthButton;
