export const MAX_PAGE = 3;
export const NUM_IN_A_PAGE = 4;
export const MAX_TEXT_CNT = 98;

export const PATH = {
  home: '/',
  trim: '/trim',
  modelType: '/model-type',
  outerColor: '/outer-color',
  innerColor: '/inner-color',
  option: '/option',
  result: '/result',
};

export const MESSAGE = {
  trimSelectRequired: '트림을 선택해 주세요.',
};

export const modelTypeToEn: { [key: string]: string } = {
  파워트레인: 'powertrain',
  바디타입: 'bodytype',
  구동방식: 'operation',
};

export const HYUNDAI_URL = 'https://www.hyundai.com/kr/ko/e';
export const PAGE_ANIMATION_DURATION = 500;
export const CAR_TYPE = 1; // 팰리세이드

Object.freeze({
  MAX_PAGE,
  CAR_TYPE,
  NUM_IN_A_PAGE,
  MAX_TEXT_CNT,
  HYUNDAI_URL,
  PATH,
  MESSAGE,
  PAGE_ANIMATION_DURATION,
});
