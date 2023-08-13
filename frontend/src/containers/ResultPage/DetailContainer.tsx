import { css, styled } from 'styled-components';
import { HeadingKrMedium7 } from '../../styles/typefaces';
import Details from '../../components/details/Details';
import SummaryItem from '../../components/details/SummaryItem';
import { useState } from 'react';

export default function DetailContainer() {
  const [isOpen, setIsOepn] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  const setOpenedIdx = (idx: number) => {
    setIsOepn((cur) => {
      const copy = { ...cur };
      copy[idx] = !cur[idx];
      return copy;
    });
  };

  return (
    <Wrapper>
      <Title>상세 견적</Title>
      <Details title="모델 선택" open={isOpen[1]} onClick={() => setOpenedIdx(1)}>
        <ItemList $open={isOpen[1]}>
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
      <Details title="색상" open={isOpen[2]} onClick={() => setOpenedIdx(2)}>
        <ItemList $open={isOpen[2]}>
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
      <Details title="추가 옵션" open={isOpen[3]} onClick={() => setOpenedIdx(3)}>
        <ItemList $open={isOpen[3]}>
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
      <Details title="탁송" open={isOpen[4]} onClick={() => setOpenedIdx(4)}>
        <ItemList $open={isOpen[4]}>
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
      <Details title="할인 및 포인트" open={isOpen[5]} onClick={() => setOpenedIdx(5)}>
        <ItemList $open={isOpen[5]}>
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
      <Details title="결제 수단" open={isOpen[6]} onClick={() => setOpenedIdx(6)}>
        <ItemList $open={isOpen[6]}>
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
      <Details title="면세 구분 및 등록비" open={isOpen[7]} onClick={() => setOpenedIdx(7)}>
        <ItemList $open={isOpen[7]}>
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
      <Details title="안내사항" open={isOpen[8]} onClick={() => setOpenedIdx(8)}>
        <ItemList $open={isOpen[8]}>
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

const ItemList = styled.ul<{ $open: boolean }>`
  :last-child {
    border-bottom: none;
  }

  ${({ $open }) =>
    $open
      ? css`
          max-height: 500px;
        `
      : css`
          max-height: 0px;
        `}

  transition: all 0.3s ease;
`;
