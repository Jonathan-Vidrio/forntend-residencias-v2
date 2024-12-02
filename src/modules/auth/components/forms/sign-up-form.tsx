'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useModalStore } from '@/store';
import { useRouter } from 'next/navigation';
import { SignUpFormValues } from '../../types/sign-up-form-value';
import { signUpSchema } from '../../schemas/sign-up.schema';
import { fetchSignUp } from '../../fetching/auth';
import { CustomButton, CustomInput, Spinner } from '@/core';

export const SignUpForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsSubmitting(true);

      await fetchSignUp({ ...data });

      router.push(`/verify?email=${data.email}`);
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

        <div>
          <CustomInput label='Confirm Password' type='password' {...register('confirmPassword')} />
          {errors.confirmPassword && <small className='text-red-500'>{errors.confirmPassword.message}</small>}
        </div>

        <CustomButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spinner size='sm' color='white' /> : 'Sign Up'}
        </CustomButton>
      </form>
    </div>
  );
};
