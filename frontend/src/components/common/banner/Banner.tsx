import { css, keyframes, styled } from 'styled-components';
import { BodyKrRegular3, HeadingKrBold1 } from '../../../styles/typefaces';
import { useCallback, useEffect, useState } from 'react';
import { MAX_TEXT_CNT } from '../../../utils/constants';
import CenterWrapper from '../layout/CenterWrapper';

interface IBanner extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  title?: string;
}

export default function Banner({ subtitle, title, ...props }: IBanner) {
  const [displayText, setDisplayText] = useState('');
  const isOverflow = title && title.length > MAX_TEXT_CNT ? true : false;

  const displayOverflow = useCallback(() => {
    if (!title) return;
    const txt = title.length > MAX_TEXT_CNT ? title.substring(0, MAX_TEXT_CNT) + '...' : title;
    setDisplayText(txt);
  }, [title]);

  useEffect(() => {
    displayOverflow();
  }, [title, displayOverflow]);

  return (
    <>
      <BannerBg {...props}>
        <CenterWrapper>
          <InfoWrapper>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
            {title && (
              <Title
                onMouseOver={() => setDisplayText(title)}
                onMouseLeave={displayOverflow}
                $isOverflow={isOverflow}
              >
                {displayText}
              </Title>
            )}
          </InfoWrapper>
        </CenterWrapper>
        {props.children}
      </BannerBg>
    </>
  );
}

const BannerBg = styled.div`
  position: relative;
  width: 100%;
  min-height: 360px;
  background: linear-gradient(
      180deg,
      rgba(162, 199, 231, 0.2) 24.92%,
      rgba(255, 255, 255, 0) 61.36%
    ),
    #fff;
  box-shadow: 0px 0px 8px 0px rgba(131, 133, 136, 0.2);
`;
const InfoWrapper = styled.div`
  position: absolute;
  top: 72px;
  width: 448px;
  overflow-x: hidden;
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.color.gray900};
  ${BodyKrRegular3}
`;

const textLoop = keyframes`
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-130%, 0, 0);
    transform: translate3d(-130%, 0, 0);
  }
`;

const Title = styled.p<{ $isOverflow: boolean }>`
  position: relative;
  color: ${({ theme }) => theme.color.primaryColor700};
  ${HeadingKrBold1}

  white-space: nowrap;
  ${({ $isOverflow }) => {
    if ($isOverflow)
      return css`
        z-index: 1;
        animation-play-state: paused;
        &:hover {
          cursor: pointer;
          animation: ${textLoop} 10s linear infinite;
        }
      `;
  }}
`;
