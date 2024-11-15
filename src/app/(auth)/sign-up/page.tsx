import { SignUpForm } from '@/modules/auth/components/forms/sign-up-form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className='flex flex-row justify-center'>
      <div className='w-full lg:w-1/2 p-[7%] bg-white'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>

        <SignUpForm />

        <div className='mt-5 text-center'>
          <span className='text-gray-500'>Already have an account? </span>
          <Link href='sign-in' passHref>
            <span className='hover:underline text-blue-500'>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
