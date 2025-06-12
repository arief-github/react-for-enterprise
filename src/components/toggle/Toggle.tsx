import clsx from 'clsx';
import { useState } from 'react';

export default function ToggleButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='flex flex-col items-center gap-4 mt-10'>
      <button
        data-testid='button'
        onClick={() => setIsVisible((prev) => !prev)}
        className={clsx(
          'relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300',
          isVisible ? 'bg-green-500' : 'bg-gray-300'
        )}
      >
        <span
          data-testid='spanToggle'
          className={clsx(
            `inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300`,
            isVisible ? 'translate-x-8' : 'translate-x-1'
          )}
        ></span>
      </button>
    </div>
  );
}
