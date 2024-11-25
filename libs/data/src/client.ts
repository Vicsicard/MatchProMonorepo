import { SupabaseClient } from '@supabase/supabase-js';
import { Profile, Resume } from './types';

// Mock storage to simulate a database
const mockStorage = {
  profiles: new Map<string, Profile>(),
  resumes: new Map<string, Resume>(),
};

// Helper to generate IDs
const generateId = () => `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Error messages
const ERRORS = {
  NOT_FOUND: 'Record not found',
  UNAUTHORIZED: 'Unauthorized',
  INVALID_INPUT: 'Invalid input data',
};

// Mock client with improved type safety and error handling
const mockClient: SupabaseClient = {
  from: (table: string) => ({
    select: (_query?: string) => ({
      single: async () => {
        try {
          if (table === 'profiles') {
            const profiles = Array.from(mockStorage.profiles.values());
            return { data: profiles[0] || null, error: null };
          }
          if (table === 'resumes') {
            const resumes = Array.from(mockStorage.resumes.values());
            return { data: resumes[0] || null, error: null };
          }
          return { data: null, error: null };
        } catch (err) {
          const error = err as Error;
          return { data: null, error: { message: error.message } };
        }
      },
      eq: (column: keyof Profile | keyof Resume, value: any) => ({
        single: async () => {
          try {
            if (table === 'profiles') {
              const profile = Array.from(mockStorage.profiles.values())
                .find(p => p[column as keyof Profile] === value);
              return { data: profile || null, error: null };
            }
            if (table === 'resumes') {
              const resume = Array.from(mockStorage.resumes.values())
                .find(r => r[column as keyof Resume] === value);
              return { data: resume || null, error: null };
            }
            return { data: null, error: null };
          } catch (err) {
            const error = err as Error;
            return { data: null, error: { message: error.message } };
          }
        }
      })
    }),
    insert: (data: Partial<Profile> | Partial<Resume>) => ({
      select: () => ({
        single: async () => {
          try {
            const now = new Date().toISOString();
            const id = generateId();
            
            if (table === 'profiles') {
              const profileData = data as Partial<Profile>;
              const profile: Profile = {
                id,
                created_at: now,
                updated_at: now,
                email: profileData.email || '',
                ...(data as Partial<Profile>),
              };
              mockStorage.profiles.set(id, profile);
              return { data: profile, error: null };
            }
            
            if (table === 'resumes') {
              const resumeData = data as Partial<Resume>;
              const resume: Resume = {
                id,
                created_at: now,
                updated_at: now,
                user_id: resumeData.user_id || '',
                title: resumeData.title || 'Untitled Resume',
                content: resumeData.content || { basics: { name: '', email: '' } },
                is_public: false,
                version: 1,
                ...(data as Partial<Resume>),
              };
              mockStorage.resumes.set(id, resume);
              return { data: resume, error: null };
            }
            
            throw new Error(ERRORS.INVALID_INPUT);
          } catch (err) {
            const error = err as Error;
            return { data: null, error: { message: error.message } };
          }
        }
      })
    }),
    update: (data: Partial<Profile> | Partial<Resume>) => ({
      eq: (column: keyof Profile | keyof Resume, value: any) => ({
        select: () => ({
          single: async () => {
            try {
              const now = new Date().toISOString();
              
              if (table === 'profiles') {
                const profile = Array.from(mockStorage.profiles.values())
                  .find(p => p[column as keyof Profile] === value);
                if (!profile) throw new Error(ERRORS.NOT_FOUND);
                
                const updatedProfile = {
                  ...profile,
                  ...data,
                  updated_at: now,
                };
                mockStorage.profiles.set(profile.id, updatedProfile);
                return { data: updatedProfile, error: null };
              }
              
              if (table === 'resumes') {
                const resume = Array.from(mockStorage.resumes.values())
                  .find(r => r[column as keyof Resume] === value);
                if (!resume) throw new Error(ERRORS.NOT_FOUND);
                
                const updatedResume = {
                  ...resume,
                  ...data,
                  updated_at: now,
                  version: resume.version + 1,
                };
                mockStorage.resumes.set(resume.id, updatedResume);
                return { data: updatedResume, error: null };
              }
              
              throw new Error(ERRORS.INVALID_INPUT);
            } catch (err) {
              const error = err as Error;
              return { data: null, error: { message: error.message } };
            }
          }
        })
      })
    }),
    delete: () => ({
      eq: (column: keyof Profile | keyof Resume, value: any) => ({
        single: async () => {
          try {
            if (table === 'profiles') {
              const profile = Array.from(mockStorage.profiles.values())
                .find(p => p[column as keyof Profile] === value);
              if (!profile) throw new Error(ERRORS.NOT_FOUND);
              mockStorage.profiles.delete(profile.id);
              return { data: null, error: null };
            }
            
            if (table === 'resumes') {
              const resume = Array.from(mockStorage.resumes.values())
                .find(r => r[column as keyof Resume] === value);
              if (!resume) throw new Error(ERRORS.NOT_FOUND);
              mockStorage.resumes.delete(resume.id);
              return { data: null, error: null };
            }
            
            throw new Error(ERRORS.INVALID_INPUT);
          } catch (err) {
            const error = err as Error;
            return { data: null, error: { message: error.message } };
          }
        }
      })
    }),
  }),
  auth: {
    getUser: async () => ({ 
      data: { 
        user: { 
          id: 'mock-user-id',
          email: 'mock@example.com',
          aud: 'authenticated',
          role: 'authenticated',
        } 
      }, 
      error: null 
    }),
    signIn: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
} as any;

export const supabase = mockClient;
