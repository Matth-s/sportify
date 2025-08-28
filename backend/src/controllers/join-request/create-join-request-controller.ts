import { Response, Request } from 'express';
import { createJoinGroupRequestSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getGroupByIdWithMemberAndJoinRequest } from '../../data/group-member-data';
import { createGroupMember } from '../../services/create-group-member';

import prisma from '../../lib/prisma';

export const createJoinRequestController = async (
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

  //recupere le groupe le membre avec l id et la demande d'adhésion
  const existingGroup = await getGroupByIdWithMemberAndJoinRequest({
    groupId,
    userId: user.userId,
  });

  //si le group n existe pas
  if (!existingGroup) {
    return res.status(404).json({
      error: "Ce groupe n'existe pas",
    });
  }

  const { members, joinRequest, joinMode } = existingGroup;

  //verifier si le user est banni
  if (members[0]?.role === 'BANNED') {
    return res.status(403).json({
      error: 'Vous avez été banni de ce groupe',
    });
  }

  //l utilisateur fait deja parti des membres
  if (members.length > 0) {
    return res.status(200).json({
      join: true,
      message: 'Vous faites déjà parti de ce groupe',
    });
  }

  //l utilisateur a deja fais une demande
  if (joinRequest.length > 0) {
    return res.status(200).json({
      join: false,
      message: 'Vous avez déjà fait une demande pour ce groupe',
    });
  }

  //verfier l'état du group joinMode

  //le groupe est fermé
  if (joinMode === 'PRIVATE') {
    return res.status(403).json({
      error: 'Ce groupe est fermé vous ne pouvez pas le rejoindre',
    });
  }

  // le groupe est ouvert
  if (joinMode === 'PUBLIC') {
    await createGroupMember({
      groupId,
      userId: user.userId,
    });

    return res.status(201).json({
      join: true,
      message: `Vous faites désormais partie du groupe ${existingGroup.name}`,
    });
  }

  try {
    // stocker la nouvelle requete dans la bdd
    await prisma.joinRequest.create({
      data: {
        groupId,
        userId: user.userId,
      },
    });

    // actualiser les demandes dans le group (websocket)

    return res.status(201).json({
      join: false,
      message: `Vous avez demandé à rejoindre le groupe ${existingGroup.name}`,
    });
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
