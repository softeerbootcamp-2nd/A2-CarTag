import { styled } from 'styled-components';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import { BodyKrMedium3, BodyKrRegular4, HeadingKrBold1 } from '../../styles/typefaces';
import { useContext } from 'react';
import { ItemContext } from '../../context/ItemProvider';

export default function QuoteSummaryContainer() {
  const { selectedItem } = useContext(ItemContext);

  return (
    <Wrapper>
      <FlexCenterWrapper>
        <Caption>합리적인 가격으로 완성된 나만의 팰리세이드가 탄생했어요!</Caption>
        <Info>
          <Item>
            <Title>모델</Title>
            <Desc>{selectedItem.trim.name}</Desc>
          </Item>
          <Item>
            <Title>배기량</Title>
            <Desc>{selectedItem.efficiency.displacement}</Desc>
          </Item>
          <Item>
            <Title>평균 연비</Title>
            <Desc>{selectedItem.efficiency.averageFuel}</Desc>
          </Item>
        </Info>
      </FlexCenterWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.skyBlueCardBg};
  height: 95px;
  padding: 40px;
`;

const FlexCenterWrapper = styled(CenterWrapper)`
  display: flex;
  align-items: center;

  justify-content: space-between;
`;

const Caption = styled.p`
  ${BodyKrMedium3}
  width: 179px;
  color: ${({ theme }) => theme.color.gray900};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
`;

const Item = styled.div``;
const Title = styled.div`
  ${BodyKrRegular4}
`;
const Desc = styled.div`
  ${HeadingKrBold1}
`;
