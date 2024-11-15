import { create } from 'zustand';
import { UsersState } from './users.state';

export const useUsersStore = create<UsersState>((set, get) => ({
  users: undefined,
  userTypes: undefined,
  workers: undefined,
  workerTypes: undefined,
  clients: undefined,

  setUsers: users => set({ users }),
  resetUsers: () => set({ users: undefined }),

  setUserTypes: userTypes => set({ userTypes }),
  resetUserTypes: () => set({ userTypes: undefined }),

  setWorkers: workers => set({ workers }),
  resetWorkers: () => set({ workers: undefined }),

  setWorkerTypes: workerTypes => set({ workerTypes }),
  resetWorkerTypes: () => set({ workerTypes: undefined }),

  setClients: clients => set({ clients }),
  resetClients: () => set({ clients: undefined }),

  reset: () => {
    get().resetUsers();
    get().resetUserTypes();
    get().resetWorkers();
    get().resetWorkerTypes();
    get().resetClients();
  },
}));
