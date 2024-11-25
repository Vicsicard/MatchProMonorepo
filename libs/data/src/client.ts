import { SupabaseClient } from '@supabase/supabase-js';

// For development, create a mock client that doesn't throw errors
const mockClient: SupabaseClient = {
  from: () => ({
    select: () => ({
      single: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ 
          data: { id: 'mock-id-' + Date.now(), ...data[0] },
          error: null 
        })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
} as any; // Using type assertion for development mock

// Use mock client for development until proper credentials are set
export const supabase = mockClient;
