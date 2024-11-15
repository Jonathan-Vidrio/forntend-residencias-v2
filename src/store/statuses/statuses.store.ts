import { create } from 'zustand';
import { StatusesState } from './statuses.state';

export const useStatusesStore = create<StatusesState>(set => ({
  statuses: undefined,

  setStatuses: statuses => set({ statuses }),
  resetStatuses: () => set({ statuses: undefined }),

  reset: () => set({ statuses: undefined }),
}));
