import { css, styled } from 'styled-components';
import { BodyKrMedium2, CaptionEn2, HeadingKrMedium5 } from '../../styles/typefaces';
import React from 'react';
import { flexCenterCss } from '../../utils/commonStyle';
interface IRectButton extends React.HTMLAttributes<HTMLButtonElement> {
  type: string;
}
interface IWrapper {
  type: string;
}

export default function RectButton({ type, ...props }: IRectButton) {
  return <Wrapper type={type} {...props}></Wrapper>;
}

const popupCss = css`
  width: 850px;
  height: 52px;
  ${BodyKrMedium2}
`;

const priceCss = css`
  width: 340px;
  height: 44px;
  ${HeadingKrMedium5};
`;

const trimCss = css`
  width: 220px;
  height: 36px;
  ${CaptionEn2};
`;

const Wrapper = styled.button<IWrapper>`
  ${(props) => props.type === 'popup' && popupCss}
  ${(props) => props.type === 'price' && priceCss}
  ${(props) => props.type === 'trim' && trimCss}

  ${flexCenterCss}

  background-color: ${(props) => props.theme.color.primaryColor700};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background-color: ${(props) => props.theme.color.primaryColor500};
  }
  &:active {
    background-color: ${(props) => props.theme.color.primaryColor800};
  }
`;
