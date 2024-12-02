import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { decrypt } from '../session/session';
import { User } from '@/interfaces';

export const verify = cache(async (): Promise<{ user: User; accessToken: string }> => {
  const session = (await cookies()).get('session')?.value as string;
  const data = await decrypt(session);
  const { user, accessToken } = data as { user: User; accessToken: string };
  return { user, accessToken };
});
