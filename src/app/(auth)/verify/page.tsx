import { VerifyForm } from '@/modules/auth/components/forms/verify-form';
import Link from 'next/link';

/**
 * Renders the Verify Email page.
 * 
 * This page includes a form for verifying the user's email address and a link to navigate back to the sign-up page.
 * 
 * @async
 * @component
 * @returns {Promise<JSX.Element>} The verify email page component.
 */
export default async function VerifyPage(): Promise<JSX.Element> {
  return (
    <div className='flex flex-row justify-center'>
      <div className='w-full lg:w-1/2 p-[7%] bg-white'>
        <h1 className='text-2xl font-bold'>Insert you email</h1>

        <VerifyForm />

        <div className='mt-5 text-center'>
          <span className='text-gray-500'>Did not receive the OTP or having trouble? </span>
          <Link className='text-blue-500 hover:underline' href={'/sign-up'}>
            Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
