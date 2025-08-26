export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image: null | string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  displayUsername: string;
  id: string;
}

export interface IAthleteData {
  id: number;
  username: null;
  resource_state: 2;
  firstname: string;
  lastname: string;
  bio: null;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: Date;
  updated_at: Date;
  badge_type_id: number;
  weight: null;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
}
