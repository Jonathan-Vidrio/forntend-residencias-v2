'use client';

import { useUiStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomButton, CustomInput, Spinner } from '@/core';
import { PasswordResetFormValues } from '../../types/password-reset-form-values';
import { passwordResetSchema } from '../../schemas/password-reset';
import { fetchPasswordReset } from '../../fetching/auth';

export const PasswordReset = ({ email }: { email: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    try {
      setIsSubmitting(true);

      console.log({ ...data, email });

      await fetchPasswordReset({ ...data, email });

      router.push('/appointments');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div>
      <form className='space-y-5 mt-5' onSubmit={handleSubmit(onSubmit)}>
        <span className='text-sm text-gray-500'>Please enter the OTP sent to your email.</span>

        <div>
          <CustomInput label='OTP' {...register('otp')} />
          {errors.otp && <small className='text-red-500'>{errors.otp.message}</small>}
        </div>

        <div>
          <CustomInput label='New Password' {...register('password')} type='password' />
          {errors.password && <small className='text-red-500'>{errors.password.message}</small>}
        </div>

        <div>
          <CustomInput label='Confirm Password' {...register('confirmPassword')} type='password' />
          {errors.confirmPassword && <small className='text-red-500'>{errors.confirmPassword.message}</small>}
        </div>

        <CustomButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spinner size='sm' color='white' /> : 'Change Password'}
        </CustomButton>
      </form>
    </div>
  );
};
