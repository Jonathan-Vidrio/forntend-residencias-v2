import { PasswordReset } from '@/modules/auth/components/forms/password-reset';
import Link from 'next/link';

export default async function ChangePasswodPage(props: { params: Promise<{ email: string }> }) {
  const params = await props.params;
  const { email } = params;

  return (
    <div className='flex flex-row justify-center'>
      <div className='w-full lg:w-1/2 p-[7%] bg-white'>
        <h1 className='text-2xl font-bold'>Change Password</h1>

        <PasswordReset email={decodeURIComponent(email)} />

        <div className='mt-5 text-center'>
          <span className='text-gray-500'>Did not receive the OTP or having trouble? </span>
          <Link className='text-blue-500 hover:underline' href={'/password-recovery'}>
            Back to Password Recovery
          </Link>
        </div>
      </div>
    </div>
  );
}
