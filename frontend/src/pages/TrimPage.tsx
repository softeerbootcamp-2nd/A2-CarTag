import { useContext, useEffect } from 'react';
import TrimBannerContainer from '../containers/TrimPage/TrimBannerContainer';
import TrimSelectContainer from '../containers/TrimPage/TrimSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { TRIM_API } from '../utils/apis';
import { ICartype, TrimContext } from '../context/TrimProvider';

export default function TrimPage() {
  const { data, loading } = useFetch<ICartype[]>(`${TRIM_API}?cartype=${1}`);
  const { setData, setLoading } = useContext(TrimContext);

  useEffect(() => {
    setData(data);
    setLoading(loading);
  }, [data, loading, setData, setLoading]);

  return (
    <>
      <TrimBannerContainer />
      <TrimSelectContainer />
    </>
  );
}
