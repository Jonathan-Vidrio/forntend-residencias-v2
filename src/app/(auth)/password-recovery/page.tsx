import { PasswordRecoveryForm } from '@/modules/auth/components/forms/password-recovery-form';
import Link from 'next/link';

export default function PasswordRecoveryPage() {
  return (
    <div className='flex flex-row justify-center'>
      <div className='w-full lg:w-1/2 p-[7%] bg-white'>
        <h1 className='text-2xl font-bold'>Verify</h1>

        <PasswordRecoveryForm />

        <div className='mt-5 text-center'>
          <span className='text-gray-500'>Remember your password? </span>
          <Link className='text-blue-500 hover:underline' href={'/sign-in'}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
