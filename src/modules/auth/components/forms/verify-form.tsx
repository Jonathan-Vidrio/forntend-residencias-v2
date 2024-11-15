'use client';

import { createError } from '@/helpers';
import { useModalStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VerifyFormValues } from '../../types/verify-form-values';
import { verifySchema } from '../../schemas/verify.schema';
import { fetchVerify } from '../../fetching/auth';
import { CustomButton, CustomInput, Spinner } from '@/core';

export const VerifyForm = ({ email }: { email: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormValues>({ resolver: zodResolver(verifySchema) });

  const onSubmit = async (data: VerifyFormValues) => {
    try {
      setIsSubmitting(true);

      await fetchVerify({ ...data, email });
    } catch {
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

        <CustomButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spinner size='sm' color='white' /> : 'Verify'}
        </CustomButton>
      </form>
    </div>
  );
};
