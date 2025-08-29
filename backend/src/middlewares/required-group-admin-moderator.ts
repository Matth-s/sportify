import { Request, Response, NextFunction } from 'express';
import { groupIdSchema } from '../schemas/group/create-group-schema';
import { getGroupUserRole } from '../data/group-member-data';

export const requiredGroupAdminOrModerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, params } = req;

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
    const existingMember = await getGroupUserRole({
      groupId,
      userId: user.userId,
    });

    if (!existingMember) {
      return res.status(401).json({
        error: 'Vous ne faites pas partie de ce groupe',
      });
    }

    const { role } = existingMember;

    if (role !== 'MODERATOR' && role !== 'ADMIN') {
      return res.status(403).json({
        error:
          "Vous n'avez pas les droits pour effectuer cette action",
      });
    }

    next();
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
