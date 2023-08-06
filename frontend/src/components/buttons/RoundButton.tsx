import { css, styled } from 'styled-components';
import { BodyKrRegular3 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';

interface IRoundButton extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'option' | 'price';
  inactive?: boolean;
}

export default function RoundButton({ type, inactive = false, ...props }: IRoundButton) {
  return <Wrapper $inactive={inactive} $type={type} {...props}></Wrapper>;
}

const priceHoverCss = css`
  background: ${({ theme }) => theme.color.skyBlueCardBg};
  border-color: ${({ theme }) => theme.color.primaryColor300};
`;

const priceActiveCss = css`
  background: ${({ theme }) => theme.color.primaryColor};
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.primaryColor300};
`;

const optionHoverCss = css`
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.skyBlue};
  color: ${({ theme }) => theme.color.primaryColor};
`;

const optionActiveCss = css`
  background-color: ${({ theme }) => theme.color.primaryColor100};
  color: ${({ theme }) => theme.color.primaryColor};
`;

const priceButtonStyles = css`
  min-width: 86px;
  border-radius: 30px;
  padding: 6px 16px;
  height: 36px;
  &:hover {
    ${priceHoverCss}
  }
  &:active {
    ${priceActiveCss}
  }
`;
const optionButtonStyles = css`
  padding: 6px 20px;
  border-radius: 20px;
  min-width: 65px;
  height: 34px;
  &:hover {
    ${optionHoverCss}
  }
  &:active {
    ${optionActiveCss}
  }
`;

const Wrapper = styled.button<{ $type: 'option' | 'price'; $inactive: boolean }>`
  ${BodyKrRegular3};
  ${flexCenterCss};
  white-space: nowrap;
  ${({ $type, $inactive, theme }) => {
    if ($type === 'price') {
      return css`
        ${priceButtonStyles}
        border: 1px solid ${theme.color.primaryColor};
        background: ${$inactive ? theme.color.skyBlueCardBg : theme.color.white};
        color: ${$inactive ? theme.color.gray600 : theme.color.primaryColor};
      `;
    } else {
      return css`
        align-items: center;
        justify-content: center;
        ${optionButtonStyles}
        border: 1px solid ${$inactive ? theme.color.gray200 : theme.color.skyBlue};
        background: ${$inactive ? theme.color.white : theme.color.skyBlueCardBg};
        color: ${$inactive ? theme.color.gray600 : theme.color.primaryColor};
      `;
    }
  }}
`;
