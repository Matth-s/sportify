"use client";

import React from "react";

import HomeSidebar from "@/components/HomeSidebar";
import GroupList from "@/features/groups/components/GroupList";
import NewGroupDialog from "@/features/groups/components/NewGroupDialog";
import NotificationList from "@/features/notifications/components/NotificationList";
import SearchBar from "@/components/SearchBar";

import { useCurrentUer } from "@/helpers/user-helper";
import { ICurrentUser } from "@/types/user-types";

const HomePage = () => {
  const user: ICurrentUser = useCurrentUer();

  return (
    <div className="relative flex min-h-full w-full gap-x-8">
      <HomeSidebar />
      <div className="flex w-full gap-x-8 p-8">
        <div className="flex h-full w-full flex-col gap-4">
          <SearchBar className="mb-4" />
          <GroupList />
        </div>

        <div className="sticky top-8 right-4 flex h-[calc(100vh-64px)] min-w-80 flex-col gap-y-8 bg-red-300">
          <NewGroupDialog />
          <NotificationList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
