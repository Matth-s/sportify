import { Request, Response } from 'express';
import { groupIdSchema } from '../../schemas/group/create-group-schema';
import { getJoinRequestByGroupId } from '../../data/group-join-request-data';

export const getJoinRequestController = async (
  req: Request,
  res: Response
) => {
  const { params } = req;

  const validatedParams = groupIdSchema.safeParse({
    groupId: params.groupId,
  });

  if (!validatedParams.success) {
    return res.status(400).json({
      error: 'Requête invalide',
    });
  }

  const { groupId } = validatedParams.data;

  try {
    const request = await getJoinRequestByGroupId(groupId);

    return res.status(200).json(request);
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
