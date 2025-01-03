import { object, string } from 'zod';

export const passwordResetSchema = object({
  otp: string({ required_error: 'OTP is required' }).min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .refine(value => /(?=.*[0-9])/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine(value => /(?=.*[a-z])/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(value => /(?=.*[A-Z])/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(value => /(?=.*[!@#$%^&*])/.test(value), {
      message: 'Password must contain at least one special character',
    }),
  confirmPassword: string({ required_error: 'Confirm password is required' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
