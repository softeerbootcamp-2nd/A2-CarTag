import { ChangeEvent, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { flexCenterCss } from '../../../utils/commonStyle';
import { BodyKrRegular4, HeadingKrMedium6 } from '../../../styles/typefaces';
import { ArrowUp, ArrowDown } from '../../icons/Icons';
import { PriceBar, PriceInfo } from './Slider';
interface IPriceStaticBar extends React.HTMLAttributes<HTMLDivElement> {}

export default function PriceStaticBar({ ...props }: IPriceStaticBar) {
  const lowestPrice = 3850; //단위: 만원
  const highestPrice = 4300;
  const [budget, setBudget] = useState((lowestPrice + highestPrice) / 2);
  const [total, setTotal] = useState(4100);
  const [percent, setPercent] = useState(50);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const balance = ((isOverBudget ? -10000 : 10000) * (budget - total)).toLocaleString();
  const getBudgetStatus = () => {
    const status = budget - total;
    status >= 0 ? setIsOverBudget(false) : setIsOverBudget(true);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setBudget(newValue);
  };

  useEffect(() => {
    setPercent(((budget - lowestPrice) / (highestPrice - lowestPrice)) * 100);
    getBudgetStatus();
  }, [budget]);
  return (
    <StatusBox {...props} $isover={isOverBudget}>
      <StatusText>
        <span className="status-title">예산 범위</span>
        <span className="status-desc">
          {isOverBudget ? '설정한 예산까지 ' : '설정한 예산보다 '}
          <span id="price-info">{balance}원</span>
          {isOverBudget ? ' 남았어요.' : ' 더 들었어요.'}
        </span>

        <IconBtn onClick={() => setIsOpen(!isOpen)}>{isOpen ? <ArrowUp /> : <ArrowDown />}</IconBtn>
      </StatusText>

      {isOpen ? (
        <PriceBarWrapper>
          <MarkerSvgWrapper>
            <PriceBar
              type="range"
              min={lowestPrice}
              max={highestPrice}
              value={budget}
              onChange={handleChange}
              step={10}
              $percent={percent}
              $isover={isOverBudget}
            />

            <MarkerSvg
              $isover={isOverBudget}
              $percent={((total - lowestPrice) / (highestPrice - lowestPrice)) * 100}
            >
              <path d="M3.625 22C3.625 22.4142 3.96079 22.75 4.375 22.75C4.78921 22.75 5.125 22.4142 5.125 22L3.625 22ZM4.375 8C6.58414 8 8.375 6.20914 8.375 4C8.375 1.79086 6.58414 0 4.375 0C2.16586 0 0.374999 1.79086 0.374999 4C0.374999 6.20914 2.16586 8 4.375 8ZM5.125 22L5.125 4L3.625 4L3.625 22L5.125 22Z" />
            </MarkerSvg>
          </MarkerSvgWrapper>
          <PriceInfo>
            <span>3850만원</span>
            <span>4300만원</span>
          </PriceInfo>
        </PriceBarWrapper>
      ) : null}
      {props.children}
    </StatusBox>
  );
}

const withinBudgetCss = css`
  background: ${(props) => props.theme.color.primaryColor700};
  #price-info {
    color: ${(props) => props.theme.color.activeBlue2};
  }
`;

const overBudgetCss = css`
  background: rgba(0, 11, 25, 0.9);
  #price-info {
    color: ${(props) => props.theme.color.sand};
  }
`;

const StatusBox = styled.div<{ $isover: boolean }>`
  ${({ $isover }) => !$isover && withinBudgetCss}
  ${({ $isover }) => $isover && overBudgetCss}
  width: 343px;
  padding: 8px 16px;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  color: ${(props) => props.theme.color.gray50};

  .status-title {
    ${HeadingKrMedium6}
  }
  .status-desc {
    ${BodyKrRegular4}
    flex:1;
    text-align: end;
  }
`;

const StatusText = styled.div`
  width: 100%;
  ${flexCenterCss};
  justify-content: space-between;
`;

const IconBtn = styled.button`
  margin-left: 16px;
`;
const PriceBarWrapper = styled.div`
  margin: 0px 4px;
  padding-top: 34px;
  padding-bottom: 8px;
`;

const MarkerSvgWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const MarkerSvg = styled.svg<{ $isover: boolean; $percent: number }>`
  pointer-events: none;
  position: absolute;
  width: 9px;
  height: 23px;
  top: 6px;
  fill: ${(props) => (props.$isover ? props.theme.color.sand : props.theme.color.primaryColor400)};
  left: ${(props) => props.$percent}%;
  transform: translate(-50%, -50%);
`;
