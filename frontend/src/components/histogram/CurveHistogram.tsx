import { styled, useTheme } from 'styled-components';
import HmgTag from '../common/hmgTag/HmgTag';
import { BodyKrMedium2, BodyKrRegular2, HeadingKrMedium5 } from '../../styles/typefaces';
import { useEffect, useRef } from 'react';

export default function CurveHistogram() {
  const theme = useTheme();
  const histogramRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (histogramRef.current) {
      const { width: svgWidth, height: svgHeight } = histogramRef.current.getBoundingClientRect();
      const intervalX = svgWidth / 10;
      console.log(intervalX, svgHeight);
    }
  }, [histogramRef]);

  return (
    <HistogramWrapper>
      <HmgTag size="small" />
      <PaddingWrapper>
        <CaptionWrapper>
          <Caption>
            르블랑으로 완성된 모든 타입의
            <BlueText>견적 가격의 분포</BlueText>
            입니다.
          </Caption>
        </CaptionWrapper>
        <Histogram strokeWidth={2} ref={histogramRef}>
          <path fill="none" strokeWidth="3" stroke={theme.color.gray200}></path>
        </Histogram>
        <XCaptionWrapper>
          <MinXCaption>
            <XTitle>최소</XTitle>
            <XValue>43,000,000원</XValue>
          </MinXCaption>
          <MaxXCaption>
            <XTitle>최대</XTitle>
            <XValue>43,000,000원</XValue>
          </MaxXCaption>
        </XCaptionWrapper>
      </PaddingWrapper>
    </HistogramWrapper>
  );
}

const Histogram = styled.svg`
  width: 100%;
  height: 117px;
`;
const CaptionWrapper = styled.div`
  ${BodyKrMedium2}
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  margin-bottom: 20px;
`;
const Caption = styled.div`
  width: 200px;
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue};
`;

const HistogramWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
  margin-top: 38px;
`;

const PaddingWrapper = styled.div`
  padding: 21px 16px;
`;

const XCaptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.gray600};
`;
const MinXCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const MaxXCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const XTitle = styled.div`
  ${HeadingKrMedium5}
`;
const XValue = styled.div`
  ${BodyKrRegular2}
`;
