import { User } from '@/interfaces';

export interface AuthState {
  user?: User;
  permissions?: string[]; // 'superAdmin' | 'admin' | 'receptionist' | 'worker' | 'client';

  setUser: (user: User) => void;
  resetUser: () => void;

  setPermissions: (permissions: string[]) => void;
  resetPermissions: () => void;

  reset: () => void;
}
