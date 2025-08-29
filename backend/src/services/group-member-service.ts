import { Member } from '../generated/prisma';
import prisma from '../lib/prisma';

export const createGroupMember = async ({
  userId,
  groupId,
}: {
  userId: string;
  groupId: string;
}): Promise<Member> => {
  try {
    const memberSaved = await prisma.member.create({
      data: {
        userId,
        groupId,
        role: 'MEMBER',
      },
    });

    return memberSaved;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
