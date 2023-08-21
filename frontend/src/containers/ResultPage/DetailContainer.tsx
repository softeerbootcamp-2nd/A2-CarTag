import { styled } from 'styled-components';
import { HeadingKrMedium7 } from '../../styles/typefaces';
import Details from '../../components/details/Details';
import SummaryItem from '../../components/details/SummaryItem';
import { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context/ItemProvider';
import DetailsItemList from '../../components/details/DetailsItemList';

export default function DetailContainer() {
  const { selectedItem } = useContext(ItemContext);
  const [partialPrice, setPartialPrice] = useState({
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

    setPartialPrice({
      modelTypePrice,
      colorPrice,
      optionPrice,
    });
  }, [selectedItem]);

  const modelTypeItems = Object.values(selectedItem.modelType).map((value, idx) => (
    <SummaryItem
      key={idx}
      imgSrc={value.imgSrc}
      itemName={value.title}
      selectedName={value.name}
      price={value.price}
    />
  ));
  const colorSummaryItems = [selectedItem.innerColor, selectedItem.outerColor].map((color, idx) => (
    <SummaryItem
      key={idx}
      imgSrc={color.imgSrc}
      itemName={color.title}
      selectedName={color.name}
      price={color.price}
    />
  ));
  const optionSummaryItems = selectedItem.options.map((option, idx) => (
    <SummaryItem
      key={idx}
      imgSrc={option.imgSrc}
      itemName={option.title}
      selectedName={option.name}
      price={option.price}
    />
  ));

  return (
    <Wrapper>
      <Title>상세 견적</Title>
      <Details
        desc={`+${partialPrice.modelTypePrice.toLocaleString()} 원`}
        title="모델 선택"
        open={isOpen[0]}
        onClick={() => setOpenedIdx(0)}
      >
        <DetailsItemList open={isOpen[0]}>{modelTypeItems}</DetailsItemList>
      </Details>
      <Details
        desc={`+${partialPrice.colorPrice.toLocaleString()} 원`}
        title="색상"
        open={isOpen[1]}
        onClick={() => setOpenedIdx(1)}
      >
        <DetailsItemList open={isOpen[1]}>{colorSummaryItems}</DetailsItemList>
      </Details>
      <Details
        desc={`+${partialPrice.optionPrice.toLocaleString()} 원`}
        title="추가 옵션"
        open={isOpen[2]}
        onClick={() => setOpenedIdx(2)}
      >
        <DetailsItemList open={isOpen[2]}>{optionSummaryItems}</DetailsItemList>
      </Details>
      <Details desc="- 0원" title="탁송" open={isOpen[3]} onClick={() => setOpenedIdx(3)}></Details>
      <Details
        desc="-0 원"
        title="할인 및 포인트"
        open={isOpen[4]}
        onClick={() => setOpenedIdx(4)}
      />
      <Details
        desc="결제수단을 선택하고 지불조건 및 납입사항을 확인하세요."
        title="결제 수단"
        open={isOpen[5]}
        onClick={() => setOpenedIdx(5)}
      />
      <Details
        desc="할인/포인트 및 결제 방법 선택 후 확인 가능해요."
        title="면세 구분 및 등록비"
        open={isOpen[6]}
        onClick={() => setOpenedIdx(6)}
      />
      <Details desc="" title="안내사항" open={isOpen[7]} onClick={() => setOpenedIdx(7)} />
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
