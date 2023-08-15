import { ReactNode, useState } from 'react';
import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PriceSummary from '../../components/summary/PriceSummary';
import ExteriorCard from '../../components/cards/ExteriorCard';
import CardSlider from '../../components/cardSlider/CardSlider';
import { MAX_PAGE, NUM_IN_A_PAGE, PATH } from '../../utils/constants';

interface ISelected {
  page: number;
  idx: number;
}

export default function ExteriorSelectContainer() {
  const [selectedIdx, setSelectedIdx] = useState<ISelected>({ page: 0, idx: 0 });
  const cardIndices = Array.from({ length: NUM_IN_A_PAGE }, (_, index) => index + 1);

  const handleSelectedIdx = ({ page, idx }: ISelected) => {
    setSelectedIdx({ page, idx });
  };
  const isActive = ({ page, idx }: ISelected) => {
    return page === selectedIdx.page && idx === selectedIdx.idx;
  };

  const CardPageList: ReactNode[] = [];
  for (let i = 0; i < MAX_PAGE; i++) {
    const newCardPage = (
      <CardPage key={i}>
        {cardIndices.map((idx) => (
          <ExteriorCard
            key={idx}
            active={isActive({ page: i, idx })}
            onClick={() => handleSelectedIdx({ page: i, idx })}
            color="black"
            desc="38%가 선택했어요"
            name={`블랙_${i}_${idx}`}
            price={0}
          />
        ))}
      </CardPage>
    );
    CardPageList.push(newCardPage);
  }

  return (
    <Wrapper>
      <CardSlider title="외장 색상을 선택해주세요." cardList={CardPageList} />
      <Footer>
        <PriceSummary nextPagePath={PATH.interior} />
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
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
`;
const Footer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: flex-end;
`;
