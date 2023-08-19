import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface IWhiteModal extends HTMLAttributes<HTMLDivElement> {}

export default function WhiteModal({ ...props }: IWhiteModal) {
  return <Wrapper {...props}></Wrapper>;
}

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
`;
