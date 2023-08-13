import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { css, keyframes, styled, useTheme } from 'styled-components';
import { BodyKrRegular4, HeadingKrMedium6 } from '../../styles/typefaces';
import { ArrowUp, ArrowDown } from '../common/icons/Icons';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { PATH } from '../../utils/constants';
import PriceStaticSlider from './PriceStaticSlider';

interface IPriceStaticBar extends React.HTMLAttributes<HTMLDivElement> {}
interface IOffset {
  offsetX: string;
  offsetY: string;
}
export default function PriceStaticBar({ ...props }: IPriceStaticBar) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const dragRef = useRef(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offset, setOffset] = useState({ offsetX: '50%', offsetY: '76px' });
  const barRef = useRef<HTMLDivElement>(null);

  const lowestPrice = 3850; //단위: 만원
  const highestPrice = 4300;
  const total = 4100;
  const [budget, setBudget] = useState((lowestPrice + highestPrice) / 2);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    window.addEventListener('mousemove', handleMouseMove);
  });

  useEffect(() => {
    getBudgetStatus();
  }, [budget, getBudgetStatus]);

  if (pathname === PATH.home || pathname === PATH.trim) {
    return <></>;
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    dragRef.current = true;
    const element = barRef.current!.getBoundingClientRect();
    setStartX(event.clientX - element.left);
    setStartY(event.clientY - element.top);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!dragRef.current) {
      window.removeEventListener('mousemove', handleMouseMove);
      return;
    }

    const minX = 0;
    const minY = 60;
    const maxX = window.innerWidth - (barRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (barRef.current?.offsetHeight || 0);
    const newLeft = Math.min(Math.max(minX, event.clientX - startX), maxX);
    const newTop = Math.min(Math.max(minY, event.clientY - startY), maxY);

    setOffset({ offsetX: `${newLeft}px`, offsetY: `${newTop}px` });
  };

  const handleMouseUp = () => {
    dragRef.current = false;
  };

  return (
    <StatusBox
      ref={barRef}
      {...props}
      $offset={offset}
      $isover={isOverBudget}
      $isopen={isOpen}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <StatusText>
        <StatusTitle>예산 범위</StatusTitle>
        <StatusDesc $isover={isOverBudget}>
          {isOverBudget ? '설정한 예산보다 ' : '설정한 예산까지 '}
          <span>{balance}원</span>
          {isOverBudget ? ' 더 들었어요.' : ' 남았어요.'}
        </StatusDesc>

        <IconBtn onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ArrowUp fill={theme.color.gray50} /> : <ArrowDown fill={theme.color.gray50} />}
        </IconBtn>
      </StatusText>

      <AnimatedSection $isopen={isOpen}>
        <PriceStaticSlider
          lowestPrice={lowestPrice}
          highestPrice={highestPrice}
          budget={budget}
          total={total}
          isOverBudget={isOverBudget}
          percent={((budget - lowestPrice) / (highestPrice - lowestPrice)) * 100}
          handleChange={handleChange}
        />
      </AnimatedSection>
    </StatusBox>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const withinBudgetCss = css`
  background: ${({ theme }) => theme.color.primaryColor700};
`;

const overBudgetCss = css`
  background: rgba(0, 11, 25, 0.9);
`;

const StatusBox = styled.div<{ $offset: IOffset; $isover: boolean; $isopen: boolean }>`
  ${({ $isover }) => !$isover && withinBudgetCss}
  ${({ $isover }) => $isover && overBudgetCss}
  position: fixed;
  min-width: 343px;
  z-index: 1000;
  top: ${({ $offset }) => $offset.offsetY};
  left: ${({ $offset }) => $offset.offsetX};
  transform: ${({ $offset }) => ($offset.offsetX === '50%' ? 'translateX(-50%)' : null)};
  padding: 0px 16px;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  color: ${({ theme }) => theme.color.gray50};
  overflow: hidden;
  height: ${({ $isopen }) => ($isopen ? '110px' : '40px')};
  transition: height 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const StatusText = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusTitle = styled.p`
  margin-right: 8px;
  ${HeadingKrMedium6}
`;

const StatusDesc = styled.p<{ $isover: boolean }>`
  ${BodyKrRegular4}
  flex:1;
  text-align: end;
  span {
    color: ${({ theme, $isover }) => ($isover ? theme.color.sand : theme.color.activeBlue2)};
  }
`;
const AnimatedSection = styled.div<{ $isopen: boolean }>`
  display: ${({ $isopen }) => ($isopen ? 'block' : 'none')};
  animation: ${({ $isopen }) =>
    $isopen
      ? css`
          ${fadeIn} 0.5s ease
        `
      : 'none'};
`;

const IconBtn = styled.button``;
