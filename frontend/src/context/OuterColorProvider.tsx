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
  data: IOuterColor[] | null;
  loading: boolean;
  selectedIdx: ISelected;
  seletedColorId: number;
  setData: Dispatch<SetStateAction<IOuterColor[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedIdx: Dispatch<SetStateAction<ISelected>>;
  setSelectedColorId: Dispatch<SetStateAction<number>>;
}

const initialContext: IOuterColorContext = {
  data: null,
  loading: true,
  selectedIdx: { page: 0, idx: 0 },
  seletedColorId: 3,
  setLoading: () => {},
  setData: () => {},
  setSelectedIdx: () => {},
  setSelectedColorId: () => {},
};

export const OuterColorContext = createContext<IOuterColorContext>(initialContext);

export default function OuterColorProvider({ children }: IOuterColorProvider) {
  const [data, setData] = useState<IOuterColor[] | null>(initialContext.data);
  const [selectedIdx, setSelectedIdx] = useState<ISelected>(initialContext.selectedIdx);
  const [seletedColorId, setSelectedColorId] = useState<number>(initialContext.seletedColorId);
  const [loading, setLoading] = useState(initialContext.loading);

  const providerValue = {
    data,
    selectedIdx,
    loading,
    seletedColorId,
    setSelectedIdx,
    setData,
    setLoading,
    setSelectedColorId,
  };

  return <OuterColorContext.Provider value={providerValue}>{children}</OuterColorContext.Provider>;
}
