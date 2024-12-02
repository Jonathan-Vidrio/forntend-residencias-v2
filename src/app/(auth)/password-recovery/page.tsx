import { PasswordRecoveryForm } from '@/modules/auth/components/forms/password-recovery-form';
import Link from 'next/link';

/**
 * Renders the Password Recovery page.
 *
 * This page includes a form for password recovery and a link to navigate back to the sign-in page.
 *
 * @component
 * @returns {JSX.Element} The password recovery page component.
 */
export default function PasswordRecoveryPage(): JSX.Element {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Password Recovery</h1>

      <PasswordRecoveryForm />

      <div className='mt-5 text-center'>
        <span className='text-gray-500'>Remember your password? </span>
        <Link className='text-blue-500 hover:underline' href={'/sign-in'}>
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
