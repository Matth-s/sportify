import { baseAxios } from "@/lib/axios";
import { createGroupType } from "../schemas/create-group-schema";
import { IGroup } from "../types/group-interface";
import { groupSchema } from "../schemas/group-schema";

export const newGroupAction = async (
  formData: createGroupType,
): Promise<IGroup> => {
  try {
    const { data } = await baseAxios.post("/group/new-group", formData);

    //valider les données de retour
    const validatedData = groupSchema.parse(data);

    return validatedData;
  } catch (err) {
    throw err;
  }
};
