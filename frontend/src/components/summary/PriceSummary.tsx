import { styled } from 'styled-components';
import RectButton from '../common/buttons/RectButton';
import RoundButton from '../common/buttons/RoundButton';
import { BodyKrRegular4, HeadingKrMedium2 } from '../../styles/typefaces';

interface IPriceSummary extends React.HTMLAttributes<HTMLDivElement> {}

export default function PriceSummary({ ...props }: IPriceSummary) {
  const total = 43_560_000;
  return (
    <SummaryWrapper {...props}>
      <InfoWrapper>
        <RoundButton type="price">견적 요약</RoundButton>
        <TotalPriceText>
          현재 총 가격<HighLightText>{total.toLocaleString()} 원</HighLightText>
        </TotalPriceText>
      </InfoWrapper>
      <RectButton type="price">다음</RectButton>
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
