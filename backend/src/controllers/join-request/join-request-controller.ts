import { Response, Request } from 'express';
import { createJoinGroupRequestSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getGroupByIdWithMemberAndJoinRequest } from '../../data/group-member-data';
import {
  createJoinRequest,
  deleteJoinRequest,
} from '../../services/join-request-service';
import { createGroupMember } from '../../services/create-group-member';

export const joinGroupController = async (
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

  //verifier si le groupe existe bien
  if (!existingGroup) {
    return res.status(404).json({
      error: "Ce groupe n'existe pas",
    });
  }

  const { members, joinRequest, joinMode } = existingGroup;

  //si le membre a été banni
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

  //verifier l'état du group joinMode

  //le groupe est fermé
  if (joinMode === 'PRIVATE') {
    return res.status(403).json({
      error: 'Ce groupe est fermé vous ne pouvez pas le rejoindre',
    });
  }

  // le groupe est sur invitation
  if (joinMode === 'INVITATION') {
    await createJoinRequest({
      groupId,
      userId: user.userId,
    });

    return res.status(201).json({
      join: false,
      message: `Vous avez fait une demande pour rejoindre le groupe ${existingGroup.name}`,
    });
  }

  try {
    // créer le nouvel utilisateur
    await createGroupMember({
      groupId,
      userId: user.userId,
    });

    //supprimer la demande d adhésion s il y en a une
    if (joinRequest.length > 0) {
      await deleteJoinRequest({
        groupId,
        userId: user.userId,
      });
    }

    //mettre a jour le socket avec le nouveau membre

    return res.status(201).json({
      join: true,
      message: `Vous faites désormais partie du groupe ${existingGroup.name}`,
    });
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
