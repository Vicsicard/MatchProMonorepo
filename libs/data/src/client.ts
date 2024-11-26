import { createClient } from '@supabase/supabase-js';
import { createRateLimitedClient } from './utils/apiUtils';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a rate-limited API client
export const rateLimitedApi = createRateLimitedClient(supabaseUrl, {
  headers: {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${supabaseAnonKey}`,
  },
  maxRetries: 3,
  baseDelay: 1000,
});