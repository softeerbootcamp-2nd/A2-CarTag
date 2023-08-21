import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import InnerColorCard from '../../components/cards/InnerColorCard';
import CardSlider from '../../components/cardSlider/CardSlider';
import { NUM_IN_A_PAGE } from '../../utils/constants';
import { IInnerColor, InnerColorContext } from '../../context/InnerColorProvider';
import { IMG_URL } from '../../utils/apis';
import { ItemContext } from '../../context/ItemProvider';

export default function InnerColorSelectContainer() {
  const { data: innerColorData } = useContext(InnerColorContext);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const [cardPageList, setCardPageList] = useState<ReactNode[]>();
  const maxPage = innerColorData ? Math.floor(innerColorData.length / NUM_IN_A_PAGE) + 1 : 0;

  const handleCardClick = useCallback(
    (selectedItem: IInnerColor) => {
      setSelectedItem({
        type: 'SET_INNER_COLOR',
        value: {
          id: selectedItem.colorId,
          title: '내장 색상',
          name: selectedItem.colorName,
          price: selectedItem.colorPrice,
          imgSrc: selectedItem.colorImage,
          carImgSrc: selectedItem.colorCarImage,
        },
      });
    },
    [setSelectedItem]
  );
  const isActive = useCallback(
    (id: number) => {
      return selectedItem.innerColor.id === id;
    },

    [selectedItem]
  );

  const createCardList = useCallback(() => {
    if (!innerColorData) return;

    const cardPageList = [];
    for (let i = 0; i < maxPage; i++) {
      const pageIdx = i;
      const newCards = [];
      for (let j = 0; j < NUM_IN_A_PAGE; j++) {
        const cardIdx = j;
        const colorIdx = pageIdx * NUM_IN_A_PAGE + cardIdx;
        if (colorIdx >= innerColorData.length) break;
        const targetColor = innerColorData[colorIdx];
        const newCard = (
          <InnerColorCard
            key={cardIdx}
            imgSrc={`${IMG_URL}${targetColor.colorImage}`}
            active={isActive(targetColor.colorId)}
            onClick={() => handleCardClick(targetColor)}
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
  }, [innerColorData, maxPage, isActive, handleCardClick]);

  useEffect(createCardList, [createCardList]);

  return (
    <Wrapper>
      <CardSlider title="내장 색상을 선택해주세요." cardList={cardPageList} maxPage={maxPage} />
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
  transition: all 1s;
`;
