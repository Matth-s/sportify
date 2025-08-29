import { Response, Request } from 'express';
import prisma from '../../lib/prisma';
import { groupIdSchema } from '../../schemas/group/create-group-schema';
import { getGroupById } from '../../data/group-data';

export const getGroupByIdController = async (
  req: Request,
  res: Response
) => {
  const {
    params: { groupId: groupIdParams },
  } = req;

  const validatedParams = groupIdSchema.safeParse({
    groupId: groupIdParams,
  });

  if (!validatedParams.success) {
    return res.status(400).json({
      error: 'Requête invalide',
    });
  }

  const { groupId } = validatedParams.data;

  const existingGroup = await getGroupById(groupId);

  //si le groupe n existe pas
  if (!existingGroup) {
    return res.status(404).json({
      error: "Ce groupe n'existe pas",
    });
  }

  return res.status(200).json(existingGroup);
};
