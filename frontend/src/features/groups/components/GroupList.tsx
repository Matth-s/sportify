"use client";

import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getGroupList } from "../services/get-group-service";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GroupCard from "./GroupCard";

const GroupList = () => {
  const { data, status, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["group"],
    queryFn: ({ pageParam }) => getGroupList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: () => 1,
  });

  console.log(data?.pages.flatMap((item) => item));

  if (status === "pending") {
    return <p>Chargement des composants group</p>;
  }

  if (status === "error") {
    return <p>Une erreur est survenue</p>;
  }

  return (
    <Table className="border-gray rounded-lg border-1 p-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">{/*Image du groupe*/}</TableHead>
          <TableHead className="text-center">Nom</TableHead>
          <TableHead className="text-center">Ville</TableHead>
          <TableHead className="text-center">Membres</TableHead>
          <TableHead className="text-center">Sports</TableHead>
          <TableHead className="w-20 text-right">{/* bouton join */}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((group) => (
              <TableRow key={group.id}>
                <GroupCard group={group} />
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default GroupList;
