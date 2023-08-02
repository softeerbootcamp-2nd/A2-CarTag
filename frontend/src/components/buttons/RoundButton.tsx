import { css, styled } from 'styled-components';
import { BodyKrRegular3 } from '../../styles/typefaces';

interface IRoundButton extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'option' | 'price';
}

export default function RoundButton({ type = 'option', ...props }: IRoundButton) {
  return <Wrapper $type={type} {...props}></Wrapper>;
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
  background: none;
  background-color: ${({ theme }) => theme.color.white};
`;

const optionActiveCss = css`
  background-color: ${({ theme }) => theme.color.primaryColor100};
`;

const Wrapper = styled.button<{ $type: 'option' | 'price' }>`
  ${BodyKrRegular3}
  height: 36px;
  padding-left: 17px;
  padding-right: 17px;
  border-radius: 18px;
  color: ${({ theme }) => theme.color.primaryColor};

  ${({ $type, theme }) => {
    if ($type === 'price') {
      return css`
        border: 1px solid ${theme.color.primaryColor};
        &:hover {
          ${priceHoverCss}
        }
        &:active {
          ${priceActiveCss}
        }
      `;
    } else {
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
    }
  }}
`;
