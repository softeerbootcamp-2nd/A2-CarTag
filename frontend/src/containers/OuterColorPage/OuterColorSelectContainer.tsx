import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PriceSummary from '../../components/summary/PriceSummary';
import OuterColorCard from '../../components/cards/OuterColorCard';
import CardSlider from '../../components/cardSlider/CardSlider';
import { NUM_IN_A_PAGE, PATH } from '../../utils/constants';
import { IOuterColor, ISelected, OuterColorContext } from '../../context/OuterColorProvider';
import { ItemContext } from '../../context/ItemProvider';

export default function OuterColorSelectContainer() {
  const {
    data: outerColorData,
    selectedIdx,
    setSelectedIdx,
    setSelectedColorId,
  } = useContext(OuterColorContext);
  const [cardPageList, setCardPageList] = useState<ReactNode[]>();
  const { totalPrice, setSelectedItem, setTotalPrice } = useContext(ItemContext);
  const prevTotalPrice = useRef(totalPrice);
  const maxPage = outerColorData ? Math.floor(outerColorData.length / NUM_IN_A_PAGE) + 1 : 0;

  const handleCardClick = useCallback(
    ({ selectedItem, page, idx }: { selectedItem: IOuterColor; page: number; idx: number }) => {
      setSelectedIdx({ page, idx });
      setSelectedColorId(selectedItem.colorId);
      setTotalPrice(prevTotalPrice.current + selectedItem.colorPrice);
      setSelectedItem({
        type: 'SET_OUTER_COLOR',
        value: {
          id: selectedItem.colorId,
          name: selectedItem.colorName,
          imgSrc: selectedItem.colorImage,
          price: selectedItem.colorPrice,
          title: '외장 색상',
        },
      });
    },

    [setSelectedIdx, setSelectedColorId, setTotalPrice, setSelectedItem]
  );
  const isActive = useCallback(
    ({ page, idx }: ISelected) => {
      return page === selectedIdx.page && idx === selectedIdx.idx;
    },
    [selectedIdx]
  );

  const createCardList = useCallback(() => {
    if (!outerColorData) return;

    const cardPageList = [];
    for (let i = 0; i < maxPage; i++) {
      const pageIdx = i;
      const newCards = [];
      for (let j = 0; j < NUM_IN_A_PAGE; j++) {
        const cardIdx = j;
        const colorIdx = pageIdx * NUM_IN_A_PAGE + cardIdx;
        if (colorIdx >= outerColorData.length) break;
        const targetColor = outerColorData[colorIdx];
        const newCard = (
          <OuterColorCard
            key={cardIdx}
            active={isActive({ page: pageIdx, idx: cardIdx })}
            onClick={() =>
              handleCardClick({ selectedItem: targetColor, page: pageIdx, idx: cardIdx })
            }
            color={targetColor.colorImage}
            desc={targetColor.colorBoughtPercent.toString()}
            name={targetColor.colorName}
            price={targetColor.colorPrice}
          />
        );
        newCards.push(newCard);
      }
      const cardPage = <CardPage>{newCards}</CardPage>;
      cardPageList.push(cardPage);
    }
    setCardPageList(cardPageList);
  }, [outerColorData, maxPage, isActive, handleCardClick]);

  useEffect(createCardList, [createCardList]);

  return (
    <Wrapper>
      <CardSlider title="외장 색상을 선택해주세요." cardList={cardPageList} maxPage={maxPage} />
      <Footer>
        <PriceSummary nextPagePath={PATH.innerColor} />
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)`
  display: flex;
  flex-direction: column;
`;

const CardPage = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;
const Footer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: flex-end;
`;
