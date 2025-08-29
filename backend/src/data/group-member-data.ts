import { Member } from '../generated/prisma';
import prisma from '../lib/prisma';

export const getGroupByIdWithMemberAndJoinRequest = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          where: {
            userId,
          },
        },
        joinRequest: {
          where: {
            userId,
          },
        },
      },
    });

    return group;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getGroupUserRole = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}): Promise<Member | null> => {
  try {
    const existingMember = await prisma.member.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });

    return existingMember;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const inUserInGroup = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const user = await prisma.member.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });

    return !!user;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getGroupMemberWithImageAndUsername = async (
  groupId: string
) => {
  try {
    const members = await prisma.member.findMany({
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

    return members;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
