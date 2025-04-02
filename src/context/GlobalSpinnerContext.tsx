import React, { createContext, useMemo } from 'react';
import { useToggleState } from '@/hooks/useToggleState';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';

export type GlobalSpinnerContextValue = {
  isSpinnerVisible: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
  toggleSpinner: () => void;
};

export const GlobalSpinnerContext = createContext<
  GlobalSpinnerContextValue | undefined
>(undefined);

type GlobalSpinnerContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalSpinnerContextProvider = (
  props: GlobalSpinnerContextProviderProps
) => {
  const { children } = props;
  const {
    state: isSpinnerVisible,
    open: showSpinner,
    close: hideSpinner,
    toggle: toggleSpinner,
  } = useToggleState(false);

  const values = useMemo(() => {
    return {
      isSpinnerVisible,
      showSpinner,
      hideSpinner,
      toggleSpinner,
    };
  }, [isSpinnerVisible]);

  return (
    <GlobalSpinnerContext.Provider value={values}>
      {children}
      <GlobalSpinner show={isSpinnerVisible} />
    </GlobalSpinnerContext.Provider>
  );
};
