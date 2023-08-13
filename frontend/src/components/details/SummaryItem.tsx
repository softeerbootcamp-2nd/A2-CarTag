import { styled } from 'styled-components';
import { BodyKrRegular3 } from '../../styles/typefaces';

export interface ISummaryItem {
  imgSrc: string;
  itemName: string;
  selectedName: string;
  price: number;
}

export default function SummaryItem({ imgSrc, itemName, selectedName, price }: ISummaryItem) {
  return (
    <Item>
      <Img src={imgSrc} alt="" />
      <InfoWrapper>
        <LeftInfo>
          <ItemName>{itemName}</ItemName>
          <SelectedName>{selectedName}</SelectedName>
        </LeftInfo>
        <RightInfo>
          <ModifyButton>수정하기</ModifyButton>
          <Price>+ {price}원</Price>
        </RightInfo>
      </InfoWrapper>
    </Item>
  );
}

const Item = styled.li`
  display: flex;
  padding: 8px 0;
  height: 71px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
`;
const Img = styled.img`
  width: 77px;
  height: 55px;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 16px;
  width: 100%;
  height: 100%;
  ${BodyKrRegular3}
`;
const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
`;

const Price = styled.div``;
const ItemName = styled.div`
  color: ${({ theme }) => theme.color.gray500};
`;
const ModifyButton = styled.button`
  color: ${({ theme }) => theme.color.primaryColor};
`;
const SelectedName = styled.div``;
