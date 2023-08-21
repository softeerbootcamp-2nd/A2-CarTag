import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

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

  return <ProgressContext.Provider value={providerValue}>{children}</ProgressContext.Provider>;
}
