import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Bubble, CloseIcon } from '../common/icons/Icons';
import { BodyKrRegular3, HeadingKrMedium7 } from '../../styles/typefaces';
import CenterWrapper from '../layout/CenterWrapper';

interface IOnBoardingGuide extends HTMLAttributes<HTMLDivElement> {}
export default function OnBoardingGuide({ ...props }: IOnBoardingGuide) {
  const [displayDimmed, setDisplayDimmed] = useState(true);
  const guideBubbleRef = useRef<HTMLDivElement>(null);
  const hmgDataBgRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: MouseEvent) => {
    if (guideBubbleRef.current?.contains(event.target as Node)) {
      return;
    }
    if (hmgDataBgRef.current?.contains(event.target as Node)) {
      return;
    }
    setDisplayDimmed(false);
  };

  useEffect(() => {
    window.addEventListener('click', (event) => handleClick(event));
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <DimmedBg $displayDimmed={displayDimmed} {...props}>
      <Wrapper>
        <GuideBubble ref={guideBubbleRef}>
          <Bubble />
          <GuideText>
            <Header>
              <GuideTitle>
                현대자동차만이
                <br />
                제공하는 <BlueText>실활용 데이터</BlueText>로<br />
                합리적인 차량을 만들어 보세요.
              </GuideTitle>
              <CloseBtn onClick={() => setDisplayDimmed(false)}>
                <CloseIcon />
              </CloseBtn>
            </Header>
            <Separator />
            <GuideDesc>
              HMG Data 마크는 Hyundai Motor Group에서만 제공하는 데이터입니다.
              <br /> 주행 중 운전자들이 실제로 얼마나 활용하는지를 추적해 수치화한 데이터 입니다.
            </GuideDesc>
          </GuideText>
        </GuideBubble>
        <HmgDataBg ref={hmgDataBgRef} />
      </Wrapper>
    </DimmedBg>
  );
}

const DimmedBg = styled.div<{ $displayDimmed: boolean }>`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 31, 31, 0.7);
  backdrop-filter: blur(6px);
  mix-blend-mode: normal;
  display: ${({ $displayDimmed }) => ($displayDimmed ? 'block' : 'none')};
`;

const Wrapper = styled(CenterWrapper)`
  width: 1280px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const CloseBtn = styled.button``;
const HmgDataBg = styled.div`
  z-index: 10000;
  margin-top: 20px;
  margin-left: 111px;
  width: 316px;
  height: 175px;
  background-color: white;
`;
const GuideBubble = styled.div`
  z-index: 10000;
  width: 323px;
  height: 206px;
  top: 226px;
  left: 440px;
  position: relative;
`;

const GuideText = styled.div`
  width: 100%;
  height: 100%;
  padding: 17px 34px 17px 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  top: 0;
  left: 17px;
`;

const GuideTitle = styled.div`
  width: 214px;
  ${HeadingKrMedium7}
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue};
`;
const Separator = styled.div`
  width: 41px;
  height: 1px;
  margin: 16px 0;
  background-color: ${({ theme }) => theme.color.primaryColor200};
`;
const GuideDesc = styled.div`
  width: 266px;
  ${BodyKrRegular3}
  color: ${({ theme }) => theme.color.primaryColor};
`;
