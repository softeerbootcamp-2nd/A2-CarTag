import { css, styled } from 'styled-components';
import { BodyKrMedium2, CaptionEn2, HeadingKrMedium5 } from '../../../styles/typefaces';
import React from 'react';
import { flexCenterCss } from '../../../utils/commonStyle';

type rectBtnType = 'popup' | 'price' | 'trim';

interface IRectButton extends React.HTMLAttributes<HTMLButtonElement> {
  type: rectBtnType;
  active?: boolean;
}
interface IWrapper {
  $type: rectBtnType;
  $active: boolean;
}

export default function RectButton({ type, active = true, ...props }: IRectButton) {
  return <Wrapper $type={type} $active={active} {...props}></Wrapper>;
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

  ${({ $active, theme }) => {
    switch ($active) {
      case true:
        return css`
          ${flexCenterCss}
          background-color: ${theme.color.primaryColor700};
          color: ${theme.color.white};

          &:hover {
            background-color: ${theme.color.primaryColor500};
          }
          &:active {
            background-color: ${theme.color.primaryColor800};
          }
        `;
      case false:
        return css`
          background-color: ${theme.color.gray300};
          color: ${theme.color.white};
        `;
    }
  }}
`;
