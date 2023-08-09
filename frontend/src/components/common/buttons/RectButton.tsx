import { css, styled } from 'styled-components';
import { BodyKrMedium2, CaptionEn2, HeadingKrMedium5 } from '../../../styles/typefaces';
import React from 'react';
import { flexCenterCss } from '../../../utils/commonStyle';

type rectBtnType = 'popup' | 'price' | 'trim';

interface IRectButton extends React.HTMLAttributes<HTMLButtonElement> {
  type: rectBtnType;
}
interface IWrapper {
  $type: rectBtnType;
}

export default function RectButton({ type, ...props }: IRectButton) {
  return <Wrapper $type={type} {...props}></Wrapper>;
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
  ${({ $type }) => $type === 'popup' && popupCss}
  ${({ $type }) => $type === 'price' && priceCss}
  ${({ $type }) => $type === 'trim' && trimCss}

  ${flexCenterCss}

  background-color: ${({ theme }) => theme.color.primaryColor700};
  color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.primaryColor500};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.primaryColor800};
  }
`;
