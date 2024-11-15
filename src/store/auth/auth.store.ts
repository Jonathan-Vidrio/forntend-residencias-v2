import { create } from 'zustand';
import { AuthState } from './auth.state';

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: undefined,
  permissions: undefined,

  setUser: user => set({ user }),
  resetUser: () => set({ user: undefined }),

  setPermissions: permissions => set({ permissions }),
  resetPermissions: () => set({ permissions: undefined }),

  reset: () => set({ user: undefined }),
}));
