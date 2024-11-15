import { useModalStore, useUiStore, useVehiclesStore } from '@/store';
import { createError } from '@/helpers';
import { Vehicle } from '@/interfaces';
import {
  createVehicle,
  deleteVehicle,
  getDeletedVehicles,
  getDeletedVehiclesByClient,
  getVehicle,
  getVehicleByLicensePlate,
  getVehicles,
  getVehiclesByClient,
  restoreVehicle,
  updateVehicle,
} from '@/app/lib/actions/vehicles/vehicles';
import { uploadImage } from '@/app/lib/actions/image/image';

export async function fetchGetVehicles(): Promise<void> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { setVehicles } = useVehiclesStore.getState();

  try {
    showLoading();

    const response = await getVehicles();
    if ('error' in response) throw new Error(response.error);

    const { vehicles } = response;

    setVehicles(vehicles);
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchGetDeletedVehicles(): Promise<void> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { setVehicles } = useVehiclesStore.getState();

  try {
    showLoading();

    const response = await getDeletedVehicles();
    if ('error' in response) throw new Error(response.error);

    const { vehicles } = response;

    setVehicles(vehicles);
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchGetVehiclesByClient(clientId: string): Promise<void> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { setVehicles } = useVehiclesStore.getState();

  try {
    showLoading();

    const response = await getVehiclesByClient(clientId);
    if ('error' in response) throw new Error(response.error);

    const { vehicles } = response;

    setVehicles(vehicles);
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchGetDeletedVehiclesByClient(clientId: string): Promise<void> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { setVehicles } = useVehiclesStore.getState();

  try {
    showLoading();

    const response = await getDeletedVehiclesByClient(clientId);
    if ('error' in response) throw new Error(response.error);

    const { vehicles } = response;

    setVehicles(vehicles);
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchGetVehicle(id: string): Promise<Vehicle> {
  const { showLoading, hideLoading } = useUiStore.getState();

  try {
    showLoading();

    const response = await getVehicle(id);
    if ('error' in response) throw new Error(response.error);

    const { vehicle } = response;

    return vehicle;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchGetVehicleByLicensePlate(licensePlate: string): Promise<Vehicle> {
  const { showLoading, hideLoading } = useUiStore.getState();

  try {
    showLoading();

    const response = await getVehicleByLicensePlate(licensePlate);
    if ('error' in response) throw new Error(response.error);

    const { vehicle } = response;

    return vehicle;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchCreateVehicle(data: Vehicle): Promise<Vehicle> {
  const { openModal, setChildren, setIsSuccess } = useModalStore.getState();
  const { showLoading, hideLoading } = useUiStore.getState();

  try {
    showLoading();

    const image = data.image ? await uploadImage(data.image as File, 'vehicles') : undefined;

    const response = await createVehicle({ ...data, image });
    if ('error' in response) throw new Error(response.error);

    const { vehicle } = response;

    setIsSuccess();
    setChildren(`Vehicle ${vehicle.licensePlate} has been created.`);
    openModal();

    await fetchGetVehicles();

    return vehicle;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchUpdateVehicle(id: string, data: Vehicle): Promise<Vehicle> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { openModal, setChildren, setIsSuccess } = useModalStore.getState();

  try {
    showLoading();

    const image = data.image ? await uploadImage(data.image as File, 'vehicles') : undefined;

    const response = await updateVehicle(id, { ...data, image });
    if ('error' in response) throw new Error(response.error);

    const { vehicle } = response;

    setIsSuccess();
    setChildren(`Vehicle ${vehicle.licensePlate} has been updated.`);
    openModal();

    await fetchGetVehicles();

    return vehicle;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchDeleteVehicle(id: string): Promise<boolean> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { openModal, setChildren, setIsSuccess } = useModalStore.getState();

  try {
    showLoading();

    const response = await deleteVehicle(id);
    if ('error' in response) throw new Error(response.error);

    const { message } = response;

    setIsSuccess();
    setChildren(`Vehicle has been deleted.`);
    openModal();

    await fetchGetVehicles();

    return !!message;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchRestoreVehicle(id: string): Promise<boolean> {
  const { showLoading, hideLoading } = useUiStore.getState();
  const { openModal, setChildren, setIsSuccess } = useModalStore.getState();

  try {
    showLoading();

    const response = await restoreVehicle(id);
    if ('error' in response) throw new Error(response.error);

    const { vehicle } = response;

    setIsSuccess();
    setChildren(`Vehicle ${vehicle.licensePlate} has been restored.`);
    openModal();

    await fetchGetVehicles();

    return !!vehicle;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}
