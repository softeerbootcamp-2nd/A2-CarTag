import { styled } from 'styled-components';

export const DimmedBackground = styled.div<{ $displayDimmed: boolean }>`
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 31, 31, 0.7);
  backdrop-filter: blur(6px);
  mix-blend-mode: normal;
  display: ${({ $displayDimmed }) => ($displayDimmed ? 'block' : 'none')};
`;
