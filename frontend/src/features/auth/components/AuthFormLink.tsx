import Link from "next/link";
import React from "react";

type AuthFormLinkProps = {
  textLink: string;
  path: string;
  text: string;
};

const AuthFormLink = ({ text, textLink, path }: AuthFormLinkProps) => {
  return (
    <div className="mx-auto flex w-fit gap-x-1">
      <p>{text}</p>
      <Link href={path}>{textLink}</Link>
    </div>
  );
};

export default AuthFormLink;
