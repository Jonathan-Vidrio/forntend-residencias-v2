import {
  useAppointmentsStore,
  useAuthStore,
  useModalStore,
  useServicesStore,
  useStatusesStore,
  useUiStore,
  useUsersStore,
  useVehiclesStore,
} from '@/store';
import { createError } from '@/helpers';
import { SignInFormValues } from '../types/sign-in-form-values';
import { SignUpFormValues } from '../types/sign-up-form-value';
import { VerifyFormValues } from '../types/verify-form-values';
import { passwordRecovery, passwordReset, signIn, signOut, signUp, verify } from '@/app/lib/actions/auth/auth';
import { PasswordRecoveryFormValues } from '../types/password-recovery-form-values';
import { PasswordResetFormValues } from '../types/password-reset-form-values';

export async function fetchSignIn(data: SignInFormValues): Promise<void> {
  const { showLoading } = useUiStore.getState();
  const { openModal, setIsSuccess: setIsSucces, setChildren } = useModalStore.getState();
  const { setUser } = useAuthStore.getState();

  try {
    const response = await signIn({ ...data });
    if ('error' in response) throw new Error(response.error);

    const { user } = response;

    openModal();
    setIsSucces();
    setChildren('Signed in successfully.');

    setUser(user);
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    showLoading();
  }
}

export async function fetchSignUp(data: SignUpFormValues): Promise<void> {
  const { openModal, setIsSuccess: setIsSucces, setChildren } = useModalStore.getState();

  try {
    const response = await signUp({ ...data });
    if ('error' in response) throw new Error(response.error);

    const { message } = response;

    openModal();
    setIsSucces();
    setChildren(message);
  } catch (error: any) {
    throw createError(error.message);
  }
}

export async function fetchVerify(data: VerifyFormValues): Promise<boolean> {
  const { openModal, setIsSuccess: setIsSucces, setChildren } = useModalStore.getState();
  const { showLoading, hideLoading } = useUiStore.getState();
  const { setUser } = useAuthStore.getState();

  try {
    showLoading();

    const response = await verify({ ...data });
    if ('error' in response) throw new Error(response.error);

    const { user } = response;

    openModal();
    setIsSucces();
    setChildren('Account verified successfully.');

    setUser(user);

    return !!user;
  } catch (error: any) {
    throw createError(error.message);
  } finally {
    hideLoading();
  }
}

export async function fetchSignOut(): Promise<void> {
  const { showLoading, hideLoading } = useUiStore.getState();

  const { reset: resetAppointments } = useAppointmentsStore.getState();
  const { reset: resetAuth } = useAuthStore.getState();
  const { reset: resetModal } = useModalStore.getState();
  const { reset: resetServices } = useServicesStore.getState();
  const { reset: resetStatuses } = useStatusesStore.getState();
  const { reset: resetUi } = useUiStore.getState();
  const { reset: resetUsers } = useUsersStore.getState();
  const { reset: resetVehicles } = useVehiclesStore.getState();

  try {
    showLoading();

    await signOut();
  } catch {
  } finally {
    resetAppointments();
    resetAuth();
    resetModal();
    resetServices();
    resetStatuses();
    resetUi();
    resetUsers();
    resetVehicles();

    hideLoading();
  }
}

export async function fetchGetAccessSession(): Promise<void> {}

export async function fetchGetUserSignedIn(): Promise<void> {}

export async function fetchPasswordRecovery(data: PasswordRecoveryFormValues): Promise<void> {
  const { openModal, setIsSuccess: setIsSucces, setChildren } = useModalStore.getState();

  try {
    const response = await passwordRecovery({ ...data });
    if ('error' in response) throw new Error(response.error);

    const { message } = response;

    openModal();
    setIsSucces();
    setChildren(message);
  } catch (error: any) {
    throw createError(error.message);
  }
}

export async function fetchPasswordReset(data: PasswordResetFormValues): Promise<void> {
  const { openModal, setIsSuccess: setIsSucces, setChildren } = useModalStore.getState();
  const { setUser } = useAuthStore.getState();

  try {
    const response = await passwordReset({ ...data });
    if ('error' in response) throw new Error(response.error);

    const { user } = response;

    openModal();
    setIsSucces();
    setChildren('Password reset successfully.');

    setUser(user);
  } catch (error: any) {
    throw createError(error.message);
  }
}
