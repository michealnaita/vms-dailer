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

export default function NumPad({ setInput, call }) {
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
