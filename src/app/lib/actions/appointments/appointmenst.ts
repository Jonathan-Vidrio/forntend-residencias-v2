'use server';

import { Appointment } from '@/interfaces';
import { getAccessSession } from '../auth/auth';
import { httpRequest } from '@/helpers';

export async function getAvailableDates(days: number): Promise<{ dates: Date[] | string[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const dates = await httpRequest({
      url: `/appointments/available-dates/${days}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { dates };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointments(): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: '/appointments',
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointmentsHistory(): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: '/appointments/history',
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getDeletedAppointments(): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: '/appointments/deleted',
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointmentsByClient(clientId: string): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: `/appointments/client/${clientId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointmentsHistoryByClient(clientId: string): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: `/appointments/history/client/${clientId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getDeletedAppointmentsByClient(clientId: string): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: `/appointments/deleted/client/${clientId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointmentsByWorker(workerId: string): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: `/appointments/worker/${workerId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointmentsHistoryByWorker(workerId: string): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: `/appointments/history/worker/${workerId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getDeletedAppointmentsByWorker(workerId: string): Promise<{ appointments: Appointment[] } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointments = await httpRequest({
      url: `/appointments/deleted/worker/${workerId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointments };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAppointmentById(id: string): Promise<{ appointment: Appointment } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointment = await httpRequest({
      url: `/appointments/${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointment };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function createAppointment(data: Appointment): Promise<{ appointment: Appointment } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointment = await httpRequest({
      url: '/appointments',
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { ...data },
    });

    return { appointment };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateAppointment(id: string, data: Appointment): Promise<{ appointment: Appointment } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointment = await httpRequest({
      url: `/appointments/${id}`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { ...data },
    });

    return { appointment };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteAppointment(id: string): Promise<{ message: string } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const { message } = await httpRequest({
      url: `/appointments/${id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { message };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function restoreAppointment(id: string): Promise<{ appointment: Appointment } | { error: string }> {
  try {
    const { user, accessToken } = await getAccessSession();

    const appointment = await httpRequest({
      url: `/appointments/restore/${id}`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { appointment };
  } catch (error: any) {
    return { error: error.message };
  }
}
