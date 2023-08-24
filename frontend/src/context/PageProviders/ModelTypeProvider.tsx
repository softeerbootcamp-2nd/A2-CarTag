import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IModelTypeProvider {
  children: ReactNode;
}
export interface IHmgData {
  maxKgfm: string;
  maxPs: string;
  ratioKgfm: number;
  ratioPs: number;
}
export interface IModelType {
  hmgData: IHmgData | null;
  modelId: number;
  modelName: string;
  modelTypeName: string;
  modelPrice: number;
  percentage: number;
  modelImage: string;
}

interface IModelTypeItem {
  id: number;
  name: string;
  title: string;
  imgSrc: string;
  price: number;
}
interface ISelectedModelType {
  [key: string]: IModelTypeItem;
}

interface IModelTypeContext {
  modelType: IModelType[] | null;
  loading: boolean;
  selectedModelType: ISelectedModelType;
  currentModelTypeIdx: number;
  setModelType: Dispatch<SetStateAction<IModelType[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedModelType: Dispatch<SetStateAction<ISelectedModelType>>;
  setCurrentModelTypeIdx: Dispatch<SetStateAction<number>>;
}

const initialContext = {
  modelType: null,
  loading: true,
  selectedModelType: {
    powerTrain: {
      id: 0,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
    operation: {
      id: 0,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
    bodyType: {
      id: 0,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
  },
  currentModelTypeIdx: 1,
  setModelType: () => {},
  setLoading: () => {},
  setSelectedModelType: () => {},
  setCurrentModelTypeIdx: () => {},
};

export const ModelTypeContext = createContext<IModelTypeContext>(initialContext);

export default function ModelTypeProvider({ children }: IModelTypeProvider) {
  const [modelType, setModelType] = useState<IModelType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModelType, setSelectedModelType] = useState<ISelectedModelType>({
    powerTrain: {
      id: 1,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
    operation: {
      id: 3,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
    bodyType: {
      id: 5,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
  });
  const [currentModelTypeIdx, setCurrentModelTypeIdx] = useState(1);

  const providerValue = {
    modelType,
    loading,
    selectedModelType,
    currentModelTypeIdx,
    setModelType,
    setLoading,
    setSelectedModelType,
    setCurrentModelTypeIdx,
  };

  return <ModelTypeContext.Provider value={providerValue}>{children}</ModelTypeContext.Provider>;
}
