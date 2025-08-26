import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { BusinessProfile } from '../types';

interface AuthState {
  user: User | null;
  businessProfile: BusinessProfile | null;
  loading: boolean;
  signIn: (businessName: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, businessData: Omit<BusinessProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  fetchBusinessProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  businessProfile: null,
  loading: true,

  signIn: async (businessName: string, password: string) => {
    // First, get the email associated with the business name
    const { data: profiles, error: profileError } = await supabase
      .from('business_profiles')
      .select('user_id')
      .eq('business_name', businessName)
      .single();

    if (profileError) throw new Error('Business not found');

    // Then get the email from auth.users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('id', profiles.user_id)
      .single();

    if (userError) throw new Error('User not found');

    // Finally, sign in with email and password
    const { error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password,
    });

    if (error) throw error;
  },

  signUp: async (email, password, businessData) => {
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (!data.user) throw new Error('Failed to create user');

    const { error: profileError } = await supabase
      .from('business_profiles')
      .insert({
        user_id: data.user.id,
        ...businessData,
      });

    if (profileError) {
      // Rollback by deleting the user if profile creation fails
      await supabase.auth.admin.deleteUser(data.user.id);
      throw profileError;
    }
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, businessProfile: null });
  },

  setUser: (user) => set({ user, loading: false }),

  fetchBusinessProfile: async () => {
    const { data: profile, error } = await supabase
      .from('business_profiles')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching business profile:', error);
      return;
    }

    set({ businessProfile: profile });
  },
}));