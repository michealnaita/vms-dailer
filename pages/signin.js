import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });
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
      setLoading(false);
      if (res.error) {
        if (res.status === 401) {
          setError({ status: true, message: 'Invalid Credentials' });
        }
      }
      if (res.url) {
        router.push(res.url);
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (session) {
    router.push('/');
    return <></>;
  }
  return (
    <div className="bg-black h-full flex items-center justify-center">
      {error.status && (
        <div className="bg-red-500  flex justify-between items-center rounded-md border-2 fixed w-full p-2 text-white top-4 border-red-400">
          <span>{error.message}</span>
          <span
            className="text-xl"
            onClick={() => {
              setError({ status: false, message: '' });
            }}
          >
            <FaTimes />
          </span>
        </div>
      )}
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
  );
}
