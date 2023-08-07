import { ChangeEvent, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular4, HeadingKrMedium6 } from '../../styles/typefaces';
import { ArrowUp, ArrowDown } from '../icons/Icons';
import Slider from './Slider';
import React from 'react';

interface IPriceStaticBar extends React.HTMLAttributes<HTMLDivElement> {}
export default function PriceStaticBar({ ...props }: IPriceStaticBar) {
  const lowestPrice = 3850; //단위: 만원
  const highestPrice = 4300;
  const total = 4100;
  const [budget, setBudget] = useState((lowestPrice + highestPrice) / 2);

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
    getBudgetStatus();
  }, [budget]);

  return (
    <StatusBox {...props} $isover={isOverBudget}>
      <StatusText>
        <span className="status-title">예산 범위</span>
        <span className="status-desc">
          {isOverBudget ? '설정한 예산보다 ' : '설정한 예산까지 '}
          <span id="price-info">{balance}원</span>
          {isOverBudget ? ' 더 들었어요.' : ' 남았어요.'}
        </span>

        <IconBtn onClick={() => setIsOpen(!isOpen)}>{isOpen ? <ArrowUp /> : <ArrowDown />}</IconBtn>
      </StatusText>

      {isOpen ? (
        <Slider
          lowestPrice={lowestPrice}
          highestPrice={highestPrice}
          budget={budget}
          total={total}
          isOverBudget={isOverBudget}
          percent={((budget - lowestPrice) / (highestPrice - lowestPrice)) * 100}
          handleChange={handleChange}
        />
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
  position: absolute;
  min-width: 343px;
  z-index: 10;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  color: ${(props) => props.theme.color.gray50};

  .status-title {
    margin-right: 8px;
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

const IconBtn = styled.button``;
