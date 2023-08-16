import { MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { flexCenterCss } from '../../utils/commonStyle';
import { useFetch } from '../../hooks/useFetch';
import { IMG_URL, OUTER_IMG_API } from '../../utils/apis';
import Loading from '../../components/loading/Loading';
import { OuterColorContext } from '../../context/OuterColorProvider';

interface IImgLoadingList {
  [key: number]: boolean;
}

export default function OuterColorBannerContainer() {
  const { data: outerColorData, seletedColorId } = useContext(OuterColorContext);
  const { data: car360ImgUrls, loading } = useFetch<string[]>(
    `${OUTER_IMG_API}?colorid=${seletedColorId}`
  );
  // Todo. useReducer or Object로 관리하기
  const [imgIdx, setImgIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [imgLoadingList, setImgLoadingList] = useState<IImgLoadingList>({});
  const imgLen = car360ImgUrls ? car360ImgUrls.length : 0;

  const initImgLoadingState = useCallback(() => {
    if (!outerColorData) return;
    const dataLen = outerColorData.length;
    const initLoadingList: IImgLoadingList = {};
    for (let i = 3; i < dataLen + 3; i++) {
      initLoadingList[i] = true;
    }
    setImgLoadingList(initLoadingList);
  }, [outerColorData, setImgLoadingList]);
  const downloadAndSaveImages = useCallback(async (car360ImgUrls: string[]) => {
    await Promise.all(
      car360ImgUrls.map(async (url, idx) => {
        const isImageExist = localStorage.getItem(url) !== null;
        if (isImageExist) return;
        const fetchUrl = `${IMG_URL}${url}`;
        const res = await fetch(fetchUrl);
        const imgBlob = await res.blob();
        const imageUrl = car360ImgUrls[idx];
        localStorage.setItem(imageUrl, URL.createObjectURL(imgBlob));
        return imgBlob;
      })
    );
  }, []);
  const cachingCar360Images = useCallback(() => {
    if (!car360ImgUrls || loading) return;
    downloadAndSaveImages(car360ImgUrls).then(() => {
      setImgLoadingList((cur) => {
        return { ...cur, [seletedColorId]: false };
      });
    });
  }, [car360ImgUrls, loading, seletedColorId, setImgLoadingList, downloadAndSaveImages]);
  const handleMousedown: MouseEventHandler<HTMLDivElement> = ({ pageX }) => {
    setIsDragging(true);
    setStartX(pageX);
    setStartIdx(imgIdx);
  };
  const handleMousemove: MouseEventHandler<HTMLDivElement> = ({ pageX, currentTarget }) => {
    if (!isDragging) return;
    const { offsetWidth } = currentTarget;
    const moveX = startX - pageX;
    const percent = moveX / offsetWidth;
    const moveIdx = Math.round(imgLen * percent);
    let resultIdx = startIdx + moveIdx;
    if (resultIdx < 0) {
      resultIdx += imgLen;
    }
    resultIdx %= imgLen;
    setImgIdx(resultIdx);
  };
  const handleMouseup: MouseEventHandler<HTMLDivElement> = ({ pageX }) => {
    setIsDragging(false);
    setStartX(pageX);
  };

  useEffect(initImgLoadingState, [initImgLoadingState]);
  useEffect(cachingCar360Images, [cachingCar360Images]);

  const car360Components = car360ImgUrls?.map((url, idx) => {
    const imgSrc = localStorage.getItem(url);
    if (!imgSrc) return;
    return <CarImg key={idx} src={imgSrc} $visible={imgIdx === idx} />;
  });

  return (
    <>
      <OuterColorBanner onMouseUp={handleMouseup} subtitle={'외장색상'} title={'어비스블랙펄'}>
        <FlexCenterWrapper>
          <ImgWrapper onMouseMove={handleMousemove} onMouseDown={handleMousedown}>
            <CarShadow>
              <DegreeCaption>360°</DegreeCaption>
            </CarShadow>
            {imgLoadingList[seletedColorId] ? <Loading /> : car360Components}
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
