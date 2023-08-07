import { styled, useTheme } from 'styled-components';
import {
  BodyKrMedium3,
  BodyKrMedium4,
  BodyKrRegular3,
  HeadingKrMedium5,
} from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import DefaultCardStyle from '../../components/card/DefaultCardStyle';
import { HTMLAttributes, useState } from 'react';
import { flexCenterCss } from '../../utils/commonStyle';
import { ArrowLeft, ArrowRight } from '../../components/icons/Icons';
import PriceSummary from '../../components/summary/PriceSummary';

export default function ExteriorSelectContainer() {
  const [page, setPage] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState({ page: 0, idx: 0 });
  const theme = useTheme();

  const MAX_PAGE = 3;
  const NUM_IN_A_PAGE = 4;
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
  const handleSelectIdx = (idx: number) => {
    setSelectedIdx({ page, idx });
  };
  const isActive = (idx: number) => {
    return page === selectedIdx.page && idx === selectedIdx.idx;
  };

  const CardPageList = [];
  for (let i = 0; i < MAX_PAGE; i++) {
    const newCardPage = (
      <CardPage key={i}>
        {cardIndices.map((idx) => (
          <ExteriorCard
            key={idx}
            active={isActive(idx)}
            onClick={() => handleSelectIdx(idx)}
            color="black"
            desc="38%가 선택했어요"
            name="블랙"
            price="0"
          />
        ))}
      </CardPage>
    );
    CardPageList.push(newCardPage);
  }

  return (
    <Wrapper>
      <Header>
        <Title>외장 색상을 선택 해주세요</Title>
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

interface IExteriorCard extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  color: string;
  desc: string;
  name: string;
  price: string;
}

function ExteriorCard({ active, color, desc, name, price, ...props }: IExteriorCard) {
  return (
    <Card active={active} {...props}>
      <ColorWrapper>
        <ColorImg $color={color}></ColorImg>
      </ColorWrapper>
      <ColorInfo>
        <ColorDesc>{desc}</ColorDesc>
        <ColorName>{name}</ColorName>
        <ColorPrice>+ {price}원</ColorPrice>
      </ColorInfo>
    </Card>
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
  ${HeadingKrMedium5};
`;
const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 116px;
  ${BodyKrRegular3}
  color: ${({ theme }) => theme.color.gray500}
`;
const PageButton = styled.button``;
const Page = styled.span``;
const Card = styled(DefaultCardStyle)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
`;
const SelectSection = styled.div``;
const CardPage = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
`;
const ColorImg = styled.div<{ $color: string }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;
const ColorWrapper = styled.div`
  ${flexCenterCss}
  border-radius: 50%;
  width: 58px;
  height: 58px;
  border: 1px solid ${({ theme }) => theme.color.gray50};
  /* border: 1px solid ${({ theme }) => theme.color.primaryColor}; */
  margin-left: 12px;
`;

const ColorInfo = styled.div`
  margin-left: 14px;
`;
const ColorDesc = styled.div`
  ${BodyKrMedium4}
`;
const ColorName = styled.div`
  ${BodyKrMedium3}
  margin-bottom: 28px;
`;
const ColorPrice = styled.div`
  ${BodyKrMedium3}
`;
const Footer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: flex-end;
`;
