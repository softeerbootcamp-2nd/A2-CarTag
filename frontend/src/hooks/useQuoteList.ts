import { useEffect, useState } from 'react';
import { ISelectedItem } from '../context/ItemProvider';
import { QUOTE_LIST_API } from '../utils/apis';

export default function useQuoteListData<T>(selectedItem: ISelectedItem) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedItem.options.length === 0) {
      console.log('옵션없다. fetch 안보낸다.');
      return;
    }
    const abortController = new AbortController();

    const fetchQuoteList = async () => {
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

      try {
        setLoading(true);
        console.log('fetch 요청 시작');
        const res = await fetch(QUOTE_LIST_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          signal: abortController.signal,
        });
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }

      return () => abortController.abort();
    };

    fetchQuoteList();
  }, [selectedItem]);

  return { data, loading, error };
}
