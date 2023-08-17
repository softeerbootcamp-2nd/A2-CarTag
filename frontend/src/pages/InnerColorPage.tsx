import { useContext, useEffect } from 'react';
import InnerColorBannerContainer from '../containers/InnerColorPage/InnerColorBannerContainer';
import InnerColorSelectContainer from '../containers/InnerColorPage/InnerColorSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { INNER_API } from '../utils/apis';
import { IInnerColor, InnerColorContext } from '../context/InnerColorProvider';

export default function InnerColorPage() {
  const { data: innerColorData } = useFetch<IInnerColor[]>(`${INNER_API}?carid=${1}`);
  const { setData } = useContext(InnerColorContext);

  useEffect(() => {
    setData(innerColorData);
  }, [innerColorData, setData]);

  return (
    <>
      <InnerColorBannerContainer />
      <InnerColorSelectContainer />
    </>
  );
}
