import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface ISubOptionProvider {
  children: ReactNode;
}

export interface ISubOption {
  subOptionId: number;
  optionName: string;
  optionCategoryName: string;
  hashtagName: string;
  optionImage: string;
  percentage: number;
  optionPrice: number;
  hasHmgData: boolean;
}

interface ISubOptionContext {
  subOption: ISubOption[] | null;
  subOptionLoading: boolean;
  selectedOptionIdx: number[];
  currentOptionIdx: number;
  setSubOption: Dispatch<SetStateAction<ISubOption[] | null>>;
  setSubOptionLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedOptionIdx: Dispatch<SetStateAction<number[]>>;
  setCurrentOptionIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  subOption: null,
  subOptionLoading: true,
  selectedOptionIdx: [],
  currentOptionIdx: 69,
  setSubOption: () => {},
  setSubOptionLoading: () => {},
  setSelectedOptionIdx: () => {},
  setCurrentOptionIdx: () => {},
};

export const SubOptionContext = createContext<ISubOptionContext>(initialContext);

export default function SubOptionProvider({ children }: ISubOptionProvider) {
  const [subOption, setSubOption] = useState<ISubOption[] | null>(null);
  const [subOptionLoading, setSubOptionLoading] = useState<boolean>(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number[]>([]);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(69);

  useEffect(() => {}, [selectedOptionIdx]);
  const providerValue = {
    subOption,
    subOptionLoading,
    selectedOptionIdx,
    currentOptionIdx,
    setSubOption,
    setCurrentOptionIdx,
    setSubOptionLoading,
    setSelectedOptionIdx,
  };

  return <SubOptionContext.Provider value={providerValue}>{children}</SubOptionContext.Provider>;
}
