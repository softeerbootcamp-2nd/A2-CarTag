import { useCallback, useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrMedium5, BodyKrRegular4, HeadingKrMedium6 } from '../../styles/typefaces';
import React from 'react';
import SimilarPriceSlider from './SimilarPriceSlider';
import { ItemContext } from '../../context/ItemProvider';
import { HIGHEST_PRICE } from '../../utils/constants';

interface ISimilarPriceBar extends React.HTMLAttributes<HTMLDivElement> {
  similarPrice: number;
}

export default function SimilarPriceBar({ similarPrice, ...props }: ISimilarPriceBar) {
  const { totalPrice, selectedItem } = useContext(ItemContext);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const balance = ((isOverBudget ? -1 : 1) * (totalPrice - similarPrice)).toLocaleString();
  const getBudgetStatus = useCallback(() => {
    const status = totalPrice - similarPrice;
    status >= 0 ? setIsOverBudget(false) : setIsOverBudget(true);
  }, [similarPrice, totalPrice]);

  useEffect(() => {
    getBudgetStatus();
  }, [similarPrice, getBudgetStatus]);
  return (
    <StatusBox {...props} $isover={isOverBudget}>
      <StatusText>
        <StatusTitle>유사견적 가격</StatusTitle>
        <StatusDesc>
          내 견적 보다 &nbsp;
          <PriceInfo>{balance}원</PriceInfo>
          {isOverBudget ? ' 비싸요.' : ' 싸요.'}
        </StatusDesc>
      </StatusText>
      <SimilarPriceSlider
        isOverBudget={isOverBudget}
        similarPrice={similarPrice}
        percent={
          ((totalPrice - selectedItem.trim.price) / (HIGHEST_PRICE - selectedItem.trim.price)) * 100
        }
      />
      <InfoWrapper>
        <InfoCaption $isover={isOverBudget}>
          <Info>
            <Ellipse $isover={isOverBudget} />내 견적
          </Info>
          <Info>
            <Ellipse $isover={isOverBudget} />
            유사 견적
          </Info>
        </InfoCaption>
      </InfoWrapper>
    </StatusBox>
  );
}

const PriceInfo = styled.span``;

const StatusBox = styled.div<{ $isover: boolean }>`
  background: ${({ theme, $isover }) =>
    $isover ? 'rgba(0, 11, 25, 0.9)' : theme.color.primaryColor700};
  min-width: 343px;
  padding: 8px 16px;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  color: ${({ theme }) => theme.color.gray50};
  ${PriceInfo} {
    color: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.activeBlue2)};
  }
  ${PriceInfo} {
    color: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.activeBlue2)};
  }
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

const InfoWrapper = styled.div`
  ${flexCenterCss}
`;

const InfoCaption = styled.div<{ $isover?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.activeBlue2)};
  ${BodyKrMedium5}
`;

const Ellipse = styled.div<{ $isover: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, $isover }) =>
    $isover ? theme.color.sand : theme.color.activeBlue2};
`;

const Info = styled.span`
  ${flexCenterCss}
  gap: 4px;
  &:last-child {
    color: white;
    ${Ellipse} {
      background-color: white;
    }
  }
`;
