import { Response, Request, NextFunction } from 'express';
import prisma from '../lib/prisma';

export const requiredUserInGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, params } = req;

  const groupIdParams = params.groupId;
  try {
    const existingGroup = await prisma.group.findUnique({
      where: {
        id: groupIdParams,
      },
      select: {
        members: {
          where: {
            NOT: {
              role: 'BANNED',
            },
            userId: user.userId,
          },
        },
      },
    });

    if (!existingGroup) {
      return res.status(404).json({
        error: "Ce groupe n'existe pas",
      });
    }

    const { members } = existingGroup;

    if (members.length === 0) {
      return res.status(401).json({
        error: 'Vous ne faites pas partie de ce groupe',
      });
    }

    next();
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
