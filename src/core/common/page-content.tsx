import { BackButton } from './back-button';

export const PageContent = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }): JSX.Element => {
  return (
    <div>
      <div className='flex flex-row items-center gap-x-5'>
        <BackButton />
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>

      <div className={`mt-10 ${className}`}>{children}</div>
    </div>
  );
};
