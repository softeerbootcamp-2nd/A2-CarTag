import { useContext, useEffect } from 'react';
import InnerColorBannerContainer from '../containers/InnerColorPage/InnerColorBannerContainer';
import InnerColorSelectContainer from '../containers/InnerColorPage/InnerColorSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { INNER_COLOR_API } from '../utils/apis';
import { IInnerColor, InnerColorContext } from '../context/InnerColorProvider';
import ErrorModal from '../components/modal/ErrorModal';

export default function InnerColorPage() {
  const { data: innerColorData, error } = useFetch<IInnerColor[]>(`${INNER_COLOR_API}?carid=${1}`);
  const { setData } = useContext(InnerColorContext);

  useEffect(() => {
    setData(innerColorData);
  }, [innerColorData, setData]);

  if (error) {
    return <ErrorModal message={error.message} />;
  }

  return (
    <>
      <InnerColorBannerContainer />
      <InnerColorSelectContainer />
    </>
  );
}
