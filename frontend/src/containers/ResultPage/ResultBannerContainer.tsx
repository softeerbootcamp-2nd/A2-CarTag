import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import { BodyKrRegular3, HeadingKrBold1 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import { useState } from 'react';

type buttonType = 'exterior' | 'interior';

export default function ResultBannerContainer() {
  const [selectedButton, setSelectedButton] = useState<buttonType>('exterior');

  const handleSelectedButton = () => {
    if (selectedButton === 'exterior') {
      setSelectedButton('interior');
    } else {
      setSelectedButton('exterior');
    }
  };

  return (
    <>
      <ResultBanner>
        <Title>Le Blanc</Title>
        <CarImg src="images/car.png" alt="" />
        <ButtonContainer onClick={handleSelectedButton}>
          <Button $active={selectedButton === 'exterior'}>외장</Button>
          <Button $active={selectedButton === 'interior'}>내장</Button>
        </ButtonContainer>
      </ResultBanner>
    </>
  );
}

const ResultBanner = styled(Banner)`
  padding-bottom: 20px;
  box-shadow: none;
`;
const Title = styled.div`
  ${HeadingKrBold1}
  font-size: 146px;
  padding-top: 72px;
  color: white;
  text-align: center;
`;

const CarImg = styled.img`
  display: block;
  margin: 0 auto;
  height: 360px;
`;

const Button = styled.button<{ $active: boolean }>`
  width: 100%;
  ${BodyKrRegular3}
  height: 36px;
  border-radius: 18px;
  color: ${({ $active, theme }) => ($active ? theme.color.white : theme.color.primaryColor)};
  background-color: ${({ $active, theme }) => ($active ? theme.color.primaryColor : 'none')};
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  ${flexCenterCss}
  justify-content: space-between;
  padding: 0 5px;
  gap: 5px;
  width: 213px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.color.gray100};
`;
