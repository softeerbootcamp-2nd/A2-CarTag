import { useContext, useEffect } from 'react';
import OuterColorSelectContainer from '../containers/OuterColorPage/OuterColorSelectContainer';
import OuterColorBannerContainer from '../containers/OuterColorPage/OuterColorBannerContainer';
import { IOuterColor, OuterColorContext } from '../context/OuterColorProvider';
import { useFetch } from '../hooks/useFetch';
import { OUTER_COLOR_API, OUTER_IMG_API } from '../utils/apis';

export default function OuterColorPage() {
  const { seletedColorId, setOuterColorData, setCar360UrlsData } = useContext(OuterColorContext);
  const { data: outerColorData } = useFetch<IOuterColor[]>(`${OUTER_COLOR_API}?carid=${1}`); // Todo. selectedItem.trim.id로 바꾸기
  const { data: car360ImgUrls } = useFetch<string[]>(`${OUTER_IMG_API}?colorid=${seletedColorId}`);

  useEffect(() => {
    setOuterColorData(outerColorData);
  }, [outerColorData, setOuterColorData]);
  useEffect(() => {
    setCar360UrlsData(car360ImgUrls);
  }, [car360ImgUrls, setCar360UrlsData]);

  return (
    <>
      <OuterColorBannerContainer />
      <OuterColorSelectContainer />
    </>
  );
}
