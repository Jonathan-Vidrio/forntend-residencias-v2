'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/store';
import { SignInFormValues } from '../../types/sign-in-form-values';
import { signInSchema } from '../../schemas/sign-in.schema';
import { fetchSignIn } from '../../fetching/auth';
import { CustomButton, CustomInput, Spinner } from '@/core';

export const SignInForm = () => {
  const { showLoading } = useUiStore(state => state);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsSubmitting(true);

      await fetchSignIn({ ...data });

      showLoading();

      router.push('/appointments');
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form className='space-y-5 mt-5' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CustomInput label='Email' {...register('email')} />
          {errors.email && <small className='text-red-500'>{errors.email.message}</small>}
        </div>

        <div>
          <CustomInput label='Password' type='password' {...register('password')} />
          {errors.password && <small className='text-red-500'>{errors.password.message}</small>}
        </div>

        <CustomButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spinner size='sm' color='white' /> : 'Sign In'}
        </CustomButton>
      </form>
    </div>
  );
};
