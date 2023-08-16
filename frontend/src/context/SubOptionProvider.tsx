import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

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
  hasHmgsubOption: boolean;
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
  handleClick: (index: number) => void;
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
  handleClick: () => {},
};

export const SubOptionContext = createContext<ISubOptionContext>(initialContext);

export default function SubOptionProvider({ children }: ISubOptionProvider) {
  const [subOption, setSubOption] = useState<ISubOption[] | null>(null);
  const [subOptionLoading, setSubOptionLoading] = useState<boolean>(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number[]>([]);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(69);
  const handleClick = (index: number) => {
    setSelectedOptionIdx((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(index)) {
        return prevSelectedOptions.filter((item) => item !== index);
      } else {
        return [...prevSelectedOptions, index];
      }
    });
  };
  const providerValue = {
    subOption,
    subOptionLoading,
    selectedOptionIdx,
    currentOptionIdx,
    setSubOption,
    setCurrentOptionIdx,
    setSubOptionLoading,
    setSelectedOptionIdx,
    handleClick,
  };

  return <SubOptionContext.Provider value={providerValue}>{children}</SubOptionContext.Provider>;
}
