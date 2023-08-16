import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IDefaultOptionProvider {
  children: ReactNode;
}

export interface IDefaultOption {
  defaultOptionId: number;
  optionName: string;
  optionCategoryName: string;
  hashtagName: string;
  optionImage: string;
  percentage: number;
  optionPrice: number;
  hasHmgDefaultOption: boolean;
}

interface IDefaultOptionContext {
  defaultOption: IDefaultOption[] | null;
  defaultOptionLoading: boolean;
  selectedOptionIdx: number;
  currentOptionIdx: number;
  setDefaultOption: Dispatch<SetStateAction<IDefaultOption[] | null>>;
  setDefaultOptionLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedOptionIdx: Dispatch<SetStateAction<number>>;
  setCurrentOptionIdx: Dispatch<SetStateAction<number>>;
  handleClick: (index: number) => void;
}

const initialContext = {
  defaultOption: null,
  defaultOptionLoading: true,
  selectedOptionIdx: 0,
  currentOptionIdx: 1,
  setDefaultOption: () => {},
  setDefaultOptionLoading: () => {},
  setSelectedOptionIdx: () => {},
  setCurrentOptionIdx: () => {},
  handleClick: () => {},
};

export const DefaultOptionContext = createContext<IDefaultOptionContext>(initialContext);

export default function DefaultOptionProvider({ children }: IDefaultOptionProvider) {
  const [defaultOption, setDefaultOption] = useState<IDefaultOption[] | null>(null);
  const [defaultOptionLoading, setDefaultOptionLoading] = useState<boolean>(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(1);
  const handleClick = (index: number) => {
    setSelectedOptionIdx(index);
  };
  const providerValue = {
    defaultOption,
    defaultOptionLoading,
    selectedOptionIdx,
    currentOptionIdx,
    setDefaultOption,
    setCurrentOptionIdx,
    setDefaultOptionLoading,
    setSelectedOptionIdx,
    handleClick,
  };

  return (
    <DefaultOptionContext.Provider value={providerValue}>{children}</DefaultOptionContext.Provider>
  );
}
