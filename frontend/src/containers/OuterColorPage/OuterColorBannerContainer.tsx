import { MouseEventHandler, useCallback, useContext, useEffect, useReducer } from 'react';
import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { flexCenterCss } from '../../utils/commonStyle';
import { useFetch } from '../../hooks/useFetch';
import { IMG_URL, OUTER_IMG_API } from '../../utils/apis';
import Loading from '../../components/loading/Loading';
import { OuterColorContext } from '../../context/OuterColorProvider';
import car360Reducer from '../../reducer/car360Reducer';

export default function OuterColorBannerContainer() {
  const { seletedColorId } = useContext(OuterColorContext);
  const { data: car360ImgUrls, loading } = useFetch<string[]>(
    `${OUTER_IMG_API}?colorid=${seletedColorId}`
  );
  const [imgState, setImgState] = useReducer(car360Reducer, {
    visibleIdx: 0,
    isDragging: false,
    startX: 0,
    startIdx: 0,
    imgLoading: true,
  });
  const imgLen = car360ImgUrls ? car360ImgUrls.length : 0;

  const handleMousedown: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ pageX }) => {
      setImgState({ type: 'SET_IS_DRAGGING', value: true });
      setImgState({ type: 'SET_START_X', value: pageX });
      setImgState({ type: 'SET_START_IDX', value: imgState.visibleIdx });
      console.log(imgState.visibleIdx);
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

  const isLoaded = useCallback((urls: string[]) => {
    for (const url of urls) {
      if (!localStorage.getItem(url)) {
        return false;
      }
    }
    return true;
  }, []);

  const downloadAndSaveImages = useCallback(
    async (car360ImgUrls: string[], abortController: AbortController) => {
      if (isLoaded(car360ImgUrls)) {
        setImgState({ type: 'SET_IMG_LOADING', value: false });
        return;
      }
      setImgState({ type: 'SET_IMG_LOADING', value: true });

      await Promise.all(
        car360ImgUrls.map(async (url, idx) => {
          const isImageExist = localStorage.getItem(url) !== null;
          if (isImageExist) return;
          const res = await fetch(IMG_URL + url, {
            signal: abortController.signal,
          });
          const imgBlob = await res.blob();
          const localStorageKey = car360ImgUrls[idx];
          localStorage.setItem(localStorageKey, URL.createObjectURL(imgBlob));
          return imgBlob;
        })
      );
      setImgState({ type: 'SET_IMG_LOADING', value: false });
    },
    [isLoaded]
  );

  useEffect(() => {
    if (!car360ImgUrls || loading) return;
    const abortController = new AbortController();
    downloadAndSaveImages(car360ImgUrls, abortController);
    return () => {
      abortController.abort();
    };
  }, [downloadAndSaveImages, loading, car360ImgUrls]);

  const car360Components = car360ImgUrls?.map((url, idx) => {
    const imgSrc = localStorage.getItem(url);
    if (!imgSrc) return;
    return <CarImg key={idx} src={imgSrc} $visible={imgState.visibleIdx === idx} />;
  });

  return (
    <>
      <OuterColorBanner onMouseUp={handleMouseup} subtitle={'외장색상'} title={'어비스블랙펄'}>
        <FlexCenterWrapper>
          <ImgWrapper onMouseMove={handleMousemove} onMouseDown={handleMousedown}>
            <CarShadow>
              <DegreeCaption>360°</DegreeCaption>
            </CarShadow>
            {imgState.imgLoading ? <Loading /> : car360Components}
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
