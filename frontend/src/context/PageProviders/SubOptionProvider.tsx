import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface ISubOptionProvider {
  children: ReactNode;
}

export interface ISubOption {
  subOptionId: number;
  optionName: string;
  optionCategoryName: string;
  hashtagName: string[];
  optionImage: string;
  percentage: number;
  optionPrice: number;
  hasHmgData: boolean;
}

interface ISubOptionContext {
  subOption: ISubOption[] | null;
  subOptionLoading: boolean;
  currentOptionIdx: number;
  setSubOption: Dispatch<SetStateAction<ISubOption[] | null>>;
  setSubOptionLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentOptionIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  subOption: null,
  subOptionLoading: true,
  currentOptionIdx: 69,
  setSubOption: () => {},
  setSubOptionLoading: () => {},
  setCurrentOptionIdx: () => {},
};

export const SubOptionContext = createContext<ISubOptionContext>(initialContext);

export default function SubOptionProvider({ children }: ISubOptionProvider) {
  const [subOption, setSubOption] = useState<ISubOption[] | null>(null);
  const [subOptionLoading, setSubOptionLoading] = useState<boolean>(false);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(69);

  const providerValue = {
    subOption,
    subOptionLoading,
    currentOptionIdx,
    setSubOption,
    setCurrentOptionIdx,
    setSubOptionLoading,
  };

  return <SubOptionContext.Provider value={providerValue}>{children}</SubOptionContext.Provider>;
}
