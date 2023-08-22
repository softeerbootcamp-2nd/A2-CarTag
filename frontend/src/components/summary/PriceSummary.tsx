import { styled } from 'styled-components';
import RectButton from '../common/buttons/RectButton';
import RoundButton from '../common/buttons/RoundButton';
import { BodyKrRegular4, HeadingKrMedium2 } from '../../styles/typefaces';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ItemContext } from '../../context/ItemProvider';
import { QuoteSummaryModalContext } from '../../context/ModalProviders/QuoteSummaryModalProvider';

interface IPriceSummary extends React.HTMLAttributes<HTMLDivElement> {
  nextPagePath: string;
}

export default function PriceSummary({ nextPagePath, ...props }: IPriceSummary) {
  const { totalPrice } = useContext(ItemContext);
  const { setVisible: setQuoteSummaryModalVisible } = useContext(QuoteSummaryModalContext);
  const navigate = useNavigate();
  const handleNextButtonClick = () => {
    navigate(nextPagePath);
  };
  const handleSummaryButtonClick = () => {
    setQuoteSummaryModalVisible(true);
  };
  return (
    <SummaryWrapper {...props}>
      <InfoWrapper>
        <RoundButton type="price" onClick={handleSummaryButtonClick}>
          견적 요약
        </RoundButton>
        <TotalPriceText>
          현재 총 가격<HighLightText>{totalPrice.toLocaleString()} 원</HighLightText>
        </TotalPriceText>
      </InfoWrapper>
      <RectButton type="price" onClick={handleNextButtonClick}>
        다음
      </RectButton>
    </SummaryWrapper>
  );
}

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 114px;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const TotalPriceText = styled.span`
  ${BodyKrRegular4}
  color: ${({ theme }) => theme.color.gray700};
`;
const HighLightText = styled.span`
  ${HeadingKrMedium2}
  padding-left: 8px;
  color: ${({ theme }) => theme.color.primaryColor};
`;
