'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/lib/mock-data';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  instituteId?: string;
  phone?: string;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = mockUsers.find(u => u.email === email);
        if (!user) {
          set({ isLoading: false });
          return { success: false, error: 'Invalid email or password' };
        }

        // In real app, verify password hash here
        set({ user, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const existing = mockUsers.find(u => u.email === data.email);
        if (existing) {
          set({ isLoading: false });
          return { success: false, error: 'Email already registered' };
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          name: data.name,
          role: data.role,
          status: 'PENDING_VERIFICATION',
          isAnonymous: false,
          phone: data.phone,
          instituteId: data.instituteId,
          createdAt: new Date().toISOString(),
        };

        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },
    }),
    {
      name: 'eduwatch-auth',
    }
  )
);
