import { styled, useTheme } from 'styled-components';
import { BodyKrRegular3, HeadingKrMedium6 } from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { ArrowLeft, ArrowRight } from '../../components/common/icons/Icons';
import PriceSummary from '../../components/summary/PriceSummary';
import { useState } from 'react';
import InteriorCard from '../../components/cards/InteriorCard';
import { MAX_PAGE, NUM_IN_A_PAGE } from '../../utils/constants';

interface ISelected {
  page: number;
  idx: number;
}
export default function InteriorSelectContainer() {
  const [page, setPage] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<ISelected>({ page: 0, idx: 0 });
  const theme = useTheme();

  const cardIndices = Array.from({ length: NUM_IN_A_PAGE }, (_, index) => index + 1);
  const arrowLeftColor = page <= 0 ? theme.color.gray200 : theme.color.gray600;
  const arrowRightColor = page >= MAX_PAGE - 1 ? theme.color.gray200 : theme.color.gray600;

  const handlePageNext = () => {
    setPage((cur) => {
      const nextPage = cur + 1 >= MAX_PAGE ? cur : cur + 1;
      return nextPage;
    });
  };
  const handlePagePrev = () => {
    setPage((cur) => {
      const prevPage = cur - 1 < 0 ? cur : cur - 1;
      return prevPage;
    });
  };
  const handleSelectedIdx = ({ page, idx }: ISelected) => {
    setSelectedIdx({ page, idx });
  };
  const isActive = ({ page, idx }: ISelected) => {
    return page === selectedIdx.page && idx === selectedIdx.idx;
  };

  const CardPageList = [];
  for (let i = 0; i < MAX_PAGE; i++) {
    const newCardPage = (
      <CardPage key={i}>
        {cardIndices.map((idx) => (
          <InteriorCard
            key={idx}
            imgSrc1={'images/inner_color1.png'}
            imgSrc2={'images/inner_color2.png'}
            active={isActive({ page: i, idx })}
            onClick={() => handleSelectedIdx({ page: i, idx })}
            desc="38%가 선택했어요"
            name="블랙"
            price={0}
          />
        ))}
      </CardPage>
    );
    CardPageList.push(newCardPage);
  }

  return (
    <Wrapper>
      <Header>
        <Title>내장 색상을 선택 해주세요</Title>
        <PageButtonWrapper>
          <PageButton onClick={handlePagePrev}>
            <ArrowLeft fill={arrowLeftColor} />
          </PageButton>
          <Page>
            {page + 1}/{MAX_PAGE}
          </Page>
          <PageButton onClick={handlePageNext}>
            <ArrowRight fill={arrowRightColor} />
          </PageButton>
        </PageButtonWrapper>
      </Header>
      <SelectSection>{CardPageList[page]}</SelectSection>
      <Footer>
        <PriceSummary />
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  ${HeadingKrMedium6};
`;
const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 116px;
  ${BodyKrRegular3};
  color: ${({ theme }) => theme.color.gray500};
`;
const PageButton = styled.button``;
const Page = styled.span``;

const SelectSection = styled.div`
  transition: all 1s;
`;
const CardPage = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
  transition: all 1s;
`;
const Footer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: flex-end;
`;
