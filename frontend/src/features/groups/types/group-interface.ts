import { GroupMemberRole, JoinMode, SportPracticed } from "./group-enum-type";

export interface IGroup {
  code: string | null;
  createdAt: string;
  id: string;
  image: null | string;
  joinMode: JoinMode;
  location: string | null;
  name: string;
  normalizedName: string;
  sportPracticed: SportPracticed[];
}

export interface IGroupList extends IGroup {
  joinRequest: {
    createdAt: string;
  }[];
  members: {
    role: GroupMemberRole;
  }[];
  _count: {
    members: number;
  };
}
