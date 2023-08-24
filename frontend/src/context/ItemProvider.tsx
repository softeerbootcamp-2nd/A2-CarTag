import { ReactNode, createContext, useEffect, useReducer, useState } from 'react';
import itemReducer, { actionType } from '../reducer/itemReducer';
import { OUTER_COLOR_FIRST_IDX } from '../utils/constants';
import { SHARE_INFO_API } from '../utils/apis';
import { ISharedInfo } from '../hooks/useSharedInfo';

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
  cartype: defaultItemType;
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
  cartype: {
    id: 1,
    name: '팰리세이드',
    price: 0,
  },
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
  const [data, setData] = useState<ISharedInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const isSelectedTrim = localStorage.getItem('isSelectedTrim');
    const params = localStorage.getItem('params');
    if (!isSelectedTrim || !params || isSelectedTrim === 'false') return;
    const fetchData = async () => {
      try {
        const res = await fetch(SHARE_INFO_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: params,
        });
        const jsonData = await res.json();
        setData(jsonData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    const powerTrainId = powerTrain.id;
    const bodyTypeId = bodyType.id;
    const operationId = operation.id;
    const optionIds = selectedItem.options.map((option) => option.id);
    const savedId = {
      carId: trimId,
      powerTrainId,
      bodyTypeId,
      operationId,
      outerColorId: outerColorId,
      innerColorId: innerColorId,
      optionIdList: optionIds ? optionIds : [],
    };
    localStorage.setItem('params', JSON.stringify(savedId));
  }, [selectedItem]);

  useEffect(() => {
    if (!data || loading || error) return;
    setSelectedItem({
      type: 'SET_TRIM',
      value: {
        id: data.trimData.carId,
        name: data.trimData.trim,
        price: data.trimData.carDefaultPrice,
      },
    });
    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: {
        id: data.powertrainData.modelId,
        title: data.powertrainData.modelTypeName,
        name: data.powertrainData.modelName,
        imgSrc: data.powertrainData.modelImage,
        price: data.powertrainData.modelPrice,
      },
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: {
        id: data.bodyTypeData.modelId,
        title: data.bodyTypeData.modelTypeName,
        name: data.bodyTypeData.modelName,
        imgSrc: data.bodyTypeData.modelImage,
        price: data.bodyTypeData.modelPrice,
      },
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: {
        id: data.operationData.modelId,
        title: data.operationData.modelTypeName,
        name: data.operationData.modelName,
        imgSrc: data.operationData.modelImage,
        price: data.operationData.modelPrice,
      },
    });

    setSelectedItem({
      type: 'SET_OUTER_COLOR',
      value: {
        id: data.outerColor.colorId,
        name: data.outerColor.colorName,
        title: data.outerColor.colorType,
        price: data.outerColor.colorPrice,
        carImgSrc: data.outerColor.colorCarImage,
        imgSrc: data.outerColor.colorImage,
      },
    });
    setSelectedItem({
      type: 'SET_INNER_COLOR',
      value: {
        id: data.innerColor.colorId,
        name: data.innerColor.colorName,
        title: data.innerColor.colorType,
        price: data.innerColor.colorPrice,
        carImgSrc: data.innerColor.colorCarImage,
        imgSrc: data.innerColor.colorImage,
      },
    });

    const options = data.optionList
      ? data.optionList.map((option) => ({
          id: option.optionId,
          name: option.optionName,
          title: option.optionTitle,
          price: option.optionPrice,
          imgSrc: option.optionImage,
        }))
      : [];

    setSelectedItem({
      type: 'SET_OPTIONS',
      value: options,
    });
  }, [data, error, loading]);

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
