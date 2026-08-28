import { createClient } from '@supabase/supabase-js';
import env from './env.js';

// Ensure clean URL format without trailing slashes or spaces
const cleanUrl = (env.SUPABASE_URL || 'https://demo-projectpulse.supabase.co').trim().replace(/\/+$/, '');
const cleanServiceKey = (env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-role-key').trim();
const cleanAnonKey = (env.SUPABASE_ANON_KEY || 'demo-anon-key').trim();

// Initialize Supabase Admin client using Service Role key
export const supabase = createClient(
  cleanUrl,
  cleanServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Anonymous client for user-authenticated calls
export const supabaseAnon = createClient(
  cleanUrl,
  cleanAnonKey
);

export default supabase;
