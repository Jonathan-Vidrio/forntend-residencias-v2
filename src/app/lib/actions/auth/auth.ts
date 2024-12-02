'use server';

import { ErrorManager, httpRequest } from '@/helpers';
import { cookies } from 'next/headers';
import { createSession, decrypt, deleteSession } from '../../session/session';
import { SignInFormValues } from '@/modules/auth/types/sign-in-form-values';
import { User } from '@/interfaces';
import { SignUpFormValues } from '@/modules/auth/types/sign-up-form-value';
import { VerifyFormValues } from '@/modules/auth/types/verify-form-values';
import { PasswordRecoveryFormValues } from '@/modules/auth/types/password-recovery-form-values';
import { PasswordResetFormValues } from '@/modules/auth/types/password-reset-form-values';

export async function signIn(credentials: SignInFormValues): Promise<{ user: User } | { error: string }> {
  try {
    const { user, accessToken }: { user: User; accessToken: string } = await httpRequest({
      url: '/auth/sign-in',
      method: 'POST',
      body: { ...credentials },
    });

    const permissions = [];
    if (user.userType?.description?.toUpperCase() === 'SUPERADMIN') permissions.push('superAdmin');
    if (user.userType?.description?.toUpperCase() === 'ADMIN') permissions.push('admin');
    if (user.userType?.description?.toUpperCase() === 'CLIENT') permissions.push('client');
    if (user.userType?.description?.toUpperCase() === 'WORKER') {
      if (user.worker?.workerType?.description?.toUpperCase() === 'RECEPTIONIST') permissions.push('receptionist');
      if (user.worker?.workerType?.description?.toUpperCase() !== 'RECEPTIONIST') permissions.push('worker');
    }

    const { created } = await createSession({ user, permissions, accessToken });
    if (!created) throw ErrorManager.handleError({ error: 'BAD_REQUEST', message: 'Session could not be created.', statusCode: 400 });

    return {
      user: {
        email: user.email,
        firstName: user.firstName,
        firstSurname: user.firstSurname,
        userType: user.userType,
        client: user.client,
        worker: user.worker,
      },
    };
  } catch (error: any) {
    console.error('Error signing in:', error.message);
    return { error: error.message };
  }
}

export async function signUp(credentials: SignUpFormValues): Promise<{ message: string } | { error: string }> {
  try {
    const { message } = await httpRequest({
      url: '/auth/sign-up',
      method: 'POST',
      body: { email: credentials.email, password: credentials.password },
    });

    return { message };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function verify(credentials: VerifyFormValues): Promise<{ user: User } | { error: string }> {
  try {
    const { user, accessToken }: { user: User; accessToken: string } = await httpRequest({
      url: '/auth/verify',
      method: 'POST',
      body: { ...credentials },
    });

    const permissions = [];
    if (user.userType?.description?.toUpperCase() === 'SUPERADMIN') permissions.push('superAdmin');
    if (user.userType?.description?.toUpperCase() === 'ADMIN') permissions.push('admin');
    if (user.userType?.description?.toUpperCase() === 'CLIENT') permissions.push('client');
    if (user.userType?.description?.toUpperCase() === 'WORKER') {
      if (user.worker?.workerType?.description?.toUpperCase() === 'RECEPTIONIST') permissions.push('receptionist');
      if (user.worker?.workerType?.description?.toUpperCase() !== 'RECEPTIONIST') permissions.push('worker');
    }

    const { created } = await createSession({ user, permissions, accessToken });
    if (!created) throw ErrorManager.handleError({ error: 'BAD_REQUEST', message: 'Session could not be created.', statusCode: 400 });

    return {
      user: {
        email: user.email,
        firstName: user.firstName,
        firstSurname: user.firstSurname,
        userType: user.userType,
        client: user.client,
        worker: user.worker,
      },
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function signOut(): Promise<any | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    await deleteSession();

    await httpRequest({
      url: '/auth/sign-out',
      headers: { Authorization: `Bearer ${accessToken}` },
      method: 'POST',
      body: { email: user.email },
    });
  } catch (error: any) {
    return { error: error.message };
  }
}

export const getAccessSession = async (): Promise<{ user: User; accessToken: string; permissions?: string[] }> => {
  try {
    const session = (await cookies()).get('session')?.value;
    if (!session) throw ErrorManager.handleError({ error: 'UNAUTHORIZED', message: 'No session found.', statusCode: 401 });

    // Get the accessToken from the session cookie
    const payload = await decrypt(session);
    if (!payload || !payload.accessToken) throw ErrorManager.handleError({ error: 'UNAUTHORIZED', message: 'Invalid session.', statusCode: 401 });

    return { user: payload.user as User, accessToken: payload.accessToken.toString(), permissions: payload.permissions as string[] };
  } catch (error) {
    return Promise.reject(error);
  }
};

export async function passwordRecovery(data: PasswordRecoveryFormValues): Promise<{ message: string } | { error: string }> {
  try {
    const { message } = await httpRequest({
      url: '/auth/password-recovery',
      method: 'POST',
      body: { ...data },
    });

    return { message };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function passwordReset(data: PasswordResetFormValues): Promise<{ user: User } | { error: string }> {
  try {
    const { user, accessToken } = await httpRequest({
      url: '/auth/password-reset',
      method: 'POST',
      body: { email: data.email, password: data.password, otp: data.otp },
    });

    const permissions = [];
    if (user.userType?.description?.toUpperCase() === 'SUPERADMIN') permissions.push('superAdmin');
    if (user.userType?.description?.toUpperCase() === 'ADMIN') permissions.push('admin');
    if (user.userType?.description?.toUpperCase() === 'CLIENT') permissions.push('client');
    if (user.userType?.description?.toUpperCase() === 'WORKER') {
      if (user.worker?.workerType?.description?.toUpperCase() === 'RECEPTIONIST') permissions.push('receptionist');
      if (user.worker?.workerType?.description?.toUpperCase() !== 'RECEPTIONIST') permissions.push('worker');
    }

    const { created } = await createSession({ user, permissions, accessToken });
    if (!created) throw ErrorManager.handleError({ error: 'BAD_REQUEST', message: 'Session could not be created.', statusCode: 400 });

    return {
      user: {
        email: user.email,
        firstName: user.firstName,
        firstSurname: user.firstSurname,
        userType: user.userType,
        client: user.client,
        worker: user.worker,
      },
    };
  } catch (error: any) {
    return { error: error.message };
  }
}
