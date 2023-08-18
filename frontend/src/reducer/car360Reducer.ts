interface ICar360State {
  visibleIdx: number;
  isDragging: boolean;
  startX: number;
  startIdx: number;
  imgLoading: boolean;
}

type actionType =
  | { type: 'SET_VISIBLE_IDX'; value: number }
  | { type: 'SET_IS_DRAGGING'; value: boolean }
  | { type: 'SET_START_X'; value: number }
  | { type: 'SET_START_IDX'; value: number }
  | { type: 'SET_IMG_LOADING'; value: boolean };

export default function car360Reducer(state: ICar360State, action: actionType): ICar360State {
  switch (action.type) {
    case 'SET_IS_DRAGGING':
      return { ...state, isDragging: action.value };
    case 'SET_START_IDX':
      return { ...state, startIdx: action.value };
    case 'SET_START_X':
      return { ...state, startX: action.value };
    case 'SET_VISIBLE_IDX':
      return { ...state, visibleIdx: action.value };
    case 'SET_IMG_LOADING':
      return { ...state, imgLoading: action.value };
    default:
      return state;
  }
}
