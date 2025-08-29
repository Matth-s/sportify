import { Response, Request } from 'express';
import { groupIdJoinRequestIdSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getJoinRequestByGroupIdRequestId } from '../../data/group-join-request-data';
import { inUserInGroup } from '../../data/group-member-data';
import prisma from '../../lib/prisma';

export const acceptJoinRequestController = async (
  req: Request,
  res: Response
) => {
  // ici l utlisateur est admin ou moderateur
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
    return res.status(404).json({
      error: "Cet demande n'existe pas",
    });
  }

  const {
    userId,
    user: { username },
  } = existingJoinRequest;

  //verifier si l utlisateur est déjà dans le groupe
  const isUserAlreadyMember = await inUserInGroup({
    userId,
    groupId,
  });

  if (isUserAlreadyMember) {
    // envoyer un evenement socket
    req.app.get('io').to(`group-${groupId}`).emit('delete-request', {
      id: existingJoinRequest.id,
    });

    //supprimer la donnée
    await prisma.joinRequest.delete({
      where: {
        id: existingJoinRequest.id,
      },
    });

    return res.status(200).json({
      message: 'Cet utilisateur fait déjà parti de votre groupe',
    });
  }

  try {
    await prisma.member.create({
      data: {
        role: 'MEMBER',
        userId: existingJoinRequest.userId,
        groupId: existingJoinRequest.groupId,
      },
    });

    await prisma.joinRequest.delete({
      where: {
        id: existingJoinRequest.id,
      },
    });

    // mettre a jour le socket des demandes d adhesion²

    req.app.get('io').to(`group${groupId}`).emit('delete-request', {
      id: existingJoinRequest.id,
    });

    //mettre a jour le socket des membres
    req.app.get('io').to(`group-${groupId}`).emit('new-member', {
      user: 'énouveaumem',
    });

    return res.status(201).json({
      message: `Vous avez accepté la requête de ${username}`,
    });
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
