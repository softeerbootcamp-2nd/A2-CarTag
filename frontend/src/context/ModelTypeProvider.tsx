import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IModelTypeProvider {
  children: ReactNode;
}

export interface IModelType {
  modelId: number;
  modelName: string;
  modelTypeName: string;
  modelPrice: number;
  percentage: number;
}

interface IModelTypeContext {
  modelType: IModelType[] | null;
  loading: boolean;
  selectedModelTypeIdx: Record<string, number>;
  currentModelTypeIdx: number;
  setModelType: Dispatch<SetStateAction<IModelType[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedModelTypeIdx: Dispatch<SetStateAction<Record<string, number>>>;
  handleSelectedIdx: (key: string, idx: number) => void;
  setCurrentModelTypeIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  modelType: null,
  loading: true,
  selectedModelTypeIdx: {
    파워트레인: 0,
    구동방식: 0,
    바디타입: 0,
  },
  currentModelTypeIdx: 1,
  setModelType: () => {},
  setLoading: () => {},
  setSelectedModelTypeIdx: () => {},
  handleSelectedIdx: () => {},
  setCurrentModelTypeIdx: () => {},
};

export const ModelTypeContext = createContext<IModelTypeContext>(initialContext);

export default function ModelTypeProvider({ children }: IModelTypeProvider) {
  const [modelType, setModelType] = useState<IModelType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModelTypeIdx, setSelectedModelTypeIdx] = useState<Record<string, number>>({
    파워트레인: 1,
    구동방식: 3,
    바디타입: 5,
  });
  const [currentModelTypeIdx, setCurrentModelTypeIdx] = useState(1);
  const handleSelectedIdx = (key: string, idx: number) => {
    setSelectedModelTypeIdx((prevSelectedTypeIdx) => ({
      ...prevSelectedTypeIdx,
      [key]: idx,
    }));
  };
  const providerValue = {
    modelType,
    loading,
    selectedModelTypeIdx,
    currentModelTypeIdx,
    setModelType,
    setLoading,
    setSelectedModelTypeIdx,
    setCurrentModelTypeIdx,
    handleSelectedIdx,
  };

  return <ModelTypeContext.Provider value={providerValue}>{children}</ModelTypeContext.Provider>;
}
