import { create } from 'zustand';
import { UIState } from './ui.state';

export const useUiStore = create<UIState>((set, get) => ({
  loadingCount: 0,
  isLoading: false,
  isVerticalNavarOpen: false,

  showLoading: () =>
    set(state => ({
      loadingCount: state.loadingCount + 1,
      isLoading: true,
    })),

  hideLoading: () =>
    set(state => {
      const newCount = Math.max(0, state.loadingCount - 1);
      return {
        loadingCount: newCount,
        isLoading: newCount > 0,
      };
    }),

  showVerticalNavbar: () => set({ isVerticalNavarOpen: true }),
  hideVerticalNavbar: () => set({ isVerticalNavarOpen: false }),

  reset: () => set({ loadingCount: 0, isLoading: false, isVerticalNavarOpen: false }),
}));
