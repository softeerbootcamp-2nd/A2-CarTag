import { useEffect, useState } from 'react';
import { HISTORIES_API } from '../utils/apis';
import { ISimilarQuoteIdList } from '../context/ModalProviders/SimilarQuoteModalProvider';

export interface ISimilarQuoteOption {
  optionId: number;
  optionName: string;
  optionPrice: number;
  optionTitle: string;
  optionImage: string;
}

export default function useSimilarDetail(params: ISimilarQuoteIdList | null) {
  const [data, setData] = useState<ISimilarQuoteOption[][] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (params === null) {
      return;
    }

    const abortController = new AbortController();
    const fetchData = async (abortController: AbortController) => {
      try {
        const res = await fetch(HISTORIES_API, {
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
        const jsonData = await res.json();
        setData(jsonData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(abortController);

    return () => abortController.abort();
  }, [params]);

  return { data, loading, error };
}
