import { useContext, useEffect } from 'react';
import OuterColorSelectContainer from '../containers/OuterColorPage/OuterColorSelectContainer';
import OuterColorBannerContainer from '../containers/OuterColorPage/OuterColorBannerContainer';
import { IOuterColor, OuterColorContext } from '../context/OuterColorProvider';
import { useFetch } from '../hooks/useFetch';
import { OUTER_COLOR_API, OUTER_IMG_API } from '../utils/apis';
import ErrorModal from '../components/modal/ErrorModal';

export default function OuterColorPage() {
  const { seletedColorId, setOuterColorData, setCar360UrlsData } = useContext(OuterColorContext);
  const { data: outerColorData, error: outerColorError } = useFetch<IOuterColor[]>(
    `${OUTER_COLOR_API}?carid=${1}`
  ); // Todo. selectedItem.trim.id로 바꾸기
  const { data: car360ImgUrls, error: car360ImgError } = useFetch<string[]>(
    `${OUTER_IMG_API}?colorid=${seletedColorId}`
  );

  useEffect(() => {
    setOuterColorData(outerColorData);
  }, [outerColorData, setOuterColorData]);
  useEffect(() => {
    setCar360UrlsData(car360ImgUrls);
  }, [car360ImgUrls, setCar360UrlsData]);

  if (outerColorError) {
    return <ErrorModal message={outerColorError.message} />;
  } else if (car360ImgError) {
    return <ErrorModal message={car360ImgError.message} />;
  }
  return (
    <>
      <OuterColorBannerContainer />
      <OuterColorSelectContainer />
    </>
  );
}
