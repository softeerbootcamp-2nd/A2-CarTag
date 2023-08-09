import { css, styled } from 'styled-components';

interface IDefaultCardStyle extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export default function DefaultCardStyle({ active = false, ...props }: IDefaultCardStyle) {
  return <Wrapper $active={active} {...props}></Wrapper>;
}

const activeCss = css`
  background: ${({ theme }) => theme.color.cardBg};
  border: 1px solid ${({ theme }) => theme.color.activeBlue};
`;

const inactiveCss = css`
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.activeBlue};
    background: ${({ theme }) => theme.color.cardBgOpacity05};
  }
  border: 1px solid ${({ theme }) => theme.color.gray200};
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray500};
`;

const Wrapper = styled.div<{ $active: boolean }>`
  cursor: pointer;
  border-radius: 2px;
  ${({ $active }) => {
    if ($active) {
      return css`
        ${activeCss}
      `;
    } else {
      return css`
        ${inactiveCss}
      `;
    }
  }}
`;
