import { config } from 'dotenv';

config();

const RESEND_KEY = process.env.RESEND_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

export { RESEND_KEY, FRONTEND_URL };
