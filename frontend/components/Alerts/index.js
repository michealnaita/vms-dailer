import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { FaTimes, FaTimesCircle, FaCheck } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import classNames from 'classnames';

function Alert({ message, type, discard, index }) {
  const classes = classNames(
    'flex justify-between items-center rounded-md border-2 w-full p-2 text-white',
    {
      'bg-red-500  border-red-400': type === 'error',
      'bg-yellow-500 border-yellow-400': type === 'warning',
      'bg-green-500 border-green-400': type === 'info',
    }
  );
  const Icon = () => {
    if (type === 'error') return <FaTimesCircle className="text-red-400 " />;
    if (type === 'info') return <FaCheck className="text-green-400" />;
    if (type === 'warning')
      return <IoWarningOutline className="text-yellow-400" />;
  };
  useEffect(() => {
    setTimeout(() => {
      discard(index);
    }, 3000);
  }, []);
  return (
    <div className={classes}>
      <span className="flex items-center gap-2">
        <Icon />
        {message}
      </span>
      <span
        className="text-xl"
        onClick={() => {
          discard(index);
        }}
      >
        <FaTimes />
      </span>
    </div>
  );
}
const AlertWrapper = (_, ref) => {
  const [alerts, setAlerts] = useState([]);
  function discard(index) {
    const _alerts = alerts.filter((_, i) => i !== index);
    setAlerts(_alerts);
  }
  useImperativeHandle(ref, () => ({
    alertUser: (alert) => {
      const _alerts = [alert, ...alerts];
      setAlerts(_alerts);
    },
  }));
  return (
    <div className="fixed w-full  p-2 gap-2 top-0 flex flex-col">
      {alerts &&
        alerts.map((alert, i) => (
          <Alert
            key={i}
            index={i}
            message={alert.message}
            type={alert.type}
            discard={discard}
          />
        ))}
    </div>
  );
};
export default forwardRef(AlertWrapper);
