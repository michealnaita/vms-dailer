import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  });
  return (
    <div className="w-full h-full flex justify-center items-center text-white bg-black font-bold text-xl">
      redirecting...
    </div>
  );
}
