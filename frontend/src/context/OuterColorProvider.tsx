import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IOuterColorProvider {
  children: ReactNode;
}
export interface IOuterColor {
  colorName: string;
  colorImage: string;
  colorPrice: number;
  colorBoughtCount: number;
}
export interface ISelected {
  page: number;
  idx: number;
}

interface IOuterColorContext {
  data: IOuterColor[] | null;
  loading: boolean;
  selectedIdx: ISelected;
  setData: Dispatch<SetStateAction<IOuterColor[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedIdx: Dispatch<SetStateAction<ISelected>>;
}

const initialContext: IOuterColorContext = {
  data: null,
  loading: true,
  selectedIdx: { page: 0, idx: 0 },
  setLoading: () => {},
  setData: () => {},
  setSelectedIdx: () => {},
};

export const OuterColorContext = createContext<IOuterColorContext>(initialContext);

export default function OuterColorProvider({ children }: IOuterColorProvider) {
  const [data, setData] = useState<IOuterColor[] | null>(initialContext.data);
  const [selectedIdx, setSelectedIdx] = useState<ISelected>(initialContext.selectedIdx);
  const [loading, setLoading] = useState(initialContext.loading);

  const providerValue = { data, selectedIdx, loading, setSelectedIdx, setData, setLoading };

  return <OuterColorContext.Provider value={providerValue}>{children}</OuterColorContext.Provider>;
}
