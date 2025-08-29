import { Response, Request } from 'express';
import prisma from '../../lib/prisma';

export const getGroupByIdController = async (
  req: Request,
  res: Response
) => {
  const { params } = req;

  const groupIdParams = params.groupId;

  try {
    const existingGroup = await prisma.group.findUnique({
      where: {
        id: groupIdParams,
      },
    });

    return res.status(200).json(existingGroup);
  } catch {
    return res.status(500).json({
      error: 'Une erreur est survenue',
    });
  }
};
