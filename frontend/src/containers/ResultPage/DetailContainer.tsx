import { styled } from 'styled-components';
import { HeadingKrMedium7 } from '../../styles/typefaces';
import Details from '../../components/details/Details';
import SummaryItem from '../../components/details/SummaryItem';

export default function DetailContainer() {
  return (
    <Wrapper>
      <Title>상세 견적</Title>
      <Details title="모델 선택">
        <ItemList>
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
        </ItemList>
      </Details>
      <Details title="색상">
        <ItemList>
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
        </ItemList>
      </Details>
      <Details title="추가 옵션">
        <ItemList>
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
          <SummaryItem
            imgSrc="images/result1.png"
            itemName="파워트레인"
            selectedName="디젤 2.2"
            price={100}
          />
        </ItemList>
      </Details>
      <Details title="탁송" />
      <Details title="할인 및 포인트" />
      <Details title="결제 수단" />
      <Details title="면세 구분 및 등록비" />
      <Details title="안내사항" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 607px;
  padding-top: 20px;
`;
const Title = styled.div`
  ${HeadingKrMedium7}
`;

const ItemList = styled.ul`
  :last-child {
    border-bottom: none;
  }
`;
