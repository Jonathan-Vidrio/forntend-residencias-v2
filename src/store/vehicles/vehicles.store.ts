import { create } from 'zustand';
import { VehiclesState } from './vehicles.state';

export const useVehiclesStore = create<VehiclesState>((set, get) => ({
  vehicles: undefined,
  brands: undefined,
  models: undefined,

  setBrands: brands => set({ brands }),
  resetBrands: () => set({ brands: [] }),

  setModels: models => set({ models }),
  resetModels: () => set({ models: [] }),

  setVehicles: vehicles => set({ vehicles }),
  resetVehicles: () => set({ vehicles: [] }),

  reset: () => set({ brands: undefined }),
}));
