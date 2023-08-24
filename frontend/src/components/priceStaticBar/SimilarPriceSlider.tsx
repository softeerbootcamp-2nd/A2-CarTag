import { styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular3, BodyKrRegular5 } from '../../styles/typefaces';
import { useContext } from 'react';
import { HIGHEST_PRICE, HUNDRED_THOUSAND_UNIT, TEN_THOUSAND_UNIT } from '../../utils/constants';
import { ItemContext } from '../../context/ItemProvider';
interface ISimilarPriceSlider extends React.HTMLAttributes<HTMLDivElement> {
  isOverBudget: boolean;
  similarPrice: number;
  percent: number;
}
export default function SimilarPriceSlider({
  isOverBudget,
  similarPrice,
  percent,
  ...props
}: ISimilarPriceSlider) {
  const { totalPrice, selectedItem } = useContext(ItemContext);
  return (
    <PriceBarWrapper {...props}>
      <MarkerSvgWrapper>
        <BudgetInfo>
          내 차의 견적은 총&nbsp;
          <BlueText $isover={isOverBudget}>{totalPrice / TEN_THOUSAND_UNIT}만원</BlueText>이에요.
        </BudgetInfo>
        <PriceBar
          type="range"
          min={selectedItem.trim.price}
          step={HUNDRED_THOUSAND_UNIT}
          $percent={percent}
          $isover={isOverBudget}
        />
        <SimilarMarkerSvg
          $percent={
            ((similarPrice - selectedItem.trim.price) / (HIGHEST_PRICE - selectedItem.trim.price)) *
            100
          }
        >
          <path d="M3.625 22C3.625 22.4142 3.96079 22.75 4.375 22.75C4.78921 22.75 5.125 22.4142 5.125 22L3.625 22ZM4.375 8C6.58414 8 8.375 6.20914 8.375 4C8.375 1.79086 6.58414 0 4.375 0C2.16586 0 0.374999 1.79086 0.374999 4C0.374999 6.20914 2.16586 8 4.375 8ZM5.125 22L5.125 4L3.625 4L3.625 22L5.125 22Z" />
        </SimilarMarkerSvg>
        <MarkerSvg
          $isover={isOverBudget}
          $percent={
            ((totalPrice - selectedItem.trim.price) / (HIGHEST_PRICE - selectedItem.trim.price)) *
            100
          }
        >
          <path d="M3.625 22C3.625 22.4142 3.96079 22.75 4.375 22.75C4.78921 22.75 5.125 22.4142 5.125 22L3.625 22ZM4.375 8C6.58414 8 8.375 6.20914 8.375 4C8.375 1.79086 6.58414 0 4.375 0C2.16586 0 0.374999 1.79086 0.374999 4C0.374999 6.20914 2.16586 8 4.375 8ZM5.125 22L5.125 4L3.625 4L3.625 22L5.125 22Z" />
        </MarkerSvg>
      </MarkerSvgWrapper>
      <PriceInfo>
        <span>{selectedItem.trim.price / TEN_THOUSAND_UNIT}만원</span>
        <span>{HIGHEST_PRICE / TEN_THOUSAND_UNIT}만원</span>
      </PriceInfo>
    </PriceBarWrapper>
  );
}
const PriceBarWrapper = styled.div`
  margin: 0px 4px;
  padding-top: 34px;
  padding-bottom: 8px;
`;
const BlueText = styled.span<{ $isover: boolean }>`
  color: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.activeBlue2)};
`;
const BudgetInfo = styled.div`
  ${BodyKrRegular3}
  position: absolute;
  top: -34px;
  right: 0px;
  background-color: black;
  opacity: 0.9;
`;
const MarkerSvgWrapper = styled.div`
  height: 100%;
  position: relative;
`;
const MarkerSvg = styled.svg<{ $isover?: boolean; $percent: number }>`
  pointer-events: none;
  position: absolute;
  width: 9px;
  height: 23px;
  top: 6px;
  fill: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.primaryColor400)};
  left: ${({ $percent }) => $percent}%;
  transform: translate(-50%, -50%);
`;
const SimilarMarkerSvg = styled(MarkerSvg)`
  fill: white;
`;
const PriceBar = styled.input.attrs<{ $percent: number; $isover: boolean }>(
  ({ type, min, step }) => ({
    type: type,
    min: min,
    max: HIGHEST_PRICE,
    step: step,
  })
)`
  &,
  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  width: 100%;
  height: 6px;
  border-radius: 4px;
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    border-radius: 4px;
  }
`;
const PriceInfo = styled.div`
  ${flexCenterCss};
  justify-content: space-between;
  span {
    padding-top: 4px;
    ${BodyKrRegular5}
    color: ${({ theme }) => theme.color.primaryColor200};
  }
`;
