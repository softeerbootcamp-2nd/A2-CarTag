import OuterColorSelectContainer from '../containers/OuterColorPage/OuterColorSelectContainer';
import OuterColorBannerContainer from '../containers/OuterColorPage/OuterColorBannerContainer';
import { useFetch } from '../hooks/useFetch';
import { OUTER_API } from '../utils/apis';
import { useContext, useEffect } from 'react';
import { IOuterColor, OuterColorContext } from '../context/OuterColorProvider';

export default function OuterColorPage() {
  const { data, loading } = useFetch<IOuterColor[]>(`${OUTER_API}?carId=${1}`); // Todo. selectedItem.trim.id로 바꾸기
  const { setData, setLoading } = useContext(OuterColorContext);

  useEffect(() => {
    setData(data);
    setLoading(loading);
  }, [data, loading, setData, setLoading]);

  return (
    <>
      <OuterColorBannerContainer />
      <OuterColorSelectContainer />
    </>
  );
}
