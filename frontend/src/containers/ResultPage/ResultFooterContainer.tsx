import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { BodyKrRegular3, HeadingKrMedium2 } from '../../styles/typefaces';
import RectButton from '../../components/common/buttons/RectButton';

export default function ResultFooterContainer() {
  return (
    <Wrapper>
      <PriceSection>
        <PriceCaption>최종 견적 가격</PriceCaption>
        <Price>100원</Price>
      </PriceSection>
      <ButtonSection>
        <GrayButton type={'price'}>공유하기</GrayButton>
        <GrayButton type={'price'}>PDF 다운로드</GrayButton>
        <Button type={'price'}>상담신청</Button>
      </ButtonSection>
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)`
  margin-top: 165px;
  margin-bottom: 16px;
  gap: 13px;
  display: flex;
  flex-direction: column;
`;
const PriceSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const PriceCaption = styled.span`
  ${BodyKrRegular3}
  margin-right:8px;
  color: ${({ theme }) => theme.color.gray700};
`;
const Price = styled.span`
  ${HeadingKrMedium2}
  color: ${({ theme }) => theme.color.primaryColor};
`;

const ButtonSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 17px;
`;
const Button = styled(RectButton)`
  border-radius: 4px;
`;

const GrayButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
