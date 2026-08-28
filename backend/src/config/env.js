import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const rawUrl = (process.env.SUPABASE_URL || 'https://demo-projectpulse.supabase.co')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/rest\/v1\/?$/i, ''); // Strip accidental /rest/v1 if included by user

export const env = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: (process.env.FRONTEND_URL || 'http://localhost:5173').trim(),
  SUPABASE_URL: rawUrl,
  SUPABASE_ANON_KEY: (process.env.SUPABASE_ANON_KEY || 'demo-anon-key').trim(),
  SUPABASE_SERVICE_ROLE_KEY: (process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-role-key').trim(),
};

export default env;
