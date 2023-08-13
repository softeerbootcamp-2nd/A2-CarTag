import { css, styled } from 'styled-components';
import { HeadingEn5 } from '../../../styles/typefaces';
import { IHmgTag, sizeType } from './HmgTag';

export default function NoneHmgTag({ size = 'medium' }: IHmgTag) {
  return <Wrapper $size={size}>상세보기 {size === 'large' ? '>' : null}</Wrapper>;
}

const Wrapper = styled.div<{ $size: sizeType }>`
  ${HeadingEn5}
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray800};
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
