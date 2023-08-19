import { styled } from 'styled-components';
import { HeadingKrMedium7 } from '../../styles/typefaces';
import Details from '../../components/details/Details';
import SummaryItem from '../../components/details/SummaryItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { ItemContext } from '../../context/ItemProvider';

export default function DetailContainer() {
  const { selectedItem } = useContext(ItemContext);
  const [detailPrice, setDetailPrice] = useState({
    modelTypePrice: 0,
    colorPrice: 0,
    optionPrice: 0,
  });
  const [isOpen, setIsOepn] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });
  const itemListRef0 = useRef<HTMLUListElement>(null);
  const itemListRef1 = useRef<HTMLUListElement>(null);
  const itemListRef2 = useRef<HTMLUListElement>(null);
  const [itemListHeight, setItemListHeight] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
  });

  console.log(itemListHeight);
  useEffect(() => {
    setItemListHeight({
      0: itemListRef0.current ? itemListRef0.current.getBoundingClientRect().height : 0,
      1: itemListRef1.current ? itemListRef1.current.getBoundingClientRect().height : 0,
      2: itemListRef2.current ? itemListRef2.current.getBoundingClientRect().height : 0,
    });
  }, []);
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

  const optionSummaryItems = selectedItem.options.map((option, idx) => {
    return (
      <SummaryItem
        key={idx}
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
        desc={`+ ${detailPrice.modelTypePrice.toLocaleString()} 원`}
        title="모델 선택"
        open={isOpen[0]}
        onClick={() => setOpenedIdx(0)}
      >
        <ItemList $open={isOpen[0]} $height={itemListHeight[0]} ref={itemListRef0}>
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
        desc={`+ ${detailPrice.colorPrice.toLocaleString()} 원`}
        title="색상"
        open={isOpen[1]}
        onClick={() => setOpenedIdx(1)}
      >
        <ItemList $open={isOpen[1]} $height={itemListHeight[1]} ref={itemListRef1}>
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
        desc={`+ ${detailPrice.optionPrice.toLocaleString()} 원`}
        title="추가 옵션"
        open={isOpen[2]}
        onClick={() => setOpenedIdx(2)}
      >
        <ItemList $open={isOpen[2]} $height={itemListHeight[2]} ref={itemListRef2}>
          {optionSummaryItems}
        </ItemList>
      </Details>
      <Details desc="- 0원" title="탁송" open={isOpen[3]} onClick={() => setOpenedIdx(3)}></Details>
      <Details
        desc="-0 원"
        title="할인 및 포인트"
        open={isOpen[4]}
        onClick={() => setOpenedIdx(4)}
      ></Details>
      <Details
        desc="결제수단을 선택하고 지불조건 및 납입사항을 확인하세요."
        title="결제 수단"
        open={isOpen[5]}
        onClick={() => setOpenedIdx(5)}
      ></Details>
      <Details
        desc="할인/포인트 및 결제 방법 선택 후 확인 가능해요."
        title="면세 구분 및 등록비"
        open={isOpen[6]}
        onClick={() => setOpenedIdx(6)}
      ></Details>
      <Details desc="" title="안내사항" open={isOpen[7]} onClick={() => setOpenedIdx(7)}></Details>
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

const ItemList = styled.ul<{ $open: boolean; $height?: number }>`
  :last-child {
    border-bottom: none;
  }

  transition: 0.3s ease;
  margin-top: ${({ $open, $height }) => ($open ? `-${$height}px` : '0px')};
  opacity: ${({ $open }) => ($open ? 0 : 1)};
`;
