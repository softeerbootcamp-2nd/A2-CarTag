import { useCallback, useEffect, useState } from 'react';
import { IDefaultInfo } from '../context/ItemProvider';
import { DEFAULT_INFO_API } from '../utils/apis';
import { useFetch } from './useFetch';

interface IDefaultState {
  powerTrain: {
    id: number;
    title: '파워트레인';
    name: string;
    imgSrc: string;
    price: number;
  };
  bodyType: {
    id: number;
    title: '바디타입';
    name: string;
    imgSrc: string;
    price: number;
  };
  operation: {
    id: number;
    title: '구동방식';
    name: string;
    imgSrc: string;
    price: number;
  };
  outerColor: {
    id: number;
    name: string;
    title: '외장색상';
    imgSrc: string;
    carImgSrc: string;
    price: number;
  };
  innerColor: {
    id: number;
    name: string;
    title: '내장색상';
    imgSrc: string;
    carImgSrc: string;
    price: number;
  };
}

export default function useDefaultInfo(carType: number) {
  const {
    data: defaultInfoData,
    loading: defaultInfoLoading,
    error: defaultInfoError,
  } = useFetch<IDefaultInfo>(`${DEFAULT_INFO_API}?carid=${carType}`);
  const [defaultInfo, setDefaultInfo] = useState<IDefaultState>();

  const initDefaultInfo = useCallback(() => {
    if (!defaultInfoData || defaultInfoLoading) return;
    setDefaultInfo({
      powerTrain: {
        id: defaultInfoData.powerTrainId,
        title: '파워트레인',
        name: defaultInfoData.powerTrainName,
        imgSrc: defaultInfoData.powerTrainImage,
        price: defaultInfoData.powerTrainPrice,
      },
      bodyType: {
        id: defaultInfoData.bodyTypeId,
        title: '바디타입',
        name: defaultInfoData.bodyTypeName,
        imgSrc: defaultInfoData.bodyTypeImage,
        price: defaultInfoData.bodyTypePrice,
      },
      operation: {
        id: defaultInfoData.operationId,
        title: '구동방식',
        name: defaultInfoData.operationName,
        imgSrc: defaultInfoData.operationImage,
        price: defaultInfoData.operationPrice,
      },
      outerColor: {
        id: defaultInfoData.colorOuterId,
        title: '외장색상',
        name: defaultInfoData.colorOuterImageName,
        carImgSrc: defaultInfoData.colorCarOuterImage,
        imgSrc: defaultInfoData.colorOuterImage,
        price: defaultInfoData.colorOuterPrice,
      },
      innerColor: {
        id: defaultInfoData.colorInnerId,
        title: '내장색상',
        name: defaultInfoData.colorInnerImageName,
        carImgSrc: defaultInfoData.colorCarInnerImage,
        imgSrc: defaultInfoData.colorInnerImage,
        price: defaultInfoData.colorInnerPrice,
      },
    });
  }, [defaultInfoData, defaultInfoLoading]);

  useEffect(initDefaultInfo, [initDefaultInfo]);

  return { defaultInfo, setDefaultInfo, defaultInfoError };
}
