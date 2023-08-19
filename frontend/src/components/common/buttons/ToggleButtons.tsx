import { styled } from 'styled-components';
import { BodyKrRegular3 } from '../../../styles/typefaces';
import { flexCenterCss } from '../../../utils/commonStyle';
import { useState } from 'react';

type buttonType = 'outerColor' | 'innerColor';

export default function ToggleButtons() {
  const [selectedButton, setSelectedButton] = useState<buttonType>('outerColor');

  const toggle = () => {
    if (selectedButton === 'outerColor') {
      setSelectedButton('innerColor');
    } else {
      setSelectedButton('outerColor');
    }
  };

  return (
    <ToggleButtonContainer onClick={toggle}>
      <Button $active={selectedButton === 'outerColor'}>외장</Button>
      <Button $active={selectedButton === 'innerColor'}>내장</Button>
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
