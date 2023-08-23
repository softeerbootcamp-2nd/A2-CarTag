import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface IProgressProvider {
  children: ReactNode;
}

interface IProgressContext {
  nextStepAvailable: boolean;
  setNextStepAvailable: Dispatch<SetStateAction<boolean>>;
}

const initialContext = {
  nextStepAvailable: false,
  setNextStepAvailable: () => {},
};

export const ProgressContext = createContext<IProgressContext>(initialContext);

export default function TrimProvider({ children }: IProgressProvider) {
  const [nextStepAvailable, setNextStepAvailable] = useState<boolean>(false);

  const providerValue = {
    nextStepAvailable,
    setNextStepAvailable,
  };
  useEffect(() => {
    const isSelectedTrim = localStorage.getItem('isSelectedTrim');
    if (isSelectedTrim && isSelectedTrim === 'true') setNextStepAvailable(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('isSelectedTrim', nextStepAvailable.toString());
  }, [nextStepAvailable]);
  return <ProgressContext.Provider value={providerValue}>{children}</ProgressContext.Provider>;
}
