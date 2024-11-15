import { Appointment } from '@/interfaces';

export interface AppointmentsState {
  appointments?: Appointment[];
  history?: Appointment[];

  setAppointments: (appointments: Appointment[]) => void;
  resetAppointments: () => void;

  setHistory: (appointments: Appointment[]) => void;
  resetHistory: () => void;

  reset: () => void;
}
