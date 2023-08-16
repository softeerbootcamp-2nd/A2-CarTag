import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IDefaultOptionProvider {
  children: ReactNode;
}

export interface IDefaultOption {
  optionId: number;
  optionName: string;
  optionCategoryName: string;
  hashtagName: string;
  optionImage: string;
  percentage: number;
  optionPrice: number;
  hasHmgData: boolean;
}

interface IDefaultOptionContext {
  defaultOption: IDefaultOption[] | null;
  defaultOptionLoading: boolean;
  currentOptionIdx: number;
  setDefaultOption: Dispatch<SetStateAction<IDefaultOption[] | null>>;
  setDefaultOptionLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentOptionIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  defaultOption: null,
  defaultOptionLoading: true,
  currentOptionIdx: 1,
  setDefaultOption: () => {},
  setDefaultOptionLoading: () => {},
  setCurrentOptionIdx: () => {},
};

export const DefaultOptionContext = createContext<IDefaultOptionContext>(initialContext);

export default function DefaultOptionProvider({ children }: IDefaultOptionProvider) {
  const [defaultOption, setDefaultOption] = useState<IDefaultOption[] | null>(null);
  const [defaultOptionLoading, setDefaultOptionLoading] = useState<boolean>(false);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(1);

  const providerValue = {
    defaultOption,
    defaultOptionLoading,
    currentOptionIdx,
    setDefaultOptionLoading,
    setDefaultOption,
    setCurrentOptionIdx,
  };

  return (
    <DefaultOptionContext.Provider value={providerValue}>{children}</DefaultOptionContext.Provider>
  );
}
