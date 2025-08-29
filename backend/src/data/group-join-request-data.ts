import { JoinRequest } from '../generated/prisma';
import prisma from '../lib/prisma';

export const getJoinRequestByUserId = async (
  userId: string
): Promise<JoinRequest | null> => {
  try {
    const existingJoinRequest = await prisma.joinRequest.findFirst({
      where: {
        userId,
      },
    });

    return existingJoinRequest;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getJoinRequestByGroupId = async (groupId: string) => {
  try {
    const joinRequest = await prisma.joinRequest.findMany({
      where: {
        groupId,
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    return joinRequest;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getJoinRequestByGroupIdRequestId = async ({
  groupId,
  joinRequestId,
}: {
  groupId: string;
  joinRequestId: string;
}) => {
  try {
    const existingJoinRequest = await prisma.joinRequest.findFirst({
      where: {
        AND: [
          {
            groupId,
          },
          {
            id: joinRequestId,
          },
        ],
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    return existingJoinRequest;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
