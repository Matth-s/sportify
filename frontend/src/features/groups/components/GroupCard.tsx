import React from "react";
import { IGroupList } from "../types/group-interface";
import { TableCell } from "@/components/ui/table";
import JoinGroupButton from "./JoinGroupButton";
import Image from "next/image";

type GroupCardProps = {
  group: IGroupList;
};

const GroupCard = ({ group }: GroupCardProps) => {
  const {
    id,
    image,
    _count: { members: memberCount },
    name,
    location,
    sportPracticed,
    members,
    joinRequest,
    joinMode,
  } = group;

  return (
    <>
      <TableCell>
        {image ? (
          <Image src={image} width={40} height={40} alt={group.name} />
        ) : null}
      </TableCell>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">
        {location ?? "Non renseigné"}
      </TableCell>
      <TableCell className="text-center"> {memberCount}</TableCell>
      <TableCell className="text-center">{sportPracticed}</TableCell>
      <TableCell className="text-right">
        <JoinGroupButton
          isInGroup={members.length > 0}
          hasJoinRequest={joinRequest.length > 0}
          groupJoinMode={joinMode}
          id={id}
        />
      </TableCell>
    </>
  );
};

export default GroupCard;
