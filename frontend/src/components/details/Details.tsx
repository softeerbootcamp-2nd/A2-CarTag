import { styled, useTheme } from 'styled-components';
import { HTMLAttributes } from 'react';
import { BodyKrMedium3, HeadingKrMedium5 } from '../../styles/typefaces';
import { ArrowDown, ArrowUp } from '../common/icons/Icons';

interface IDetails extends HTMLAttributes<HTMLDivElement> {
  title: string;
  open?: boolean;
  desc: string;
}

export default function Details({ title, open = false, desc, ...props }: IDetails) {
  const theme = useTheme();
  const arrowColor = theme.color.gray900;

  return (
    <Wrapper>
      <Summary {...props}>
        <span>{title}</span>
        <RightDiv>
          <Price>{desc}</Price>
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
  overflow: hidden;
`;
const Summary = styled.div`
  position: relative;
  z-index: 1;
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
  ${BodyKrMedium3}
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.primaryColor};
`;
