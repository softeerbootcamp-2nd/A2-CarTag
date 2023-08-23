import { useEffect, useState } from 'react';
import { ISelectedItem } from '../context/ItemProvider';
import { QUOTE_LIST_API } from '../utils/apis';

export default function useQuoteListData<T>(selectedItem: ISelectedItem) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data !== null) {
      console.log('최초 1회 실행, 이제 실행 안할꺼야');
      return;
    }
    if (selectedItem.options.length === 0) {
      console.log('옵션없다. fetch 안보냄');
      return;
    }

    const abortController = new AbortController();

    const optionIds = selectedItem.options.map((option) => option.id);
    const params = {
      carId: 1,
      powerTrainId: selectedItem.modelType.powerTrain.id,
      bodyTypeId: selectedItem.modelType.bodyType.id,
      operationId: selectedItem.modelType.operation.id,
      outerColorId: selectedItem.outerColor.id,
      innerColorId: selectedItem.innerColor.id,
      optionIdList: optionIds,
    };
    const fetchQuoteList = async () => {
      try {
        console.log('fetch 보냄');
        const res = await fetch(QUOTE_LIST_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          signal: abortController.signal,
        });
        if (!res.ok) {
          throw new Error(`Server response was not ok: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteList();
    return () => abortController.abort();
  }, [selectedItem, data]);

  return { data, loading, error };
}
