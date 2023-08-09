import { css, styled } from 'styled-components';
import { BodyKrRegular3 } from '../../../styles/typefaces';

interface IRoundButton extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'option' | 'price';
  inactive?: boolean;
}

export default function RoundButton({ type, inactive = false, ...props }: IRoundButton) {
  return <Wrapper $incative={inactive} $type={type} {...props}></Wrapper>;
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

const Wrapper = styled.button<{ $type: 'option' | 'price'; $incative: boolean }>`
  ${BodyKrRegular3}
  height: 36px;
  padding-left: 17px;
  padding-right: 17px;
  border-radius: 18px;
  color: ${({ theme }) => theme.color.primaryColor};

  ${({ $type, $incative, theme }) => {
    switch ($type) {
      case 'price':
        return css`
          border: 1px solid ${theme.color.primaryColor};
          &:hover {
            ${priceHoverCss}
          }
          &:active {
            ${priceActiveCss}
          }
        `;
      case 'option':
        if (!$incative) {
          return css`
            background: ${theme.color.skyBlueCardBg};
            border: 1px solid ${theme.color.skyBlue};
            &:hover {
              ${optionHoverCss}
            }
            &:active {
              ${optionActiveCss}
            }
          `;
        } else {
          return css`
            border: 1px solid ${theme.color.gray200};
            color: ${theme.color.gray600};
            background: ${theme.color.white};
            &:hover {
              ${optionHoverCss}
            }
            &:active {
              ${optionActiveCss}
            }
          `;
        }
    }
  }}
`;
