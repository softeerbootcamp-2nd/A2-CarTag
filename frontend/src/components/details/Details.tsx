import { styled, useTheme } from 'styled-components';
import { HTMLAttributes, useRef, useState } from 'react';
import { HeadingKrMedium5 } from '../../styles/typefaces';
import { ArrowDown, ArrowUp } from '../common/icons/Icons';

interface IDetails extends HTMLAttributes<HTMLDetailsElement> {
  title: string;
}

export default function Details({ title, ...props }: IDetails) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOepn] = useState(false);
  const theme = useTheme();
  const arrowColor = theme.color.gray900;
  const totalPrice = 1_000_000;

  const onClick = () => {
    if (ref.current) {
      const isOpen = !ref.current?.open;
      setIsOepn(isOpen);
    }
  };

  return (
    <Wrapper ref={ref} onClick={onClick} {...props}>
      <Summary>
        <span>{title}</span>
        <RightDiv>
          <Price>+{totalPrice.toLocaleString()}원</Price>
          {isOpen ? <ArrowUp fill={arrowColor} /> : <ArrowDown fill={arrowColor} />}
        </RightDiv>
      </Summary>
      {props.children}
    </Wrapper>
  );
}

const Wrapper = styled.details`
  position: relative;
  width: 100%;
  margin-top: 12px;
  cursor: pointer;
`;
const Summary = styled.summary`
  ${HeadingKrMedium5}
  background-color: ${({ theme }) => theme.color.gray100};
  padding: 12px 20px;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;
const Price = styled.span`
  margin-right: 20px;
`;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.primaryColor};
`;
