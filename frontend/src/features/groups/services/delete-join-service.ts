import { baseAxios } from "@/lib/axios";

export const deleteJoinRequest = async (groupId: string) => {
  try {
    const { data } = await baseAxios.delete(
      `/group/${groupId}/join-request/delete-request`,
    );

    return data;
  } catch (err) {
    throw err;
  }
};
