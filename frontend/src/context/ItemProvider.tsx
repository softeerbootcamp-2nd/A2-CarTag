import { ReactNode, createContext, useEffect, useReducer, useState } from 'react';
import itemReducer, { actionType } from '../reducer/itemReducer';
import { OUTER_COLOR_FIRST_IDX } from '../utils/constants';

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
export interface IEfficiencyType {
  averageFuel: string;
  displacement: string;
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
  efficiency: IEfficiencyType;
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
    id: 1,
    name: '',
    title: '',
    imgSrc: '',
    carImgSrc: '',
    price: 0,
  },
  outerColor: {
    id: OUTER_COLOR_FIRST_IDX,
    name: '',
    title: '',
    imgSrc: '',
    carImgSrc: '',
    price: 0,
  },
  options: [],
  efficiency: {
    averageFuel: '',
    displacement: '',
  },
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

  useEffect(() => {
    const { id: trimId, price: trimPrice } = selectedItem.trim;
    const { id: outerColorId, price: outerColorPrice } = selectedItem.outerColor;
    const { id: innerColorId, price: innerColorPrice } = selectedItem.innerColor;
    const { powerTrain, bodyType, operation } = selectedItem.modelType;
    const modelTypePrice = powerTrain.price + bodyType.price + operation.price;
    const optionsPrice = selectedItem.options.reduce((acc, option) => acc + option.price, 0);
    const total = trimPrice + modelTypePrice + outerColorPrice + innerColorPrice + optionsPrice;
    setTotalPrice(total);
    const savedId = {
      trimId: trimId,
      modelTypeId: {
        powerTrain: powerTrain.id,
        bodyType: bodyType.id,
        operation: operation.id,
      },
      outerColorId: outerColorId,
      innerColorId: innerColorId,
      optionId: selectedItem.options.map((option) => option.id),
    };
    localStorage.setItem('selectedItem', JSON.stringify(savedId));
  }, [selectedItem]);

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
