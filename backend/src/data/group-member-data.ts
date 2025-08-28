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
