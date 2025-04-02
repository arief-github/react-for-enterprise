import React, { useContext } from 'react';
import {
  GlobalSpinnerContext,
  GlobalSpinnerContextValue,
} from '@/context/GlobalSpinnerContext';

type GlobalSpinnerExampleContentProps = {
  onShowSpinner: () => void;
};

const GlobalSpinnerExampleContentComponent = (
  props: GlobalSpinnerExampleContentProps
) => {
  console.log('GlobalSpinnerExample rendered');

  return (
    <div className='py-8 max-w-2xl mx-auto space-y-4'>
      <button
        className='bg-blue-600 text-blue-100 px-4 py-3'
        onClick={props.onShowSpinner}
      >
        Show Global Spinner
      </button>
    </div>
  );
};

const GlobalSpinnerExampleContent = React.memo(
  GlobalSpinnerExampleContentComponent,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  (prevProps, nextProps) => true
);

// type GlobalSpinnerExampleProps = {};

const GlobalSpinnerExample = () => {
  const { showSpinner, hideSpinner } = useContext(
    GlobalSpinnerContext
  ) as GlobalSpinnerContextValue;

  const onShowSpinner = () => {
    showSpinner();
    setTimeout(hideSpinner, 2000);
  };

  return <GlobalSpinnerExampleContent onShowSpinner={onShowSpinner} />;
};

export default GlobalSpinnerExample;
