import { useEffect, useState } from 'react';
import './Counter.css';

export interface CounterProps {
  resetCounter: boolean;
}

function Counter(resetCounter: boolean) {
  const [counter, setIncrementCounter] = useState(0);

  // Reset the counter when resetCounter is true
  useEffect(() => {
    if (resetCounter) {
      setIncrementCounter(0);
      console.log(`Counter reset`);
    }
  }, [resetCounter]);

  // Increment the counter
  function increment(): void {
    setIncrementCounter(counter + 1);

    console.log(`Counter incremented ${counter}`);
  }

  // Add a rainbow class when the counter is greater than or equal to 5 & print the counter
  return (
    <button
      className={counter >= 5 ? 'rainbow' : ''}
      type="button"
      onClick={increment}
    >
      <span role="img" aria-label="folded hands">
        ⏲️
      </span>
      {` ${counter}`}
    </button>
  );
}

export default Counter;
