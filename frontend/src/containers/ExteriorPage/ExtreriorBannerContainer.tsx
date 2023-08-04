import { styled } from 'styled-components';
import Banner from '../../components/banner/Banner';
import { DragEventHandler, useRef, useState } from 'react';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { flexCenterCss } from '../../utils/commonStyle';

export default function ExteriorBannerContainer() {
  const [idx, setIdx] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [x, setX] = useState(0);
  const [startIdx, setStartIdx] = useState(0);

  const handleMousedown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartIdx(idx);
  };
  const handleMousemove: React.MouseEventHandler<HTMLDivElement> = ({ pageX, currentTarget }) => {
    if (!isDragging) return;

    const { offsetWidth } = currentTarget;
    const moveX = startX - pageX;
    const percent = moveX / offsetWidth; // -1 ~ 1
    const moveIdx = Math.round(60 * percent); // -60 ~ 60
    let resultIdx = startIdx + moveIdx; //

    if (resultIdx < 0) {
      resultIdx = 60 + resultIdx;
    }

    setIdx(resultIdx % 60);

    setX(pageX - startX);
  };
  const handleMouseup: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(false);
    setStartX(e.pageX);
  };

  return (
    <Wrapper onMouseUp={handleMouseup}>
      <Banner subtitle={'외장색상'} title={'어비스블랙펄'}>
        <FlexCenterWrapper>
          <ImgWrapper onMouseMove={handleMousemove} onMouseDown={handleMousedown}>
            <CarImg src={`/images/car360/img${idx}.png`} alt="" />
          </ImgWrapper>
        </FlexCenterWrapper>
      </Banner>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const CarImg = styled.img`
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
`;
const ImgWrapper = styled.div`
  width: 592px;
  cursor: pointer;
`;
const FlexCenterWrapper = styled(CenterWrapper)`
  ${flexCenterCss}
`;
