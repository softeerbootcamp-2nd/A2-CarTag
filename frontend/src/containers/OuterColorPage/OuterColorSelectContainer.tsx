import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PriceSummary from '../../components/summary/PriceSummary';
import OuterColorCard from '../../components/cards/OuterColorCard';
import CardSlider from '../../components/cardSlider/CardSlider';
import { NUM_IN_A_PAGE, PATH } from '../../utils/constants';
import { ISelected, OuterColorContext } from '../../context/OuterColorProvider';

export default function OuterColorSelectContainer() {
  const { data: outerColorData, selectedIdx, setSelectedIdx } = useContext(OuterColorContext);
  const cardIndices = Array.from({ length: NUM_IN_A_PAGE }, (_, index) => index);
  const [cardPageList, setCardPageList] = useState<ReactNode[]>();
  const maxPage = outerColorData ? Math.floor(outerColorData.length / NUM_IN_A_PAGE) + 1 : 0;

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
    if (!outerColorData) return;

    const cardPageList = [];
    for (let i = 0; i < maxPage; i++) {
      const pageIdx = i;
      const newCardPage = (
        <CardPage key={pageIdx}>
          {cardIndices.map((cardIdx) => {
            const colorIdx = pageIdx * NUM_IN_A_PAGE + cardIdx;
            if (colorIdx >= outerColorData.length) return;
            const targetColor = outerColorData[colorIdx];
            return (
              <OuterColorCard
                key={cardIdx}
                active={isActive({ page: pageIdx, idx: cardIdx })}
                onClick={() => handleSelectedIdx({ page: pageIdx, idx: cardIdx })}
                color={targetColor.colorImage}
                desc={targetColor.colorBoughtCount.toString()}
                name={targetColor.colorName}
                price={targetColor.colorPrice}
              />
            );
          })}
        </CardPage>
      );
      cardPageList.push(newCardPage);
      setCardPageList(cardPageList);
    }
  }, [outerColorData, isActive, cardIndices, handleSelectedIdx, maxPage]);

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
  justify-content: flex-start;
  gap: 16px;
  margin-top: 12px;
`;
const Footer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: flex-end;
`;
