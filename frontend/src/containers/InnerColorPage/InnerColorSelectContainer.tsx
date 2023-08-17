import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PriceSummary from '../../components/summary/PriceSummary';
import InnerColorCard from '../../components/cards/InnerColorCard';
import CardSlider from '../../components/cardSlider/CardSlider';
import { NUM_IN_A_PAGE, PATH } from '../../utils/constants';
import { InnerColorContext } from '../../context/InnerColorProvider';
import { IMG_URL } from '../../utils/apis';

interface ISelected {
  page: number;
  idx: number;
}

export default function InnerColorSelectContainer() {
  const { data: innerColorData, selectedIdx, setSelectedIdx } = useContext(InnerColorContext);
  const [cardPageList, setCardPageList] = useState<ReactNode[]>();
  const maxPage = innerColorData ? Math.floor(innerColorData.length / NUM_IN_A_PAGE) + 1 : 0;

  const handleSelectedIdx = useCallback(
    ({ page, idx }: ISelected) => {
      setSelectedIdx({ page, idx });
    },
    [setSelectedIdx]
  );
  const isActive = useCallback(
    ({ page, idx }: ISelected) => {
      return page === selectedIdx.page && idx === selectedIdx.idx;
    },
    [selectedIdx]
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
            active={isActive({ page: pageIdx, idx: cardIdx })}
            onClick={() => handleSelectedIdx({ page: pageIdx, idx: cardIdx })}
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
  }, [innerColorData, maxPage, isActive, handleSelectedIdx]);

  useEffect(createCardList, [createCardList]);

  return (
    <Wrapper>
      <CardSlider title="내장 색상을 선택해주세요." cardList={cardPageList} maxPage={0} />
      <Footer>
        <PriceSummary nextPagePath={PATH.option} />
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
  transition: all 1s;
`;
const Footer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: flex-end;
`;
