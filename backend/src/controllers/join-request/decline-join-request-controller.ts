import { Request, Response } from 'express';
import { groupIdJoinRequestIdSchema } from '../../schemas/join-group-request/create-join-request-schema';
import { getJoinRequestByGroupIdRequestId } from '../../data/group-join-request-data';
import { emitDeleteJoinRequest } from '../../helpers/socket-emit';
import { deleteJoinRequestById } from '../../services/join-request-service';

export const declineJoinRequestController = async (
  req: Request,
  res: Response
) => {
  // ici l utilisateur et forcement admin ou moderateur du groupe (middleware)

  const {
    params: {
      groupId: groupIdParams,
      joinRequestId: joinRequestIdParams,
    },
  } = req;

  //verification des parametres
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
    // retourne un emit socket pour supprimer la demande
    emitDeleteJoinRequest(req, groupId, { id: joinRequestId });

    return res.status(200).json({
      message: 'La demande à été retiré',
    });
  }

  try {
    //supprimer la demande d adhesion dans le bdd
    await deleteJoinRequestById(existingJoinRequest.id);

    // retourne un emit socket pour supprimer la demande
    emitDeleteJoinRequest(req, groupId, { id: joinRequestId });

    return res.status(204).json({
      message: 'La demande à été refusé',
    });
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
