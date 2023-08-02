import { ChangeEvent, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular4, BodyKrRegular5, HeadingKrMedium6 } from '../../styles/typefaces';
import { ArrowUp, ArrowDown } from '../icons/Icons';
interface IPriceStaticBar extends React.HTMLAttributes<HTMLDivElement> {}

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

export default function PriceStaticBar({ ...props }: IPriceStaticBar) {
  const lowestPrice = 3850; //단위: 만원
  const highestPrice = 4300;
  const [budget, setBudget] = useState(highestPrice);
  const [total, setTotal] = useState(500);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getBudgetStatus = () => {
    const status = budget - total;
    status ? setIsOverBudget(false) : setIsOverBudget(true);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setBudget(newValue);
  };
  useEffect(() => {}, [isOpen]);
  return (
    <StatusBox {...props} $isover={isOverBudget.toString()}>
      <StatusText>
        <span className="status-title">예산 범위</span>
        <span className="status-desc">
          {isOverBudget ? '설정한 예산까지' : '설정한 예산보다'}
          <span id="price-info"> {((budget - total) * 10000).toLocaleString()}원 </span>
          {isOverBudget ? '남았어요.' : '더 들었어요.'}
        </span>

        <IconBtn onClick={() => setIsOpen(!isOpen)}>{isOpen ? <ArrowUp /> : <ArrowDown />}</IconBtn>
      </StatusText>

      {isOpen ? (
        <PriceBarWrapper>
          <PriceBar
            type="range"
            min={lowestPrice}
            max={highestPrice}
            value={budget}
            onChange={handleChange}
            step={10}
          />
          {budget}

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

const StatusBox = styled.div<{ $isover: string }>`
  ${({ $isover }) => $isover === 'false' && withinBudgetCss}
  ${({ $isover }) => $isover === 'true' && overBudgetCss}
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
  padding-top: 34px;
`;
const PriceBar = styled.input.attrs((props) => ({
  type: props.type,
  min: props.min,
  max: props.max,
  value: props.value,
  onChange: props.onChange,
}))`
  -webkit-appearance: none;
  width: 330px;
  height: 6px;
  border-radius: 10px;

  background: ${(props) => props.theme.color.white};
  outline: none;
  /* 슬라이더 배경 색상 */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.color.primaryColor800};
    border-radius: 10px;
  }
  /* 슬라이더 핸들 스타일 */
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${(props) => props.theme.color.primaryColor400};
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #fff;
    margin-top: -8px;
  }
`;

const PriceInfo = styled.div`
  ${flexCenterCss};
  justify-content: space-between;
  span {
    padding-top: 4px;
    ${BodyKrRegular5}
    color: ${(props) => props.theme.color.primaryColor200};
  }
`;
