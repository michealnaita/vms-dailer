import { useState, useEffect } from 'react';
import NumPad from '../NumPad';
import { ImPhoneHangUp } from 'react-icons/im';

export default function Dailer({ call, handleEndCall }) {
  const [input, setInput] = useState(' ');
  const [time, setTime] = useState(0);

  function updateInput(value) {
    let newInput = input + value;
    if (newInput.length > 12) {
      newInput = newInput.slice(-12);
    }
    setInput(newInput);
  }
  function endCall() {
    handleEndCall();
    setInput('');
  }
  function renderedTime() {
    let mins = Math.floor(time / 60).toString();
    let secs = Math.floor(time % 60).toString();
    if (mins.length == 1) mins = '0' + mins;
    if (secs.length == 1) secs = '0' + secs;
    const _time = mins + ':' + secs;
    return _time;
  }
  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  }, [time]);
  return (
    <div className="flex py-8 flex-col gap-4 items-center justify-center backdrop-blur-md h-full">
      <div className=" text-white text-xl rounded-md px-4 bg-green-500">
        {renderedTime()}
      </div>
      <div className="text-white text-4xl my-4 min-h-[40px]">{input}</div>
      <NumPad setInput={updateInput} call={call} />
      <button
        className="w-[70px] h-[70px] bg-red-600 rounded-full highlight-none  flex justify-center items-center"
        onClick={() => endCall()}
      >
        <ImPhoneHangUp className="text-white pointer-events-none text-4xl transform -translate-y-1" />
      </button>
    </div>
  );
}
