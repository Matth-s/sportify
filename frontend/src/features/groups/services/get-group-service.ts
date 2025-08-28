import { baseAxios } from "@/lib/axios";
import { IGroupList } from "../types/group-interface";

type getGroupListProps = {
  pageParam: number;
};

export const getGroupList = async ({
  pageParam,
}: getGroupListProps): Promise<{
  data: IGroupList[];
}> => {
  try {
    const { data } = await baseAxios.get(`/group?cursor=${pageParam ?? ""}`);

    return data;
  } catch (err) {
    throw err;
  }
};
