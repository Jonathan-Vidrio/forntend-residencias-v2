export const Filters = ({ children, className }: { children: React.ReactNode | string; className?: string }): JSX.Element => {
  return <div className={`fixed w-[400px] z-10 bg-white shadow-xl rounded-md p-5 my-2 space-y-3 ${className}`}>{children}</div>;
};
