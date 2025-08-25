import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type MissingParamsAuthProps = {
  path: string;
  title: string;
  description: string;
  textLink: string;
};

const MissingParamsAuth = ({
  path,
  title,
  description,
  textLink,
}: MissingParamsAuthProps) => {
  return (
    <Card className="w-lg">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Link href={path} className="mx-auto block w-fit">
          <Button>{textLink}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MissingParamsAuth;
