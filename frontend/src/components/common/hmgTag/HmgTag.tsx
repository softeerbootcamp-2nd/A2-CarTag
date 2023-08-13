import { css, styled } from 'styled-components';
import { HeadingEn5 } from '../../../styles/typefaces';

export type sizeType = 'large' | 'medium' | 'small';
export interface IHmgTag {
  size?: sizeType;
}

export default function HmgTag({ size = 'medium' }: IHmgTag) {
  // Todo. ">" 를 svg 아이콘으로 바꾸기
  return <Wrapper $size={size}>HMG Data {size === 'large' ? '>' : null}</Wrapper>;
}
const Wrapper = styled.div<{ $size: sizeType }>`
  ${HeadingEn5}

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.activeBlue2};
  color: ${({ theme }) => theme.color.white};
  ${({ $size }) => {
    if ($size === 'large')
      return css`
        width: 97px;
        height: 32px;
      `;
    else if ($size === 'medium')
      return css`
        width: 70px;
        height: 32px;
      `;
    else {
      return css`
        width: 70px;
        height: 20px;
      `;
    }
  }}
`;
