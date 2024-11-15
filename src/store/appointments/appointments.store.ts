import { create } from 'zustand';
import { AppointmentsState } from './appointments.state';

export const useAppointmentsStore = create<AppointmentsState>((set, get) => ({
  appointments: undefined,
  history: undefined,

  setAppointments: appointments => set({ appointments }),
  resetAppointments: () => set({ appointments: undefined }),

  setHistory: history => set({ history }),
  resetHistory: () => set({ history: undefined }),

  reset: () => get().resetAppointments(),
}));
