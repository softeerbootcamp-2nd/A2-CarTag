import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular4, HeadingKrMedium6 } from '../../styles/typefaces';
import React from 'react';
import SimilarPriceSlider from './SimilarPriceSlider';

interface ISimilarPrice extends React.HTMLAttributes<HTMLDivElement> {}

export default function SimilarPrice({ ...props }: ISimilarPrice) {
  const lowestPrice = 3850; //단위: 만원
  const highestPrice = 4300;
  const total = 4100;
  const [budget, setBudget] = useState((lowestPrice + highestPrice) / 2);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const balance = ((isOverBudget ? -10000 : 10000) * (budget - total)).toLocaleString();
  const getBudgetStatus = useCallback(() => {
    const status = budget - total;
    status >= 0 ? setIsOverBudget(false) : setIsOverBudget(true);
  }, [budget]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setBudget(newValue);
  };

  useEffect(() => {
    getBudgetStatus();
  }, [budget, getBudgetStatus]);

  return (
    <StatusBox {...props} $isover={isOverBudget}>
      <StatusText>
        <StatusTitle>유사견적 가격</StatusTitle>
        <StatusDesc>
          내 견적 보다 &nbsp;
          <span id="price-info">{balance}원</span>
          {isOverBudget ? ' 비싸요.' : ' 싸요.'}
        </StatusDesc>
      </StatusText>
      <SimilarPriceSlider
        lowestPrice={lowestPrice}
        highestPrice={highestPrice}
        budget={budget}
        total={total}
        isOverBudget={isOverBudget}
        percent={((budget - lowestPrice) / (highestPrice - lowestPrice)) * 100}
        handleChange={handleChange}
      />
    </StatusBox>
  );
}
const withinBudgetCss = css`
  background: ${({ theme }) => theme.color.primaryColor700};
  #price-info {
    color: ${({ theme }) => theme.color.activeBlue2};
  }
`;

const overBudgetCss = css`
  background: rgba(0, 11, 25, 0.9);
  #price-info {
    color: ${({ theme }) => theme.color.sand};
  }
`;

const StatusBox = styled.div<{ $isover: boolean }>`
  ${({ $isover }) => !$isover && withinBudgetCss}
  ${({ $isover }) => $isover && overBudgetCss}
  min-width: 343px;
  padding: 8px 16px;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  color: ${({ theme }) => theme.color.gray50};
`;

const StatusText = styled.div`
  width: 100%;
  ${flexCenterCss};
  justify-content: space-between;
`;

const StatusTitle = styled.span`
  margin-right: 8px;
  ${HeadingKrMedium6}
`;

const StatusDesc = styled.span`
  ${BodyKrRegular4}
  flex:1;
  text-align: end;
`;
