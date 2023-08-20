import { ReactNode, createContext, useReducer, useState } from 'react';
import itemReducer, { actionType } from '../reducer/itemReducer';
import { OUTER_COLOR_START_IDX } from '../utils/constants';

export type defaultItemType = {
  id: number;
  name: string;
  price: number;
};
export interface detailItemType extends defaultItemType {
  title: string;
  imgSrc: string;
}
export interface IColorItemType extends detailItemType {
  carImgSrc: string;
}
export interface ISelectedItem {
  trim: defaultItemType;
  modelType: {
    powerTrain: detailItemType;
    bodyType: detailItemType;
    operation: detailItemType;
  };
  innerColor: IColorItemType;
  outerColor: IColorItemType;
  options: detailItemType[];
}

export interface IDefaultInfo {
  powerTrainId: number;
  powerTrainName: string;
  powerTrainImage: string;
  powerTrainPrice: number;
  bodyTypeId: number;
  bodyTypeName: string;
  bodyTypeImage: string;
  bodyTypePrice: number;
  operationId: number;
  operationName: string;
  operationImage: string;
  operationPrice: number;
  colorOuterId: number;
  colorOuterImage: string;
  colorCarOuterImage: string;
  colorOuterPrice: number;
  colorOuterImageName: string;
  colorInnerId: number;
  colorInnerImage: string;
  colorCarInnerImage: string;
  colorInnerPrice: number;
  colorInnerImageName: string;
}

interface IItemContext {
  selectedItem: ISelectedItem;
  totalPrice: number;
  setSelectedItem: React.Dispatch<actionType>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

interface IItemProvider {
  children: ReactNode;
}

const initialSelectedItem = {
  trim: {
    id: 1,
    name: '',
    price: 0,
  },
  modelType: {
    powerTrain: {
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
    operation: {
      id: 0,
      name: '',
      title: '',
      imgSrc: '',
      price: 0,
    },
  },
  innerColor: {
    id: 0,
    name: '',
    title: '',
    imgSrc: '',
    carImgSrc: '',
    price: 0,
  },
  outerColor: {
    id: OUTER_COLOR_START_IDX,
    name: '',
    title: '',
    imgSrc: '',
    carImgSrc: '',
    price: 0,
  },
  options: [],
};

const initialItem: IItemContext = {
  selectedItem: initialSelectedItem,
  totalPrice: 0,
  setSelectedItem: () => {},
  setTotalPrice: () => {},
};

export const ItemContext = createContext(initialItem);

export default function ItemProvider({ children }: IItemProvider) {
  const [selectedItem, setSelectedItem] = useReducer(itemReducer, initialSelectedItem);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <ItemContext.Provider
      value={{
        totalPrice,
        selectedItem,
        setTotalPrice,
        setSelectedItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
