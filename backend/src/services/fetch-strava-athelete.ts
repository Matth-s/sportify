import { stravaAlthete } from '../schemas/strava-athlete-schema';
import { IAthleteData } from '../types/user-types';

export const getStravaAthlete = async (accessToken: string) => {
  const res = await fetch('https://www.strava.com/api/v3/athlete', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer l'athlète Strava");
  }

  const athlete = (await res.json()) as IAthleteData;

  const parseAthlete = {
    id: athlete.id,
    firstname: athlete.firstname,
    lastname: athlete.lastname,
  };

  const validatedFields = stravaAlthete.safeParse(parseAthlete);

  if (!validatedFields.success) {
    throw new Error('Donné Strava invalide');
  }

  return validatedFields.data;
};
