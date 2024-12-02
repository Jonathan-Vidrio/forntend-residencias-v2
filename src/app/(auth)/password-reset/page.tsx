import { PasswordReset } from '@/modules/auth/components/forms/password-reset';
import Link from 'next/link';

/**
 * Renders the Change Password page.
 *
 * This page allows users to reset their password. It retrieves the email parameter asynchronously
 * and includes a link to navigate back to the password recovery page.
 *
 * @async
 * @component
 * @param {Object} props - The component props.
 * @param {Promise<{ email: string }>} props.params - A promise resolving to an object containing the email address.
 * @returns {Promise<JSX.Element>} The change password page component.
 */
export default async function ChangePasswodPage(props: { params: Promise<{ email: string }> }): Promise<JSX.Element> {
  const params = await props.params;
  const { email } = params;

  return (
    <div>
      <h1 className='text-2xl font-bold'>Change Password</h1>

      <PasswordReset email={decodeURIComponent(email)} />

      <div className='mt-5 text-center'>
        <span className='text-gray-500'>Did not receive the OTP or having trouble? </span>
        <Link className='text-blue-500 hover:underline' href={'/password-recovery'}>
          Back to Password Recovery
        </Link>
      </div>
    </div>
  );
}
