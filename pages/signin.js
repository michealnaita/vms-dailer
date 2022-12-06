import { useState, useRef } from 'react';
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
        router.push('/phone');
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
    router.push('/phone');
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
              placeholder="Enter Phone"
              className="text-gray-500 h-full w-full rounded-md bg-transparent ring-1 focus:ring-0 ring-neutral-500 focus:outline-cyan-500 focus:bg-white outline-none p-4"
            />
          </div>
          <div className="w-[300px] h-[48px]">
            <input
              name="pin"
              type="password"
              placeholder="Enter Pin"
              className="text-gray-500 h-full w-full rounded-md bg-transparent ring-1 focus:ring-0 ring-neutral-500  focus:outline-cyan-500 focus:bg-white outline-none p-4"
            />
          </div>
          <div className=" text-sm italic text-neutral-400">
            * if you cant remeba your sim and password,
            <br /> send a message in the whatsapp group
            <br />
          </div>
          <div className=" text-sm italic text-neutral-400">
            dont have an account? join whatsapp group to
            <br />
            <span className="text-cyan-500 text-lg">
              <a href="https://chat.whatsapp.com/Fk1i49ipQowKt8g7gV0s9d">
                get access
              </a>
            </span>
          </div>

          <div>
            <button className="btn-primary" disabled={loading}>
              {loading ? 'LOADING...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
