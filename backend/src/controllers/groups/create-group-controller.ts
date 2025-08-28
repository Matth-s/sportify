import { Request, Response } from 'express';
import { createGroupSchema } from '../../schemas/group/create-group-schema';
import { getGroupByNormalizedName } from '../../data/group-data';
import { generateNormalizedGroupName } from '../../utils/group-utils';

import prisma from '../../lib/prisma';

export const createGroupController = async (
  req: Request,
  res: Response
) => {
  const { body, user } = req;

  const validatedData = createGroupSchema.safeDecode(body);

  if (!validatedData.success) {
    return res.status(400).json({
      error: validatedData.error.flatten((error) => {
        return {
          path: error.path,
          error: error.message,
        };
      }),
    });
  }

  const { name, code, location, joinMode, sportPracticed } =
    validatedData.data;

  //verifier le nom du groupe existe déjà
  const existingNameGroup = await getGroupByNormalizedName(name);

  if (existingNameGroup) {
    return res.status(409).json({
      error: 'Ce nom de groupe est déjà utilisé',
    });
  }

  try {
    const groupSaved = await prisma.group.create({
      data: {
        joinMode,
        name,
        location,
        sportPracticed,
        code,
        normalizedName: generateNormalizedGroupName(name),
        members: {
          create: {
            userId: user.userId,
            role: 'MODERATOR',
          },
        },
      },
    });

    return res.status(201).json(groupSaved);
  } catch (err) {
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la création du groupe',
    });
  }
};
