import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import logo from '../public/logo.png';

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  });
  return (
    <div className="w-full h-full flex justify-center items-center flex-col text-white bg-black font-bold text-2xl">
      <Image src={logo} width="200" height="200" alt="" />
      <span>coming back soon...</span>
    </div>
  );
}
