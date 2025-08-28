import { Group } from '../generated/prisma';
import prisma from '../lib/prisma';
import { generateNormalizedGroupName } from '../utils/group-utils';

export const getGroupByNormalizedName = async (
  name: string
): Promise<Group | null> => {
  try {
    const existingGroup = await prisma.group.findUnique({
      where: {
        normalizedName: generateNormalizedGroupName(name),
      },
    });

    return existingGroup;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
