import { config } from 'dotenv';

config();

const RESEND_KEY = process.env.RESEND_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID as string;
const STRAVA_CLIENT_SECRET = process.env
  .STRAVA_CLIENT_SECRET as string;

export {
  RESEND_KEY,
  FRONTEND_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
};
