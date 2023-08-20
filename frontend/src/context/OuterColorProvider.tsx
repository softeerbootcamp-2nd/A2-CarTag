import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IOuterColorProvider {
  children: ReactNode;
}
export interface IOuterColor {
  colorId: number;
  colorName: string;
  colorImage: string;
  colorPrice: number;
  colorBoughtPercent: number;
  colorCarImage: string;
}
export interface ISelected {
  page: number;
  idx: number;
}

interface IOuterColorContext {
  outerColorData: IOuterColor[] | null;
  car360UrlsData: string[] | null;
  loading: boolean;
  setOuterColorData: Dispatch<SetStateAction<IOuterColor[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCar360UrlsData: Dispatch<SetStateAction<string[] | null>>;
}

const initialContext: IOuterColorContext = {
  outerColorData: null,
  car360UrlsData: [],
  loading: true,
  setLoading: () => {},
  setOuterColorData: () => {},
  setCar360UrlsData: () => {},
};

export const OuterColorContext = createContext<IOuterColorContext>(initialContext);

export default function OuterColorProvider({ children }: IOuterColorProvider) {
  const [outerColorData, setOuterColorData] = useState<IOuterColor[] | null>(
    initialContext.outerColorData
  );
  const [car360UrlsData, setCar360UrlsData] = useState<string[] | null>(
    initialContext.car360UrlsData
  );
  const [loading, setLoading] = useState(initialContext.loading);

  const providerValue = {
    outerColorData,
    car360UrlsData,
    loading,
    setOuterColorData,
    setCar360UrlsData,
    setLoading,
  };

  return <OuterColorContext.Provider value={providerValue}>{children}</OuterColorContext.Provider>;
}
