import { Request, Response } from 'express';
import { groupIdJoinRequestIdSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getJoinRequestByGroupIdRequestId } from '../../data/group-join-request-data';
import prisma from '../../lib/prisma';

export const declineJoinRequestController = async (
  req: Request,
  res: Response
) => {
  // l initiateur de la requete esadmin ou moderateur du groupe

  const {
    params: {
      groupId: groupIdParams,
      joinRequestId: joinRequestIdParams,
    },
  } = req;

  const validatedParams = groupIdJoinRequestIdSchema.safeParse({
    joinRequestId: joinRequestIdParams,
    groupId: groupIdParams,
  });

  if (!validatedParams.success) {
    return res.status(400).json({
      error: 'Requête invalide',
    });
  }

  const { groupId, joinRequestId } = validatedParams.data;

  const existingJoinRequest = await getJoinRequestByGroupIdRequestId({
    groupId,
    joinRequestId,
  });

  //verifier si la requete existe toujours
  if (!existingJoinRequest) {
    // mettre a jour le status

    req.app
      .get('io')
      .to(`group${groupId}`)
      .emit(`group-${groupId}:delete-request`, {
        id: joinRequestId,
      });

    return res.status(200).json({
      message: 'La demande à été retiré',
    });
  }

  try {
    await prisma.joinRequest.delete({
      where: {
        id: existingJoinRequest.id,
      },
    });

    // mettre a jour le socket des demandes d adhesion
    req.app
      .get('io')
      .to(`group-${groupId}`)
      .emit(`group-${groupId}:delete-request`, {
        id: existingJoinRequest.id,
      });

    return res.status(204).json({
      message: 'La demande à été refusé',
    });
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
