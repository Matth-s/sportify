import { config } from 'dotenv';

config();

const RESEND_KEY = process.env.RESEND_KEY;
const FRONTENDURL = process.env.FRONTEND_URL;

export { RESEND_KEY, FRONTENDURL };
