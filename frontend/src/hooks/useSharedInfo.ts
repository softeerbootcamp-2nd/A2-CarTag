import { useSearchParams } from 'react-router-dom';
import { SHARE_INFO_API } from '../utils/apis';
import { useCallback, useEffect, useState } from 'react';

export interface ISharedInfo {
  carId: number;
  trim: string;
  carDefaultPrice: number;
  powerTrainId: number;
  powerTrainTitle: string;
  powerTrainName: string;
  powerTrainImage: string;
  powerTrainPrice: number;
  bodyTypeId: number;
  bodyTypeTitle: string;
  bodyTypeName: string;
  bodyTypeImage: string;
  bodyTypePrice: number;
  operationId: number;
  operationTitle: string;
  operationName: string;
  operationImage: string;
  operationPrice: number;
  colorOuterId: number;
  colorOuterImage: string;
  colorCarOuterImage: string;
  colorOuterPrice: number;
  colorOuterImageName: string;
  colorOuterTitle: string;
  colorInnerId: number;
  colorInnerImage: string;
  colorCarInnerImage: string;
  colorInnerPrice: number;
  colorInnerImageName: string;
  colorInnerTitle: string;
  optionList: [
    {
      optionId: number;
      optionName: string;
      optionPrice: number;
      optionTitle: string;
      optionImage: string;
    },
  ];
}

export default function useSharedInfo() {
  const [data, setData] = useState<ISharedInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams] = useSearchParams();

  const trimId = searchParams.get('trimId');
  const powerTrainId = searchParams.get('powerTrainId');
  const bodyTypeId = searchParams.get('bodyTypeId');
  const operationId = searchParams.get('operationId');
  const outerColorId = searchParams.get('outerColorId');
  const innerColorId = searchParams.get('innerColorId');
  const optionIds = searchParams
    .get('optionIds')
    ?.split(',')
    .map((str) => parseInt(str));
  const isShared = Boolean(
    trimId && powerTrainId && bodyTypeId && operationId && outerColorId && innerColorId
  );

  const getParams = useCallback(() => {
    const params = {
      carId: trimId,
      powerTrainId,
      bodyTypeId,
      operationId,
      outerColorId,
      innerColorId,
      optionIdList: optionIds ? optionIds : [],
    };
    return params;
  }, [trimId, powerTrainId, bodyTypeId, operationId, outerColorId, innerColorId, optionIds]);

  useEffect(() => {
    if (!isShared) return;

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
  }, [isShared, getParams]);

  return { data, loading, error };
}
