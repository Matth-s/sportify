export type ICurrentUser = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
  username: string | null;
  displayUsername: string;
} | null;
