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
interface ISelectedModelTypeIdx {
  [key: string]: number;
}

interface IModelTypeContext {
  modelType: IModelType[] | null;
  loading: boolean;
  selectedModelTypeIdx: ISelectedModelTypeIdx;
  currentModelTypeIdx: number;
  setModelType: Dispatch<SetStateAction<IModelType[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedModelTypeIdx: Dispatch<SetStateAction<ISelectedModelTypeIdx>>;
  handleSelectedIdx: (key: string, idx: number) => void;
  setCurrentModelTypeIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  modelType: null,
  loading: true,
  selectedModelTypeIdx: {
    powertrain: 0,
    operation: 0,
    bodytype: 0,
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
  const [selectedModelTypeIdx, setSelectedModelTypeIdx] = useState<ISelectedModelTypeIdx>({
    powertrain: 1,
    operation: 3,
    bodytype: 5,
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
