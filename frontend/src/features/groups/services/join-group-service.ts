import { baseAxios } from "@/lib/axios";
import {
  joinRequestResponseSchema,
  joinRequestResponseType,
} from "../schemas/group-schema";

export const joinGroup = async (
  groupId: string,
): Promise<joinRequestResponseType> => {
  try {
    const { data } = await baseAxios.post(
      `/group/${groupId}/join-request/join`,
    );

    const validatedData = joinRequestResponseSchema.parse(data);

    return validatedData;
  } catch (err) {
    throw err;
  }
};
