import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';
import { mockSupabase } from '../../test/mocks/supabase';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      businessProfile: null,
      loading: false,
    });
  });

  it('should initialize with default state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.businessProfile).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should update user state', () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    useAuthStore.getState().setUser(mockUser);
    
    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('should handle sign in', async () => {
    const mockResponse = {
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    };
    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce(mockResponse);

    await useAuthStore.getState().signIn('Test Business', 'password');
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalled();
  });

  it('should handle sign out', async () => {
    mockSupabase.auth.signOut.mockResolvedValueOnce({ error: null });

    await useAuthStore.getState().signOut();
    const state = useAuthStore.getState();
    
    expect(state.user).toBeNull();
    expect(state.businessProfile).toBeNull();
    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });
});