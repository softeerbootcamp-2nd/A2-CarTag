import { useSearchParams } from 'react-router-dom';
import { SHARE_INFO_API } from '../utils/apis';
import { useCallback, useEffect, useState } from 'react';

interface IModelTypeInfo {
  modelId: number;
  modelName: string;
  modelPrice: number;
  modelImage: string;
  modelTypeName: string;
}

interface IColorInfo {
  colorId: number;
  colorName: string;
  colorImage: string;
  colorType: string;
  colorPrice: number;
  colorBoughtCount: number | null;
  colorCarImage: string;
}
export interface ISharedInfo {
  trimData: {
    carId: number;
    trim: string;
    carDefaultPrice: number;
  };
  powertrainData: IModelTypeInfo;
  operationData: IModelTypeInfo;
  bodyTypeData: IModelTypeInfo;
  outerColor: IColorInfo;
  innerColor: IColorInfo;
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
  const [isShared, setIsShared] = useState(false);
  const [searchParams] = useSearchParams();

  const getParams = useCallback(() => {
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

    if (!isShared) return null;
    setIsShared(true);

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
  }, [searchParams]);

  useEffect(() => {
    const params = getParams();
    if (!params) return;

    const fetchData = async () => {
      try {
        const res = await fetch(SHARE_INFO_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
        if (!res.ok) {
          throw new Error(`Server response was not ok: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getParams]);

  return { data, loading, error, isShared };
}
