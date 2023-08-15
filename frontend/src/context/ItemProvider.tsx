import { ReactNode, createContext, useReducer, useState } from 'react';

type defaultItemType = {
  id: number;
  name: string;
  price: number;
};
interface detailItemType extends defaultItemType {
  title: string;
  imgSrc: string;
}
interface ISelectedItem {
  trim: defaultItemType;
  modelType: {
    powerTrain: detailItemType;
    bodyType: detailItemType;
    operation: detailItemType;
  };
  innerColor: detailItemType;
  outerColor: detailItemType;
  options: detailItemType[];
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

const initailSelectedItem = {
  trim: {
    id: 0,
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
    price: 0,
  },
  outerColor: {
    id: 0,
    name: '',
    title: '',
    imgSrc: '',
    price: 0,
  },
  options: [{ id: 0, name: '', title: '', imgSrc: '', price: 0 }],
};

const initialItem: IItemContext = {
  selectedItem: initailSelectedItem,
  totalPrice: 0,
  setSelectedItem: () => {},
  setTotalPrice: () => {},
};

type actionType =
  | { type: 'SET_TRIM'; value: defaultItemType }
  | { type: 'SET_POWER_TRAIN'; value: detailItemType }
  | { type: 'SET_OPERATION'; value: detailItemType }
  | { type: 'SET_BODY_TYPE'; value: detailItemType }
  | { type: 'SET_INNER_COLOR'; value: detailItemType }
  | { type: 'SET_OUTER_COLOR'; value: detailItemType }
  | { type: 'SET_OPTIONS'; value: detailItemType[] };

const reducer = (state: ISelectedItem, action: actionType): ISelectedItem => {
  switch (action.type) {
    case 'SET_TRIM':
      return { ...state, trim: action.value };
    case 'SET_POWER_TRAIN':
      return { ...state, modelType: { ...state.modelType, powerTrain: action.value } };
    case 'SET_OPERATION':
      return { ...state, modelType: { ...state.modelType, operation: action.value } };
    case 'SET_BODY_TYPE':
      return { ...state, modelType: { ...state.modelType, bodyType: action.value } };
    case 'SET_INNER_COLOR':
      return { ...state, innerColor: action.value };
    case 'SET_OPTIONS':
      return { ...state, options: action.value };
    case 'SET_OUTER_COLOR':
      return { ...state, outerColor: action.value };
    default:
      return state;
  }
};

export const ItemContext = createContext(initialItem);

export default function ItemProvider({ children }: IItemProvider) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useReducer(reducer, initailSelectedItem);

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
