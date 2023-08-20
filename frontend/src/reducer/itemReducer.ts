import {
  IColorItemType,
  ISelectedItem,
  defaultItemType,
  detailItemType,
} from '../context/ItemProvider';

export type actionType =
  | { type: 'SET_TRIM'; value: defaultItemType }
  | { type: 'SET_POWER_TRAIN'; value: detailItemType }
  | { type: 'SET_OPERATION'; value: detailItemType }
  | { type: 'SET_BODY_TYPE'; value: detailItemType }
  | { type: 'SET_INNER_COLOR'; value: IColorItemType }
  | { type: 'SET_OUTER_COLOR'; value: IColorItemType }
  | { type: 'SET_OPTIONS'; value: detailItemType[] };

export default function itemReducer(state: ISelectedItem, action: actionType): ISelectedItem {
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
}
