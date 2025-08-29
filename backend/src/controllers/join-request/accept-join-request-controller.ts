import { Response, Request } from 'express';
import { groupIdJoinRequestIdSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getJoinRequestByGroupIdRequestId } from '../../data/group-join-request-data';
import { inUserInGroup } from '../../data/group-member-data';
import {
  emitDeleteJoinRequest,
  emitNewGroupMember,
} from '../../helpers/socket-emit';
import { deleteJoinRequestById } from '../../services/join-request-service';
import { createGroupMember } from '../../services/group-member-service';

export const acceptJoinRequestController = async (
  req: Request,
  res: Response
) => {
  // ici l utlisateur est admin ou moderateur (middleware)

  //verifier les parametres
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
    user: { username, image },
  } = existingJoinRequest;

  //verifier si l utlisateur est déjà dans le groupe
  const isUserAlreadyMember = await inUserInGroup({
    userId,
    groupId,
  });

  if (isUserAlreadyMember) {
    // supprimer la demande dans le socket
    emitDeleteJoinRequest(req, groupId, {
      id: existingJoinRequest.id,
    });

    //supprimer la donnée
    await deleteJoinRequestById(existingJoinRequest.id);

    return res.status(200).json({
      message: 'Cet utilisateur fait déjà parti de votre groupe',
    });
  }

  try {
    // stocker le nouveau membre dans la bdd
    const memberSaved = await createGroupMember({
      userId: existingJoinRequest.userId,
      groupId: existingJoinRequest.groupId,
    });

    //supprimer la requete de demande d adhesion
    await deleteJoinRequestById(existingJoinRequest.id);

    // supprimer la demande dans le socket
    emitDeleteJoinRequest(req, groupId, {
      id: existingJoinRequest.id,
    });

    //mettre a jour le socket des membres
    emitNewGroupMember(req, groupId, {
      ...memberSaved,
      user: {
        username,
        image,
      },
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
