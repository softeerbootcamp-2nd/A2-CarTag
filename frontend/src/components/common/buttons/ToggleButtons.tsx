import { styled } from 'styled-components';
import { BodyKrRegular3 } from '../../../styles/typefaces';
import { flexCenterCss } from '../../../utils/commonStyle';
import { HTMLAttributes } from 'react';

type buttonType = 'outerColor' | 'innerColor';

interface IToggleButtons extends HTMLAttributes<HTMLDivElement> {
  mode: buttonType;
}

export default function ToggleButtons({ mode, ...props }: IToggleButtons) {
  return (
    <ToggleButtonContainer {...props}>
      <Button $active={mode === 'outerColor'}>외장</Button>
      <Button $active={mode === 'innerColor'}>내장</Button>
    </ToggleButtonContainer>
  );
}

const Button = styled.button<{ $active: boolean }>`
  width: 100%;
  ${BodyKrRegular3}
  height: 36px;
  border-radius: 18px;
  color: ${({ $active, theme }) => ($active ? theme.color.white : theme.color.primaryColor)};
  background-color: ${({ $active, theme }) => ($active ? theme.color.primaryColor : 'transparent')};
`;
const ToggleButtonContainer = styled.div`
  ${flexCenterCss}
  justify-content: space-between;
  padding: 0 5px;
  gap: 5px;
  width: 213px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  cursor: pointer;
`;
