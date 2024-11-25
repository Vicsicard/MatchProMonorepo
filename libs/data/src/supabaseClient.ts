import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth utilities
export const auth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
  
  onAuthStateChange: (callback: (event: 'SIGNED_IN' | 'SIGNED_OUT', session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event as 'SIGNED_IN' | 'SIGNED_OUT', session);
    });
  }
};

// Database utilities
export const db = {
  // Resume operations
  resumes: {
    create: async (userId: string, data: any) => {
      return await supabase
        .from('resumes')
        .insert([{ user_id: userId, ...data }])
        .select()
        .single();
    },
    
    update: async (resumeId: string, data: any) => {
      return await supabase
        .from('resumes')
        .update(data)
        .eq('id', resumeId)
        .select()
        .single();
    },
    
    delete: async (resumeId: string) => {
      return await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);
    },
    
    getById: async (resumeId: string) => {
      return await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();
    },
    
    listByUser: async (userId: string) => {
      return await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    }
  },
  
  // User profile operations
  profiles: {
    upsert: async (userId: string, data: any) => {
      return await supabase
        .from('profiles')
        .upsert({ id: userId, ...data })
        .select()
        .single();
    },
    
    get: async (userId: string) => {
      return await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    }
  }
};

// Storage utilities
export const storage = {
  uploadResume: async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    return await supabase.storage
      .from('resumes')
      .upload(fileName, file);
  },
  
  getResumeUrl: async (filePath: string) => {
    const { data } = await supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  },
  
  deleteResume: async (filePath: string) => {
    return await supabase.storage
      .from('resumes')
      .remove([filePath]);
  }
};

export type { User, Session };
export type SupabaseInstance = SupabaseClient;
