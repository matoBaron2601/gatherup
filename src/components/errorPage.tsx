import { ReactNode } from 'react';

type ErrorPageProps = {
  icon: ReactNode;
  heading: string;
  subtitle: string;
};

const ErrorPage = ({ icon, heading, subtitle }: ErrorPageProps) => {
  return (
    <div className='mt-24 flex flex-col items-center justify-center text-center'>
      <div className='mb-8 h-48 w-48'>{icon}</div>
      <h2 className='mb-8 text-4xl font-semibold'>{heading}</h2>
      <p className='mb-12 text-xl'>{subtitle}</p>
    </div>
  );
};

export default ErrorPage;