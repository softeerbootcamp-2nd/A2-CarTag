import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import { BodyKrMedium3, BodyKrRegular5, HeadingKrRegular2 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import { IMG_URL } from '../../utils/apis';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import Banner from '../../components/common/banner/Banner';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import { ICartype, TrimContext } from '../../context/PageProviders/TrimProvider';
import Loading from '../../components/loading/Loading';
import { ItemContext } from '../../context/ItemProvider';

export default function TrimBannerContainer() {
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const { data: trimData, loading, selectedImgIdx, setSelectedImgIdx } = useContext(TrimContext);
  const selectedData =
    trimData && (trimData.find((item) => item.carId === selectedItem.trim.id) || trimData[0]);
  const imageUrls = useRef<string[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [imgBlobUrls, setImgBlobUrls] = useState<{ [key: string]: string }>({});
  const handleSelectImg = useCallback(
    (idx: number) => {
      setSelectedImgIdx(idx);
    },
    [setSelectedImgIdx]
  );

  const getFilteredImageUrls = (trimData: ICartype[]) => {
    const filteredUrl: string[] = [];
    trimData.forEach((data) => {
      const innerImgUrl = data.innerImage !== '' && `${IMG_URL}${data.innerImage}`;
      const outerImgUrl = data.outerImage !== '' && `${IMG_URL}${data.outerImage}`;
      const wheelImgUrl = data.wheelImage !== '' && `${IMG_URL}${data.wheelImage}`;
      const filteredImagesUrl = [innerImgUrl, outerImgUrl, wheelImgUrl].filter(
        (url) => url
      ) as string[];
      filteredUrl.push(...filteredImagesUrl);
    });

    return Array.from(new Set(filteredUrl));
  };

  const downloadAndSaveImages = useCallback(
    async (filterdUrls: string[]) => {
      const imageBlobs = await Promise.all(
        filterdUrls.map(async (url, idx) => {
          const response = await fetch(url + `?${idx}`);
          const blob = await response.blob();
          return blob;
        })
      );
      const _imgBlobUrls: { [key: string]: string } = {};
      imageBlobs.map((imageBlob, index) => {
        const bloburl = URL.createObjectURL(imageBlob);
        _imgBlobUrls[filterdUrls[index]] = bloburl;
      });

      setImgBlobUrls(_imgBlobUrls);
      setImagesLoading(false);
    },
    [setImagesLoading]
  );

  useEffect(() => {
    if (!selectedData) return;
    setSelectedItem({
      type: 'SET_TRIM',
      value: {
        id: selectedData.carId,
        name: selectedData.trim,
        price: selectedData.carDefaultPrice,
      },
    });
  }, [trimData, selectedData, setSelectedItem]);

  const setImages = useCallback(() => {
    if (!trimData) return;
    setImagesLoading(true);
    setSelectedImgIdx(0);
    imageUrls.current = [];
    const filterdUrls = getFilteredImageUrls(trimData);
    downloadAndSaveImages(filterdUrls);
  }, [trimData, setSelectedImgIdx, downloadAndSaveImages]);

  const displayImages = useCallback(() => {
    if (!selectedData || imagesLoading) return;

    const outerUrl = selectedData.outerImage && `${IMG_URL}${selectedData.outerImage}`;
    const innerUrl = selectedData.innerImage && `${IMG_URL}${selectedData.innerImage}`;
    const wheelUrl = selectedData.wheelImage && `${IMG_URL}${selectedData.wheelImage}`;
    const imageUrls = [outerUrl, innerUrl, wheelUrl].filter((url) => url);
    const imageComponents = imageUrls.map((url, idx) => {
      const imgSrc = imgBlobUrls[url];
      return (
        <ImgWrapper key={idx} $selected={selectedImgIdx === idx}>
          <Img src={imgSrc} loading="lazy" alt="트림 이미지" onClick={() => handleSelectImg(idx)} />
        </ImgWrapper>
      );
    });
    return imageComponents;
  }, [imagesLoading, selectedImgIdx, selectedData, handleSelectImg, imgBlobUrls]);
  useEffect(setImages, [setImages]);

  const displayData = selectedData?.options.map((option, idx) => (
    <Data key={idx}>
      <DataTitle>{option.optionName}</DataTitle>
      <DataInfo>
        {option.optionUsedCount}회<DataCaption>15,000km 당</DataCaption>
      </DataInfo>
    </Data>
  ));

  return (
    <>
      {selectedData && !loading ? (
        <Banner subtitle={selectedData.carDescription} title={selectedData.trim}>
          <Container>
            <HmgDataWrapper>
              {displayData?.length !== 0 && (
                <HmgDataSection>
                  <HmgTag size="small" />
                  <HmgTagDescription>
                    해당 트림 포함된 옵션들의
                    <BlueText> 실활용 데이터</BlueText>예요.
                  </HmgTagDescription>
                  <DataList>{displayData}</DataList>
                </HmgDataSection>
              )}
            </HmgDataWrapper>
            <ImgSection>{imagesLoading ? <Loading /> : displayImages()}</ImgSection>
          </Container>
        </Banner>
      ) : null}
    </>
  );
}

const Container = styled(CenterWrapper)`
  display: flex;
  justify-content: space-between;
  height: 360px;
`;
const HmgDataWrapper = styled.div`
  z-index: 100000;
  width: 316px;
  height: 175px;
  margin-top: 166px;
  margin-left: -16px;
  pointer-events: none;
`;

const HmgDataSection = styled.div`
  margin: 0 16px;
`;

const HmgTagDescription = styled.div`
  ${BodyKrMedium3}
  margin-top: 12px;
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue};
`;
const DataList = styled.ul`
  display: flex;
  gap: 52px;
  margin-top: 16px;
`;
const Data = styled.li`
  display: flex;
  flex-direction: column;
  width: 60px;
`;
const DataTitle = styled.div`
  ${BodyKrRegular5}
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
  word-break: keep-all;
  color: ${({ theme }) => theme.color.gray900};
`;
const DataInfo = styled.div`
  margin-top: 6px;
  ${HeadingKrRegular2}
`;
const DataCaption = styled.div`
  ${BodyKrRegular5}
  color: ${({ theme }) => theme.color.gray600};
`;

const ImgSection = styled.div`
  display: flex;
  width: 677px;
  gap: 16px;
  justify-content: flex-end;
`;
const ImgWrapper = styled.div<{ $selected?: boolean }>`
  ${({ $selected }) => {
    if ($selected)
      return css`
        width: 504px;
        height: 100%;
      `;
    else {
      return css`
        width: 71px;
        height: 100%;
        &:hover {
          filter: brightness(0.6);
        }
        &:hover::after {
          content: 'click!';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: ${({ theme }) => theme.color.white};
          pointer-events: none;
        }
      `;
    }
  }}

  ${flexCenterCss}
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;
`;

const Img = styled.img`
  height: 100%;
  width: 700px;
  object-fit: cover;
  object-position: center;
`;
