import { styled } from 'styled-components';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import { BodyKrRegular3, HeadingKrMedium2 } from '../../styles/typefaces';
import RectButton from '../../components/common/buttons/RectButton';
import { HTMLAttributes, useContext } from 'react';
import { ItemContext } from '../../context/ItemProvider';
import { ShareModalContext } from '../../context/ModalProviders/ShareModalProvider';
import { flexCenterCss } from '../../utils/commonStyle';

interface IResultFooterContainer extends HTMLAttributes<HTMLDivElement> {
  handlePrint: () => void;
}
export default function ResultFooterContainer({ handlePrint }: IResultFooterContainer) {
  const { totalPrice } = useContext(ItemContext);
  const { setVisible: setShareModalVisible } = useContext(ShareModalContext);

  return (
    <Wrapper>
      <Footer>
        <PriceSection>
          <PriceCaption>최종 견적 가격</PriceCaption>
          <Price>{totalPrice.toLocaleString()} 원</Price>
        </PriceSection>
        <ButtonSection>
          <Button type={'price'} onClick={() => setShareModalVisible(true)}>
            공유하기
          </Button>
          <Button type={'price'} onClick={handlePrint}>
            PDF 다운로드
          </Button>
          <Button type={'price'}>상담신청</Button>
        </ButtonSection>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 999;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  ${flexCenterCss}
`;
const Footer = styled(CenterWrapper)`
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
