import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export interface IInnerColor {
  colorId: number;
  colorName: string;
  colorImage: string;
  colorPrice: number;
  colorBoughtPercent: number;
  colorCarImage: string;
}

interface IInnerColorContext {
  data: IInnerColor[] | null;
  selectedIdx: { page: number; idx: number };
  setData: Dispatch<SetStateAction<IInnerColor[] | null>>;
  setSelectedIdx: Dispatch<SetStateAction<{ page: number; idx: number }>>;
}
interface IInnerColorProvider {
  children: ReactNode;
}
const initialContext = {
  data: null,
  selectedIdx: { page: 0, idx: 0 },
  setData: () => {},
  setSelectedIdx: () => {},
};

export const InnerColorContext = createContext<IInnerColorContext>(initialContext);

export default function InnerColorProvider({ children }: IInnerColorProvider) {
  const [data, setData] = useState<IInnerColor[] | null>(initialContext.data);
  const [selectedIdx, setSelectedIdx] = useState(initialContext.selectedIdx);

  const providerValue = {
    data,
    selectedIdx,
    setData,
    setSelectedIdx,
  };
  return <InnerColorContext.Provider value={providerValue}>{children}</InnerColorContext.Provider>;
}
