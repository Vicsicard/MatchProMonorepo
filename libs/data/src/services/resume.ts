import { supabase } from '../client';
import type { Resume } from '../types/resume';

export class ResumeService {
  static async createResume(resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('resumes')
      .insert([{
        user_id: resume.userId,
        contact_info: resume.contactInfo,
        summary: resume.summary,
        skills: resume.skills,
        work_experience: resume.workExperience,
        education: resume.education,
        certifications: resume.certifications,
        projects: resume.projects
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateResume(id: string, resume: Partial<Resume>) {
    const { data, error } = await supabase
      .from('resumes')
      .update({
        contact_info: resume.contactInfo,
        summary: resume.summary,
        skills: resume.skills,
        work_experience: resume.workExperience,
        education: resume.education,
        certifications: resume.certifications,
        projects: resume.projects,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getResume(id: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserResumes(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async deleteResume(id: string) {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async autoSaveResume(id: string, resume: Partial<Resume>) {
    const { data, error } = await supabase
      .from('resumes')
      .update({
        contact_info: resume.contactInfo,
        summary: resume.summary,
        skills: resume.skills,
        work_experience: resume.workExperience,
        education: resume.education,
        certifications: resume.certifications,
        projects: resume.projects,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
