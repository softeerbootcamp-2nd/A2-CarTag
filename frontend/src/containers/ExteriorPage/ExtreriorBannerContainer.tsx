import { MouseEventHandler, useState } from 'react';
import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { flexCenterCss } from '../../utils/commonStyle';

export default function ExteriorBannerContainer() {
  const [imgIdx, setImgIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startIdx, setStartIdx] = useState(0);

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
    const moveIdx = Math.round(60 * percent);
    let resultIdx = startIdx + moveIdx;
    if (resultIdx < 0) {
      resultIdx += 60;
    }
    resultIdx %= 60;
    setImgIdx(resultIdx);
  };
  const handleMouseup: MouseEventHandler<HTMLDivElement> = ({ pageX }) => {
    setIsDragging(false);
    setStartX(pageX);
  };

  return (
    <>
      <ExteriorBanner onMouseUp={handleMouseup} subtitle={'외장색상'} title={'어비스블랙펄'}>
        <FlexCenterWrapper>
          <ImgWrapper onMouseMove={handleMousemove} onMouseDown={handleMousedown}>
            <CarImg src={`/images/car360/img${imgIdx}.png`} alt="" />
            <CarShadow>
              <DegreeCaption>360°</DegreeCaption>
            </CarShadow>
          </ImgWrapper>
        </FlexCenterWrapper>
      </ExteriorBanner>
    </>
  );
}

const ExteriorBanner = styled(Banner)`
  background: ${({ theme }) => theme.color.blueBg};
`;
const CarImg = styled.img`
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
