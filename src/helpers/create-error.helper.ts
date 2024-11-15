import { useModalStore } from '@/store';
import { ErrorManager } from './error-manager.helper';
import { fetchSignOut } from '@/modules/auth/fetching/auth';

export async function createError(error: string): Promise<void> {
  const { openModal, setIsErrored, setChildren } = useModalStore.getState();

  const { statusCode, message } = ErrorManager.createSignature(error);

  if ([401, 403].includes(statusCode)) await fetchSignOut();

  openModal();
  setIsErrored();
  setChildren(message);
}
