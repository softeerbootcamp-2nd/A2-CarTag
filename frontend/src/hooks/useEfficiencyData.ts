import { useState, useEffect } from 'react';
import { MODEL_TYPE_API } from '../utils/apis';
import { IEfficiencyType } from '../context/ItemProvider';

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface IUseEfficiencyData {
  powerTrainId?: number;
  operationId?: number;
}

export function useEfficiencyData({
  powerTrainId,
  operationId,
}: IUseEfficiencyData): FetchResponse<IEfficiencyType> {
  const [data, setData] = useState<IEfficiencyType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!operationId || !powerTrainId) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${MODEL_TYPE_API}/hmg-efficiency?powertrain=${powerTrainId}&operation=${operationId}`
        );
        if (!response.ok) {
          throw new Error(`Server response was not ok: ${response.status}`);
        }
        const responseData: IEfficiencyType = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [powerTrainId, operationId]);

  return { data, loading, error };
}
