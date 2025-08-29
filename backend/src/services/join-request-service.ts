import { JoinRequest } from '../generated/prisma';
import prisma from '../lib/prisma';

export const createJoinRequest = async ({
  userId,
  groupId,
}: {
  userId: string;
  groupId: string;
}): Promise<JoinRequest> => {
  try {
    const savedData = await prisma.joinRequest.create({
      data: {
        userId,
        groupId,
      },
    });

    return savedData;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const deleteJoinRequestById = async (
  id: string
): Promise<void> => {
  try {
    await prisma.joinRequest.delete({
      where: {
        id,
      },
    });
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const deleteJoinRequest = async ({
  userId,
  groupId,
}: {
  userId: string;
  groupId: string;
}) => {
  try {
    await prisma.joinRequest.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
