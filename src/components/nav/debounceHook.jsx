import {useEffect, useState} from 'react';

export default function useDebounce(value, timeout, callback) {
  console.log('debouncer', value)
  const [timer, setTimer] = useState(null);

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer); //takes an id that is created by setTimeOut()
    }
  };

  useEffect(() => {
    clearTimer();
    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]); //value is the input value
}
