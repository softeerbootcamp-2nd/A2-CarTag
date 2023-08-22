import { useContext, useEffect } from 'react';
import OuterColorSelectContainer from '../containers/OuterColorPage/OuterColorSelectContainer';
import OuterColorBannerContainer from '../containers/OuterColorPage/OuterColorBannerContainer';
import { IOuterColor, OuterColorContext } from '../context/PageProviders/OuterColorProvider';
import { useFetch } from '../hooks/useFetch';
import { OUTER_COLOR_API, OUTER_IMG_API } from '../utils/apis';
import ErrorModal from '../components/modal/ErrorModal';
import { ItemContext } from '../context/ItemProvider';
import OuterColorFooterContainer from '../containers/OuterColorPage/OuterColorFooterContainer';
import { styled } from 'styled-components';

export default function OuterColorPage() {
  const { selectedItem } = useContext(ItemContext);
  const { setOuterColorData, setCar360UrlsData, setLoading } = useContext(OuterColorContext);
  const {
    data: outerColorData,
    loading: outerColorDataLoading,
    error: outerColorError,
  } = useFetch<IOuterColor[]>(`${OUTER_COLOR_API}?carid=${1}`); // Todo. selectedItem.trim.id로 바꾸기
  const {
    data: car360ImgUrls,
    loading: car360ImgLoading,
    error: car360ImgError,
  } = useFetch<string[]>(`${OUTER_IMG_API}?colorid=${selectedItem.outerColor.id}`);

  useEffect(() => {
    setOuterColorData(outerColorData);
  }, [outerColorData, setOuterColorData]);
  useEffect(() => {
    setCar360UrlsData(car360ImgUrls);
  }, [car360ImgUrls, setCar360UrlsData]);
  useEffect(() => {
    if (outerColorDataLoading || outerColorDataLoading) return;
    setLoading(false);
  }, [car360ImgLoading, outerColorDataLoading, setLoading]);

  if (outerColorError) {
    return <ErrorModal message={outerColorError.message} />;
  } else if (car360ImgError) {
    return <ErrorModal message={car360ImgError.message} />;
  }
  return (
    <>
      <Wrapper>
        <OuterColorBannerContainer />
        <OuterColorSelectContainer />
      </Wrapper>
      <OuterColorFooterContainer />
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-bottom: 120px;
`;
