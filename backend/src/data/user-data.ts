import prisma from '../lib/prisma';

export const getUsernameAndImageById = async (
  id: string
): Promise<{
  username: string;
  image: string | null;
}> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new Error("Cet utilisateur n'existe pas");
    }

    return existingUser;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
