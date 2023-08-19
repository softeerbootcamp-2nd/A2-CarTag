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
}
export interface ISelected {
  page: number;
  idx: number;
}

interface IOuterColorContext {
  outerColorData: IOuterColor[] | null;
  car360UrlsData: string[] | null;
  loading: boolean;
  selectedIdx: ISelected;
  seletedColorId: number;
  setOuterColorData: Dispatch<SetStateAction<IOuterColor[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedIdx: Dispatch<SetStateAction<ISelected>>;
  setSelectedColorId: Dispatch<SetStateAction<number>>;
  setCar360UrlsData: Dispatch<SetStateAction<string[] | null>>;
}

const initialContext: IOuterColorContext = {
  outerColorData: null,
  car360UrlsData: [],
  loading: true,
  selectedIdx: { page: 0, idx: 0 },
  seletedColorId: 3,
  setLoading: () => {},
  setOuterColorData: () => {},
  setSelectedIdx: () => {},
  setSelectedColorId: () => {},
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
  const [selectedIdx, setSelectedIdx] = useState<ISelected>(initialContext.selectedIdx);
  const [seletedColorId, setSelectedColorId] = useState<number>(initialContext.seletedColorId);
  const [loading, setLoading] = useState(initialContext.loading);

  const providerValue = {
    outerColorData,
    car360UrlsData,
    selectedIdx,
    loading,
    seletedColorId,
    setSelectedIdx,
    setOuterColorData,
    setCar360UrlsData,
    setLoading,
    setSelectedColorId,
  };

  return <OuterColorContext.Provider value={providerValue}>{children}</OuterColorContext.Provider>;
}
