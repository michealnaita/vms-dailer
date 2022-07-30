import { useState, useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { useSession, signIn } from 'next-auth/react';
import twilio from '../utils/twilioDevice';
import Image from 'next/image';

const numbers = [
  { number: 1, letters: '' },
  { number: 2, letters: 'abc' },
  { number: 3, letters: 'def' },
  { number: 4, letters: 'ghi' },
  { number: 5, letters: 'jkl' },
  { number: 6, letters: 'mno' },
  { number: 7, letters: 'pqrs' },
  { number: 8, letters: 'tuv' },
  { number: 9, letters: 'wxyz' },
  { number: '*', letters: '' },
  { number: 0, letters: '+' },
  { number: '#', letters: '' },
];
function NumberBtn({ number, letters, sendDigits, setInput }) {
  function handleClick(number) {
    sendDigits(number);
    setInput(number.toString());
  }
  return (
    <div
      className="highlight-none active:bg-[rgba(255,255,255,0.2)] select-none  bg-[rgba(255,255,255,0.3)]  text-white flex cursor-pointer items-center justify-center flex-col w-[70px] h-[70px] rounded-full relative"
      onClick={() => handleClick(number)}
    >
      <p className="text-3xl">{number}</p>
      {letters && (
        <p className="absolute bottom-2 text-[10px] ">
          {letters.toUpperCase()}
        </p>
      )}
    </div>
  );
}
function NumPad({ setInput, call }) {
  function sendDigits(digit) {
    call.sendDigits(digit.toString());
  }
  return (
    <ul className="grid grid-cols-3  gap-4">
      {numbers.map((num, i) => (
        <li key={i}>
          <NumberBtn
            setInput={setInput}
            number={num.number}
            sendDigits={sendDigits}
            letters={num.letters}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [loading, setLoading] = useState({ status: true, message: '' });
  const [device, setDevice] = useState(null);
  const [call, setCall] = useState(null);
  const { data: session, status } = useSession();
  const [input, setInput] = useState('');

  function updateInput(value) {
    let newInput = input + value;
    if (newInput.length > 12) {
      newInput = newInput.slice(-12);
    }
    setInput(newInput);
  }

  async function startCall() {
    setLoading({ status: true, message: 'Dailing...' });
    const call = await device.connect();
    if (call) {
      call.on('error', (err) => {
        console.log(err);
      });
      call.on('disconnect', () => {
        endCall();
      });
      setCall(call);
      setLoading({ status: false, message: '' });
    } else {
      console.log('Error: ', call);
    }
  }
  function endCall() {
    setInput('');
    call && call.disconnect();
    device.disconnectAll();
    setCall(null);
  }

  useEffect(() => {
    setLoading({ status: true, message: 'Creating Device...' });
    fetch('/api/twilioToken')
      .then((res) => res.json())
      .then((data) => {
        const device = twilio(data.token);
        setDevice(device);
        setLoading({ status: false, message: '' });
      });
  }, []);

  if (false) {
    signIn();
    return;
  }
  if (!device || loading.status) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-8 py-24  bg-black">
        <Image src="/loading.gif" alt="loading.gif" width="50" height="50" />
        <p className="text-white text-2xl">{loading.message}</p>
      </div>
    );
  }
  return (
    <div className='bg-center bg-[url("/bg.jpg")] bg-cover bg-no-repeat h-full'>
      {call ? (
        <div className="flex py-8 flex-col gap-4 items-center justify-center  backdrop-blur-md h-full">
          <div className=" text-white text-xl rounded-md px-4 bg-green-500">
            00:04
          </div>
          <div className="text-white text-4xl my-4">{input}</div>
          <NumPad setInput={updateInput} call={call} />
          <button
            className="w-[70px] h-[70px] bg-red-600 rounded-full highlight-none  flex justify-center items-center"
            onClick={() => endCall()}
          >
            <ImPhoneHangUp className="text-white pointer-events-none text-4xl transform -translate-y-1" />
          </button>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-between py-24  bg-black">
          <h1 className="text-2xl text-white font ">
            Make <span className="text-cyan-500">call now </span>to get started
            <span className="text-cyan-500 text-3xl font-bold">.</span>
          </h1>
          <button
            className="text-xl text-white  animate-pulse duration-100 bg-green-500 highlight-none w-[70px] h-[70px] rounded-full flex items-center justify-center"
            onClick={() => startCall()}
          >
            <FaPhoneAlt className="text-3xl pointer-events-none" />
          </button>
        </div>
      )}
    </div>
  );
}
