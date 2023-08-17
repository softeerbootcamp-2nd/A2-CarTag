import { styled } from 'styled-components';
import { HeadingKrMedium7 } from '../../styles/typefaces';
import Details from '../../components/details/Details';
import SummaryItem from '../../components/details/SummaryItem';
import { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context/ItemProvider';

export default function DetailContainer() {
  const { selectedItem } = useContext(ItemContext);
  const [detailPrice, setDetailPrice] = useState({
    modelTypePrice: 0,
    colorPrice: 0,
    optionPrice: 0,
  });
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

  useEffect(() => {
    const modelTypePrice =
      selectedItem.modelType.powerTrain.price +
      selectedItem.modelType.bodyType.price +
      selectedItem.modelType.operation.price;
    const colorPrice = selectedItem.innerColor.price + selectedItem.outerColor.price;
    const optionPrice = selectedItem.options.reduce((acc, option) => acc + option.price, 0);

    setDetailPrice({
      modelTypePrice,
      colorPrice,
      optionPrice,
    });
  }, [selectedItem]);

  const optionSummaryItems = selectedItem.options.map((option) => {
    return (
      <SummaryItem
        imgSrc={option.imgSrc}
        itemName={option.title}
        selectedName={option.name}
        price={option.price}
      />
    );
  });

  return (
    <Wrapper>
      <Title>상세 견적</Title>
      <Details
        price={detailPrice.modelTypePrice}
        title="모델 선택"
        open={isOpen[1]}
        onClick={() => setOpenedIdx(1)}
      >
        <ItemList $open={isOpen[1]}>
          <SummaryItem
            imgSrc={selectedItem.modelType.powerTrain.imgSrc}
            itemName={selectedItem.modelType.powerTrain.title}
            selectedName={selectedItem.modelType.powerTrain.name}
            price={selectedItem.modelType.powerTrain.price}
          />
          <SummaryItem
            imgSrc={selectedItem.modelType.bodyType.imgSrc}
            itemName={selectedItem.modelType.bodyType.title}
            selectedName={selectedItem.modelType.bodyType.name}
            price={selectedItem.modelType.bodyType.price}
          />
          <SummaryItem
            imgSrc={selectedItem.modelType.operation.imgSrc}
            itemName={selectedItem.modelType.operation.title}
            selectedName={selectedItem.modelType.operation.name}
            price={selectedItem.modelType.operation.price}
          />
        </ItemList>
      </Details>
      <Details
        price={detailPrice.colorPrice}
        title="색상"
        open={isOpen[2]}
        onClick={() => setOpenedIdx(2)}
      >
        <ItemList $open={isOpen[2]}>
          <SummaryItem
            imgSrc={selectedItem.innerColor.imgSrc}
            itemName={selectedItem.innerColor.title}
            selectedName={selectedItem.innerColor.name}
            price={selectedItem.innerColor.price}
          />
          <SummaryItem
            imgSrc={selectedItem.outerColor.imgSrc}
            itemName={selectedItem.outerColor.title}
            selectedName={selectedItem.outerColor.name}
            price={selectedItem.outerColor.price}
          />
        </ItemList>
      </Details>
      <Details
        price={detailPrice.optionPrice}
        title="추가 옵션"
        open={isOpen[3]}
        onClick={() => setOpenedIdx(3)}
      >
        <ItemList $open={isOpen[3]}>{optionSummaryItems}</ItemList>
      </Details>
      <Details price={0} title="탁송" open={isOpen[4]} onClick={() => setOpenedIdx(4)}></Details>
      <Details
        price={0}
        title="할인 및 포인트"
        open={isOpen[5]}
        onClick={() => setOpenedIdx(5)}
      ></Details>
      <Details
        price={0}
        title="결제 수단"
        open={isOpen[6]}
        onClick={() => setOpenedIdx(6)}
      ></Details>
      <Details
        price={0}
        title="면세 구분 및 등록비"
        open={isOpen[7]}
        onClick={() => setOpenedIdx(7)}
      ></Details>
      <Details
        price={0}
        title="안내사항"
        open={isOpen[8]}
        onClick={() => setOpenedIdx(8)}
      ></Details>
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

  max-height: ${({ $open }) => ($open ? '500px' : '0px')};
  transition: all 0.3s ease;
`;
