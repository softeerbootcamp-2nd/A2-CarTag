import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular4, HeadingKrMedium6 } from '../../styles/typefaces';
import React from 'react';
import SimilarPriceSlider from './SimilarPriceSlider';
import { ItemContext } from '../../context/ItemProvider';
import { HIGHEST_PRICE } from '../../utils/constants';

interface ISimilarPrice extends React.HTMLAttributes<HTMLDivElement> {}

export default function SimilarPrice({ ...props }: ISimilarPrice) {
  const { totalPrice, selectedItem } = useContext(ItemContext);

  const [budget, setBudget] = useState((selectedItem.trim.price + HIGHEST_PRICE) / 2);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const balance = ((isOverBudget ? -1 : 1) * (budget - totalPrice)).toLocaleString();
  const getBudgetStatus = useCallback(() => {
    const status = budget - totalPrice;
    status >= 0 ? setIsOverBudget(false) : setIsOverBudget(true);
  }, [budget, totalPrice]);
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
        budget={budget}
        isOverBudget={isOverBudget}
        percent={
          ((budget - selectedItem.trim.price) / (HIGHEST_PRICE - selectedItem.trim.price)) * 100
        }
        handleChange={handleChange}
      />
      <InfoCaption>
        <Info>내 견적</Info>
        <Info>유사 견적</Info>
      </InfoCaption>
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

const InfoCaption = styled.div``;
const Info = styled.span``;
