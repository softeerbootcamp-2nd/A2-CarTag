import { styled, useTheme } from 'styled-components';
import { DetailsHTMLAttributes, useState } from 'react';
import { HeadingKrMedium5 } from '../../styles/typefaces';
import { ArrowDown, ArrowUp } from '../common/icons/Icons';

interface IDetails extends DetailsHTMLAttributes<HTMLDetailsElement> {
  title: string;
}

export default function Details({ title, ...props }: IDetails) {
  const [isOpen, setIsOepn] = useState(true);
  const theme = useTheme();
  const arrowColor = theme.color.gray900;
  const totalPrice = 1_000_000;

  const toggleIsOpen = () => {
    setIsOepn(!isOpen);
  };

  return (
    <Wrapper {...props}>
      <Summary onClick={toggleIsOpen}>
        <span>{title}</span>
        <RightDiv>
          <Price>+{totalPrice.toLocaleString()}원</Price>
          {isOpen ? <ArrowDown fill={arrowColor} /> : <ArrowUp fill={arrowColor} />}
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
`;
const Summary = styled.summary`
  ${HeadingKrMedium5}
  background-color: ${({ theme }) => theme.color.gray100};
  padding: 12px 20px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
const Price = styled.span`
  margin-right: 20px;
`;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.primaryColor};
`;
