import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewGroupForm from "./NewGroupForm";

const NewGroupDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Créer un groupe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>de</DialogTitle>
          <DialogDescription>dede</DialogDescription>
        </DialogHeader>
        <NewGroupForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupDialog;
