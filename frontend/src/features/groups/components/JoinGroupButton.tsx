import React from "react";
import { JoinMode } from "../types/group-enum-type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AskToJoinGroupForm from "./AskToJoinGroupForm";
import JoinGroupForm from "./JoinGroupForm";
import DeleteJoinRequestForm from "./DeleteJoinRequestForm";

type JoinGroupButtonProps = {
  isInGroup: boolean;
  hasJoinRequest: boolean;
  groupJoinMode: JoinMode;
  id: string;
};

const JoinGroupButton = ({
  isInGroup,
  hasJoinRequest,
  id,
  groupJoinMode,
}: JoinGroupButtonProps) => {
  let content;

  // l utilisateur est membre du groupe
  if (isInGroup) {
    return (content = (
      <Link href={`/groupe/${id}`}>
        <Button className="w-full cursor-pointer">Afficher</Button>
      </Link>
    ));
  }

  console.log(!JoinMode.PUBLIC);

  if (hasJoinRequest && JoinMode.PUBLIC) {
    return (content = <DeleteJoinRequestForm groupId={id} />);
  }

  switch (groupJoinMode) {
    //groupe fermer
    case JoinMode.PRIVATE:
      content = <Button className="cursor-pointer">Fermé</Button>;
      break;
    //groupe sur invitation
    case JoinMode.INVITATION:
      content = <AskToJoinGroupForm groupId={id} />;
      break;
    //le groupe est ouvert
    case JoinMode.PUBLIC:
      content = <JoinGroupForm groupId={id} />;
      break;

    default: {
      content = null;
    }
  }

  //l'utilisateur a faire une demande d hadesion

  return <>{content}</>;
};

export default JoinGroupButton;
