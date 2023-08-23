import { ReactNode, createContext, useCallback, useEffect, useReducer, useState } from 'react';
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
  const [data, setData] = useState<ISharedInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const isSelectedTrim = localStorage.getItem('isSelectedTrim');
  const savedItem = localStorage.getItem('selectedItem');
  const getParams = useCallback(() => {
    if (!isSelectedTrim || !savedItem || isSelectedTrim === 'false') return;
    const params = {
      carId: JSON.parse(savedItem).trimId,
      powerTrainId: JSON.parse(savedItem).modelTypeId.powerTrain,
      bodyTypeId: JSON.parse(savedItem).modelTypeId.bodyType,
      operationId: JSON.parse(savedItem).modelTypeId.operation,
      outerColorId: JSON.parse(savedItem).outerColorId,
      innerColorId: JSON.parse(savedItem).innerColorId,
      optionIdList: JSON.parse(savedItem).optionId ? JSON.parse(savedItem).optionId : [],
    };
    return params;
  }, [isSelectedTrim, savedItem]);

  useEffect(() => {
    if (!isSelectedTrim || !savedItem || isSelectedTrim === 'false') return;
    const params = getParams();
    const fetchData = async () => {
      try {
        const res = await fetch(SHARE_INFO_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
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
  }, [getParams, isSelectedTrim, savedItem]);

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

  useEffect(() => {
    if (!data || loading || error) return;
    setSelectedItem({
      type: 'SET_TRIM',
      value: {
        id: data.carId,
        name: data.trim,
        price: data.carDefaultPrice,
      },
    });
    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: {
        id: data.powerTrainId,
        title: data.powerTrainTitle,
        name: data.powerTrainName,
        imgSrc: data.powerTrainImage,
        price: data.powerTrainPrice,
      },
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: {
        id: data.bodyTypeId,
        title: data.bodyTypeTitle,
        name: data.bodyTypeName,
        imgSrc: data.bodyTypeImage,
        price: data.bodyTypePrice,
      },
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: {
        id: data.operationId,
        title: data.operationName,
        name: data.operationImage,
        imgSrc: data.operationImage,
        price: data.operationPrice,
      },
    });

    setSelectedItem({
      type: 'SET_OUTER_COLOR',
      value: {
        id: data.colorOuterId,
        name: data.colorOuterImageName,
        title: data.colorOuterTitle,
        price: data.colorOuterPrice,
        carImgSrc: data.colorCarOuterImage,
        imgSrc: data.colorOuterImage,
      },
    });
    setSelectedItem({
      type: 'SET_INNER_COLOR',
      value: {
        id: data.colorInnerId,
        name: data.colorInnerImageName,
        title: data.colorInnerTitle,
        price: data.colorInnerPrice,
        carImgSrc: data.colorCarInnerImage,
        imgSrc: data.colorInnerImage,
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
