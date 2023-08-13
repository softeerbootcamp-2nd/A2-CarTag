import { styled, useTheme } from 'styled-components';
import { HTMLAttributes } from 'react';
import { HeadingKrMedium5 } from '../../styles/typefaces';
import { ArrowDown, ArrowUp } from '../common/icons/Icons';

interface IDetails extends HTMLAttributes<HTMLDivElement> {
  title: string;
  open?: boolean;
}

export default function Details({ title, open = false, ...props }: IDetails) {
  const theme = useTheme();
  const arrowColor = theme.color.gray900;
  const totalPrice = 1_000_000;

  return (
    <Wrapper>
      <Summary {...props}>
        <span>{title}</span>
        <RightDiv>
          <Price>+{totalPrice.toLocaleString()}원</Price>
          {open ? <ArrowUp fill={arrowColor} /> : <ArrowDown fill={arrowColor} />}
        </RightDiv>
      </Summary>
      {props.children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
  overflow: hidden; /* 내용을 감추기 위해 오버플로우를 숨김 */
`;
const Summary = styled.div`
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
