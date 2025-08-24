import * as bcrypt from 'bcryptjs';

export const hashPassword = async (
  password: string
): Promise<string> => {
  try {
    const hash = await bcrypt.hash(password, 14);

    return hash;
  } catch {
    throw new Error(
      'Une erreur est survenue lors du hachage du mot de passe'
    );
  }
};

export const comparePassword = async ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> => {
  try {
    const correctPassword = await bcrypt.compare(password, hash);

    return correctPassword;
  } catch {
    throw new Error(
      'Une erreur est survenue lors du hachage du mot de passe'
    );
  }
};
