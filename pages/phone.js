import { useState, useEffect, useRef } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { useSession, signIn } from 'next-auth/react';
import twilio from '../frontend/utils/twilioDevice';
import Image from 'next/image';
import Alerts from '../frontend/components/Alerts';
import Dailer from '../frontend/components/Dailer';
import Link from 'next/link';
import logo from '../public/logo.png';

function StartPage({ startCall }) {
  return (
    <div className="h-full text-white w-full flex flex-col items-center justify-between py-24  bg-black">
      <div className="space-y-4">
        <div className=" top-4 left-4">
          <Image src={logo} loading="eager" width="200" height="200" alt="" />
        </div>
        <p>Make call to get started</p>
        <div className=" max-w-[320px] text-base italic text-left text-neutral-400">
          ...remember that making this call from your browser just simulates
          what it would be like if you called the actual number
        </div>
        <Link href="/">
          <a className="text-lg text-cyan-500 mt-16">Return to Home page</a>
        </Link>
      </div>
      <button
        className="text-xl text-white duration-100 bg-green-500 highlight-none w-[60px] h-[60px] rounded-full flex items-center justify-center"
        onClick={() => startCall()}
      >
        <FaPhoneAlt className="text-2xl pointer-events-none" />
      </button>
    </div>
  );
}

export default function Home() {
  const alertsRef = useRef();
  const [loading, setLoading] = useState({
    status: true,
    message: '',
    loader: true,
  });
  const [device, setDevice] = useState(null);
  const [call, setCall] = useState(null);
  const { data: session, status } = useSession();

  async function startCall() {
    setLoading({ status: true, message: 'Dailing...', loader: false });
    const call = await device.connect();
    if (call) {
      call.on('error', (err) => {
        alertUser('error', err.message);
        console.log(err);
      });
      device.on('warn', (err) => {
        alertUser('warning', err.message);
        console.log(err);
      });
      call.on('disconnect', () => {
        alertUser('info', 'call ended');
        handleEndCall();
      });
      setCall(call);
      setLoading({ status: false, message: '' });
    } else {
      console.log('Error: ', call);
      alertUser('error', "couldn't connect call");
    }
  }
  function handleEndCall() {
    device.disconnectAll();
    call && call.disconnect();
    setCall(null);
  }
  function alertUser(type, message) {
    alertsRef.current && alertsRef.current.alertUser({ message, type });
  }

  useEffect(() => {
    setLoading({ status: true, message: 'Creating Device...', loader: true });
    fetch('/api/twilioToken')
      .then((res) => res.json())
      .then((data) => {
        const device = twilio(data.token);
        setDevice(device);
        setLoading({ status: false, message: '' });
        alertUser('info', 'Device Successfully created');
      });
  }, []);

  if (!session && typeof window !== 'undefined') {
    signIn();
    return;
  }
  if (!device || loading.status) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-8 py-24  bg-black">
        {loading.loader && (
          <Image src="/loading.gif" alt="loading.gif" width="50" height="50" />
        )}
        <p className="text-white text-2xl animate-pulse ">{loading.message}</p>
      </div>
    );
  }
  return (
    <>
      <Alerts ref={alertsRef} />
      <div className='bg-center bg-[url("/bg.jpg")] bg-cover bg-no-repeat h-full'>
        {call ? (
          <Dailer call={call} handleEndCall={handleEndCall} />
        ) : (
          <StartPage startCall={startCall} />
        )}
      </div>
    </>
  );
}
