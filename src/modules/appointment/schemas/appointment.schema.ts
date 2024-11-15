import { object, string } from 'zod';

export const appointmentSchema = object({
  scheduleDate: string({ required_error: 'Schedule date is required' }).min(1, 'Schedule date is required'),
  scheduleTime: string({ required_error: 'Schedule time is required' }).min(1, 'Schedule time is required'),
  client: string({ required_error: 'Client is required' }).min(1, 'Client is required'),
  vehicle: string({ required_error: 'Vehicle is required' }).min(1, 'Vehicle is required'),
  description: string().optional(),
});
