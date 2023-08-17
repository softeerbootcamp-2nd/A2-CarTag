import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface ITrimProvider {
  children: ReactNode;
}
export interface ICartype {
  carId: number;
  trim: string;
  carDefaultPrice: number;
  outerImage: string;
  innerImage: string;
  wheelImage: string;
  carDescription: string;
  options: [
    {
      optionName: string;
      optionImage: string;
      optionDescription: string;
      optionUsedCount: number;
    },
  ];
}

interface ITrimContext {
  data: ICartype[] | null;
  loading: boolean;
  selectedImgIdx: number;
  selectedTrimIdx: number;

  setData: Dispatch<SetStateAction<ICartype[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedTrimIdx: Dispatch<SetStateAction<number>>;
  setSelectedImgIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  data: null,
  loading: true,
  selectedTrimIdx: 0,
  selectedImgIdx: 0,
  setData: () => {},
  setLoading: () => {},
  setSelectedTrimIdx: () => {},
  setSelectedImgIdx: () => {},
};

export const TrimContext = createContext<ITrimContext>(initialContext);

export default function TrimProvider({ children }: ITrimProvider) {
  const [selectedTrimIdx, setSelectedTrimIdx] = useState(0);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [data, setData] = useState<ICartype[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const providerValue = {
    data,
    loading,
    selectedTrimIdx,
    selectedImgIdx,
    setData,
    setLoading,
    setSelectedTrimIdx,
    setSelectedImgIdx,
  };

  return <TrimContext.Provider value={providerValue}>{children}</TrimContext.Provider>;
}
