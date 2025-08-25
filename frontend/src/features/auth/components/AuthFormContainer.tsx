import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthFormContainerProps = {
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
  linkFooter: React.ReactElement;
};

const AuthFormContainer = ({
  cardTitle,
  cardDescription,
  children,
  linkFooter,
}: AuthFormContainerProps) => {
  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{linkFooter}</CardFooter>
    </Card>
  );
};

export default AuthFormContainer;
