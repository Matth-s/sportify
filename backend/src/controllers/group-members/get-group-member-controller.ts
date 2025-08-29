import { Response, Request } from 'express';
import { groupIdSchema } from '../../schemas/group/create-group-schema';
import { getGroupMemberWithImageAndUsername } from '../../data/group-member-data';

export const getGroupMemberController = async (
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
    const groupMembers =
      await getGroupMemberWithImageAndUsername(groupId);

    return res.status(200).json(groupMembers);
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
