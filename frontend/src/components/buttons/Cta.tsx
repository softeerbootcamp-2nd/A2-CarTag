import { css, styled } from 'styled-components';
import { BodyKrMedium2, CaptionEn2, HeadingKrMedium5 } from '../../styles/typefaces';
import React, { useState } from 'react';
import { flexCenterCss } from '../../utils/commonStyle';
interface ICta extends React.HTMLAttributes<HTMLButtonElement> {
  type: string;
  text: string;
}
interface ICtaBtn {
  type: string;
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
export function Cta({ type, text, ...props }: ICta) {
  const [buttonText, setButtonText] = useState(text);
  const handleClick = () => {
    //TODO: click 되면 다음 페이지로 전환
  };

  return (
    <>
      <CtaBtn type={type} onClick={handleClick} {...props}>
        {buttonText}
      </CtaBtn>
    </>
  );
}
const CtaBtn = styled.button<ICtaBtn>`
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
