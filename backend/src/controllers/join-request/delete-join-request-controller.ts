import { Request, Response } from 'express';
import { createJoinGroupRequestSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getGroupByIdWithMemberAndJoinRequest } from '../../data/group-member-data';
import { deleteJoinRequest } from '../../services/join-request-service';

export const deleteJoinRequestController = async (
  req: Request,
  res: Response
) => {
  const { user, params } = req;

  const groupIdParams = params.groupId;

  const validatedQuery = createJoinGroupRequestSchema.safeParse({
    groupId: groupIdParams,
  });

  if (!validatedQuery.success) {
    return res.status(400).json({
      error: 'Requête invalide',
    });
  }

  const { groupId } = validatedQuery.data;

  const existingGroup = await getGroupByIdWithMemberAndJoinRequest({
    groupId,
    userId: user.userId,
  });

  if (!existingGroup) {
    return res.status(404).json({
      error: "Ce groupe n'existe pas",
    });
  }

  const { joinRequest } = existingGroup;

  //verifier si l utilisateur a une demande d'adhesion en cours
  if (joinRequest.length === 0) {
    return res.status(200).json({
      message: 'Votre demande à été retiré',
    });
  }

  try {
    await deleteJoinRequest({
      groupId,
      userId: user.userId,
    });

    // mettre a jour le socket
    req.app.get('io').emit(`group-${groupId}`).to('delete-request', {
      id: joinRequest[0].id,
    });

    return res.status(200).json({
      message: 'Votre demande à été retiré',
    });
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
