import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Alerts from '../frontend/components/Alerts';

export default function SignIn() {
  const alertsRef = useRef();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  async function handleSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();
      const data = new FormData(e.target);
      const payload = Object.fromEntries(data);
      const res = await signIn('credentials', {
        redirect: false,
        ...payload,
      });
      if (res.error) {
        if (res.status === 401) {
          alertUser('error', 'Invalid Credentials');
        }
      }
      if (res.url) {
        router.push('/');
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  function alertUser(type, message) {
    alertsRef.current && alertsRef.current.alertUser({ message, type });
  }
  if (session && typeof window !== 'undefined') {
    router.push('/');
    return <></>;
  }
  return (
    <>
      {' '}
      <Alerts ref={alertsRef} />
      <div className="bg-black h-full flex items-center justify-center">
        <form
          className="text-center space-y-8 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-[300px] h-[48px]">
            <h1 className="text-white text-4xl">
              Sign In <span className="text-cyan-500">| Mail 2</span>
            </h1>
          </div>
          <div className="w-[300px] h-[48px]">
            <input
              name="sim"
              type="text"
              placeholder="Enter sim"
              className="text-gray-500 h-full w-full rounded-md bg-transparent ring-1 focus:ring-0 ring-neutral-500 focus:outline-cyan-500 focus:bg-white outline-none p-4"
            />
          </div>
          <div className="w-[300px] h-[48px]">
            <input
              name="pin"
              type="password"
              placeholder="Enter pin"
              className="text-gray-500 h-full w-full rounded-md bg-transparent ring-1 focus:ring-0 ring-neutral-500  focus:outline-cyan-500 focus:bg-white outline-none p-4"
            />
          </div>
          <div className=" text-sm italic text-neutral-400 font-">
            * if you cant remeber your sim and password,
            <br /> send a message in the whatsapp group
          </div>
          <div>
            <button
              className="bg-cyan-500 text-2xl px-8 py-4 rounded-xl disabled:animate-pulse   disabled:cursor-wait text-white"
              disabled={loading}
            >
              {loading ? 'LOADING...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
