import { SignInForm } from '@/modules/auth/components/forms/sign-in-form';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='flex flex-row'>
      <div className='w-full lg:w-1/2 p-[7%] bg-white'>
        <h1 className='text-2xl font-bold'>Sign In</h1>

        <SignInForm />

        <div className='mt-5 text-center'>
          <span className='text-gray-500'>Forgot your password? </span>
          <Link href='password-recovery' passHref>
            <span className='hover:underline text-blue-500'>Reset it</span>
          </Link>
        </div>

        <div className='mt-5 text-center'>
          <span className='text-gray-500'>Do not have an account? </span>
          <Link href='sign-up' passHref>
            <span className='hover:underline text-blue-500'>Sign Up</span>
          </Link>
        </div>
      </div>

      <div className='w-1/2 hidden lg:flex justify-center items-center bg-blue-500'>
        <p className='text-white font-semibold text-2xl'>Welcome</p>
      </div>
    </div>
  );
}
