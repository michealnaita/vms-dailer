import React from 'react';
import { useRouter } from 'next/router';

export default function Signin() {
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    router.go('/');
  }
  return (
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
            type="text"
            placeholder="Enter sim"
            className="text-gray-500 h-full w-full rounded-md bg-transparent ring-1 focus:ring-0 ring-neutral-500 focus:outline-cyan-500 focus:bg-white outline-none p-4"
          />
        </div>
        <div className="w-[300px] h-[48px]">
          <input
            type="text"
            placeholder="Enter pin"
            className="text-gray-500 h-full w-full rounded-md bg-transparent ring-1 focus:ring-0 ring-neutral-500  focus:outline-cyan-500 focus:bg-white outline-none p-4"
          />
        </div>
        <div className=" text-sm italic text-neutral-400 font-">
          * if you cant remeber your sim and password,
          <br /> send a message in the whatsapp group
        </div>
        <div>
          <button className="bg-cyan-500 text-2xl px-8 py-4 rounded-xl text-white">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
