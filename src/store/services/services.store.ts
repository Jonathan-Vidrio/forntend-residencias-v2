import { create } from 'zustand';
import { ServicesState } from './services.state';

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: undefined,
  history: undefined,
  serviceTypes: undefined,

  setServices: services => set({ services }),
  resetServices: () => set({ services: undefined }),

  setHistory: history => set({ history }),
  resetHistory: () => set({ history: undefined }),

  setServiceTypes: serviceTypes => set({ serviceTypes }),
  resetServiceTypes: () => set({ serviceTypes: undefined }),

  reset: () => {
    get().resetServices();
    get().resetServiceTypes();
    get().resetHistory();
  },
}));
