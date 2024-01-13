import { useState, useEffect } from 'react';
import { toPersianNumeral } from './FormatPersianTime';

const NumberCounter = ({ targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(targetNumber);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    if (targetNumber > currentNumber) {
      setDirection('up');
    } else {
      setDirection('down');
    }
  }, [targetNumber]);

  useEffect(() => {
    let intervalId;
    if (direction === 'up') {
      intervalId = setInterval(() => {
        setCurrentNumber(prevNumber => {
          if (prevNumber < targetNumber) {
            return prevNumber + 1;
          } else {
            clearInterval(intervalId);
            return prevNumber;
          }
        });
      }, 15); // Change the interval duration if needed
    } else if (direction === 'down') {
      intervalId = setInterval(() => {
        setCurrentNumber(prevNumber => {
          if (prevNumber > targetNumber) {
            return prevNumber - 1;
          } else {
            clearInterval(intervalId);
            return prevNumber;
          }
        });
      }, 15); // Change the interval duration if needed
    }

    return () => clearInterval(intervalId); // Cleanup on unmount or direction change
  }, [targetNumber, direction]);

  return <div className='flex'>{toPersianNumeral(currentNumber)}٪</div>;
};

export default NumberCounter;