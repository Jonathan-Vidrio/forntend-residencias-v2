import { Vehicle, VehicleBrand, VehicleModel } from '@/interfaces';

export interface VehiclesState {
  vehicles?: Vehicle[];
  brands?: VehicleBrand[];
  models?: VehicleModel[];

  setVehicles: (vehicles: Vehicle[]) => void;
  resetVehicles: () => void;

  setBrands: (brands: VehicleBrand[]) => void;
  resetBrands: () => void;

  setModels: (models: VehicleModel[]) => void;
  resetModels: () => void;

  reset: () => void;
}
