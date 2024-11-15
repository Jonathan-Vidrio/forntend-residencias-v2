import { object, string } from 'zod';

export const verifySchema = object({
  otp: string({ required_error: 'OTP is required' }).min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
});
