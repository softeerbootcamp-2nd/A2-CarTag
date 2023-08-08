import { css, styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular5 } from '../../styles/typefaces';
import { ChangeEvent } from 'react';

interface ISlider extends React.HTMLAttributes<HTMLDivElement> {
  lowestPrice: number;
  highestPrice: number;
  isOverBudget: boolean;
  budget: number;
  total: number;
  percent: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default function Slider({
  lowestPrice,
  highestPrice,
  isOverBudget,
  budget,
  total,
  percent,
  handleChange,
  ...props
}: ISlider) {
  return (
    <PriceBarWrapper {...props}>
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
        <span>{lowestPrice}만원</span>
        <span>{highestPrice}만원</span>
      </PriceInfo>
    </PriceBarWrapper>
  );
}

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
  fill: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.primaryColor400)};
  left: ${({ $percent }) => $percent}%;
  transform: translate(-50%, -50%);
`;

const PriceBar = styled.input.attrs<{ $percent: number; $isover: boolean }>(
  ({ type, min, max, value, onChange, step }) => ({
    type: type,
    min: min,
    max: max,
    value: value,
    onChange: onChange,
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

  ${({ $percent, $isover, theme }) => {
    return css`
      background: linear-gradient(
        to right,
        #fff 0%,
        #fff ${$percent}%,
        ${$isover ? theme.color.gray800 : theme.color.primaryColor800} ${$percent}%,
        ${$isover ? theme.color.gray800 : theme.color.primaryColor800} 100%
      );
    `;
  }}

  &::-webkit-slider-runnable-track {
    cursor: pointer;

    width: 100%;
    height: 6px;
    border-radius: 4px;
  }

  &::-webkit-slider-thumb {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: ${({ $isover, theme }) =>
      $isover ? theme.color.sand : theme.color.primaryColor400};
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #fff;
    margin-top: -6px;
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
