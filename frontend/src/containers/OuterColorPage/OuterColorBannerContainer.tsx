import { MouseEventHandler, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import { flexCenterCss } from '../../utils/commonStyle';
import { IMG_URL } from '../../utils/apis';
import Loading from '../../components/loading/Loading';
import { OuterColorContext } from '../../context/OuterColorProvider';
import car360Reducer from '../../reducer/car360Reducer';
import { ItemContext } from '../../context/ItemProvider';

export default function OuterColorBannerContainer() {
  const { selectedItem } = useContext(ItemContext);

  const { car360UrlsData, loading } = useContext(OuterColorContext);
  const [imgState, setImgState] = useReducer(car360Reducer, {
    visibleIdx: 0,
    isDragging: false,
    startX: 0,
    startIdx: 0,
    imgLoading: true,
  });
  const imgLen = car360UrlsData ? car360UrlsData.length : 0;
  const [imgBlobUrl, setImgBlobUrl] = useState<{ [key: string]: string }>({});

  const handleMousedown: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ pageX }) => {
      setImgState({ type: 'SET_IS_DRAGGING', value: true });
      setImgState({ type: 'SET_START_X', value: pageX });
      setImgState({ type: 'SET_START_IDX', value: imgState.visibleIdx });
    },
    [imgState]
  );
  const handleMousemove: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ pageX, currentTarget }) => {
      if (!imgState.isDragging) return;
      const { offsetWidth } = currentTarget;
      const moveX = imgState.startX - pageX;
      const percent = moveX / offsetWidth;
      const moveIdx = Math.round(imgLen * percent);
      let resultIdx = imgState.startIdx + moveIdx;
      if (resultIdx < 0) {
        resultIdx += imgLen;
      }
      resultIdx %= imgLen;
      setImgState({ type: 'SET_VISIBLE_IDX', value: resultIdx });
    },
    [setImgState, imgState, imgLen]
  );
  const handleMouseup: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ pageX }) => {
      setImgState({ type: 'SET_IS_DRAGGING', value: false });
      setImgState({ type: 'SET_START_X', value: pageX });
    },
    [setImgState]
  );
  const isLoaded = useCallback(
    (urls: string[]) => {
      for (const url of urls) {
        if (!imgBlobUrl[url]) {
          return false;
        }
      }
      return true;
    },
    [imgBlobUrl]
  );

  const downloadAndSaveImages = useCallback(
    async (car360UrlsData: string[], abortController: AbortController) => {
      if (isLoaded(car360UrlsData)) {
        setImgState({ type: 'SET_IMG_LOADING', value: false });
        return;
      }
      setImgState({ type: 'SET_IMG_LOADING', value: true });
      const newImgBlobUrl: { [key: string]: string } = {};
      await Promise.all(
        car360UrlsData.map(async (url, idx) => {
          const fetchImgUrl = IMG_URL + url + `?${selectedItem.outerColor.name}`;

          const res = await fetch(fetchImgUrl, {
            signal: abortController.signal,
          });
          const imgBlob = await res.blob();
          const key = car360UrlsData[idx];
          newImgBlobUrl[key] = URL.createObjectURL(imgBlob);
          return imgBlob;
        })
      );

      setImgBlobUrl((cur) => {
        return { ...cur, ...newImgBlobUrl };
      });
      setImgState({ type: 'SET_IMG_LOADING', value: false });
    },
    [selectedItem, isLoaded]
  );

  const displayCar360Components = useCallback(() => {
    return car360UrlsData?.map((url, idx) => {
      const imgSrc = imgBlobUrl[url];
      return <CarImg key={idx} src={imgSrc} $visible={imgState.visibleIdx === idx} />;
    });
  }, [car360UrlsData, imgBlobUrl, imgState]);

  useEffect(() => {
    if (!car360UrlsData || loading) return;
    const abortController = new AbortController();
    downloadAndSaveImages(car360UrlsData, abortController);
    return () => {
      abortController.abort();
    };
  }, [downloadAndSaveImages, car360UrlsData, loading]);

  return (
    <>
      <OuterColorBanner
        onMouseUp={handleMouseup}
        subtitle={'외장색상'}
        title={selectedItem.outerColor.name}
      >
        <FlexCenterWrapper>
          <ImgWrapper onMouseMove={handleMousemove} onMouseDown={handleMousedown}>
            <CarShadow>
              <DegreeCaption>360°</DegreeCaption>
            </CarShadow>
            {imgState.imgLoading ? <Loading /> : displayCar360Components()}
          </ImgWrapper>
        </FlexCenterWrapper>
      </OuterColorBanner>
    </>
  );
}

const OuterColorBanner = styled(Banner)`
  background: ${({ theme }) => theme.color.blueBg};
`;
const CarImg = styled.img<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  position: absolute;
  right: 0;
  width: 592px;
  height: auto;
  -webkit-user-drag: none;
  z-index: 2;
`;
const ImgWrapper = styled.div`
  width: 611px;
  cursor: pointer;
  position: relative;
  height: 325px;
  bottom: 0;
`;
const FlexCenterWrapper = styled(CenterWrapper)`
  ${flexCenterCss}
  align-items: flex-end;
  height: 100%;
`;
const CarShadow = styled.div`
  ${flexCenterCss}
  position: absolute;
  bottom: 34px;
  border: 2px solid transparent;
  border-radius: 50%;
  width: 611px;
  height: 99px;
  background-image: linear-gradient(
      ${({ theme }) => theme.color.blueBg},
      ${({ theme }) => theme.color.blueBg}
    ),
    linear-gradient(to top, #6d7786, #6d778600);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const DegreeCaption = styled.span`
  position: absolute;
  bottom: -10px;
  z-index: 10;
  width: 61px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.blueBg};
`;
