export interface UIState {
  loadingCount: number;
  isLoading: boolean;
  isVerticalNavarOpen: boolean;

  showLoading: () => void;
  hideLoading: () => void;

  showVerticalNavbar: () => void;
  hideVerticalNavbar: () => void;

  reset: () => void;
}
