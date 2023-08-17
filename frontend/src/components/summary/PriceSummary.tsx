import { styled } from 'styled-components';
import RectButton from '../common/buttons/RectButton';
import RoundButton from '../common/buttons/RoundButton';
import { BodyKrRegular4, HeadingKrMedium2 } from '../../styles/typefaces';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ItemContext } from '../../context/ItemProvider';
import { ModelTypeContext } from '../../context/ModelTypeProvider';

interface IPriceSummary extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  nextPagePath: string;
}

export default function PriceSummary({ price, nextPagePath, ...props }: IPriceSummary) {
  const { selectedModelType } = useContext(ModelTypeContext);
  const { totalPrice, setTotalPrice, setSelectedItem } = useContext(ItemContext);
  const navigate = useNavigate();
  const handleButtonClick = (price: number) => {
    navigate(nextPagePath);
    setTotalPrice(price);
    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: selectedModelType['powerTrain'],
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: selectedModelType['operation'],
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: selectedModelType['bodyType'],
    });
  };
  return (
    <SummaryWrapper {...props}>
      <InfoWrapper>
        <RoundButton type="price">견적 요약</RoundButton>
        <TotalPriceText>
          현재 총 가격<HighLightText>{(totalPrice + price).toLocaleString()} 원</HighLightText>
        </TotalPriceText>
      </InfoWrapper>
      <RectButton type="price" onClick={() => handleButtonClick(totalPrice + price)}>
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
