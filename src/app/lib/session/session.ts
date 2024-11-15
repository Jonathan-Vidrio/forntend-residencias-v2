import 'server-only';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { User } from '@/interfaces';
import { getSecretKey } from '../config/config';

const getEncodedKey = async (): Promise<Uint8Array> => new TextEncoder().encode(await getSecretKey());

export async function encrypt(payload: { user: User; accessToken: string }): Promise<string> {
  try {
    const encodedKey = await getEncodedKey();
    return new SignJWT({ ...payload }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1d').sign(encodedKey);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function decrypt(session: string): Promise<JWTPayload | void> {
  try {
    const encodedKey = await getEncodedKey();
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
    return payload;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createSession(data: { user: User; permissions: string[]; accessToken: string }): Promise<{ created: boolean }> {
  try {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12 hours
    const session = await encrypt({ ...data });

    (await cookies()).set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'strict',
      path: '/',
    });

    return { created: (await cookies()).has('session') };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteSession(): Promise<{ deleted: boolean }> {
  try {
    (await cookies()).delete('session');
    return { deleted: !(await cookies()).has('session') };
  } catch (error) {
    return Promise.reject(error);
  }
}
