'use client';

import { useUiStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordRecoveryFormValues } from '../../types/password-recovery-form-values';
import { passwordRecoverySchema } from '../../schemas/password-recovery.schema';
import { CustomButton, CustomInput, Spinner } from '@/core';
import { fetchPasswordRecovery } from '../../fetching/auth';

export const PasswordRecoveryForm = () => {
  const { showLoading } = useUiStore(state => state);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(passwordRecoverySchema),
  });

  const onSubmit = async (data: PasswordRecoveryFormValues) => {
    try {
      setIsSubmitting(true);

      await fetchPasswordRecovery(data);

      router.push(`/password-reset?${encodeURI(data.email)}`);

      showLoading();
    } catch {
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div>
      <form className='space-y-5 mt-5' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CustomInput label='Email' {...register('email')} />
          {errors.email && <small className='text-red-500'>{errors.email.message}</small>}
        </div>

        <CustomButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spinner size='sm' color='white' /> : 'Send OTP'}
        </CustomButton>
      </form>
    </div>
  );
};
