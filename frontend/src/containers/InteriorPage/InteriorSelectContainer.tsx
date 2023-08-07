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
import { ArrowLeft, ArrowRight, CheckIcon } from '../../components/icons/Icons';
import PriceSummary from '../../components/summary/PriceSummary';

const MAX_PAGE = 3;
const NUM_IN_A_PAGE = 4;

interface IIneTeriorCard extends HTMLAttributes<HTMLDivElement> {
  imgSrc1: string;
  imgSrc2: string;
  active: boolean;
  desc: string;
  name: string;
  price: string;
}

export default function InteriorSelectContainer() {
  const [page, setPage] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState({ page: 0, idx: 0 });
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
  const handleSelectedIdx = (idx: number) => {
    setSelectedIdx({ page, idx });
  };
  const isActive = (idx: number) => {
    return page === selectedIdx.page && idx === selectedIdx.idx;
  };

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
      <SelectSection>
        <CardPage key={page}>
          {cardIndices.map((idx) => (
            <InteriorCard
              key={idx}
              imgSrc1={'images/inner_color1.png'}
              imgSrc2={'images/inner_color2.png'}
              active={isActive(idx)}
              onClick={() => handleSelectedIdx(idx)}
              desc="38%가 선택했어요"
              name="블랙"
              price="0"
            />
          ))}
        </CardPage>
      </SelectSection>
      <Footer>
        <PriceSummary />
      </Footer>
    </Wrapper>
  );
}

function InteriorCard({ imgSrc1, imgSrc2, active, desc, name, price, ...props }: IIneTeriorCard) {
  return (
    <Card active={active} {...props}>
      <ImgWrapper>
        <InteriorImg src={imgSrc1}></InteriorImg>
        <InteriorImg src={imgSrc2}></InteriorImg>
      </ImgWrapper>
      <DescWrapper>
        <ColorInfo>
          <ColorDesc>{desc}</ColorDesc>
          <ColorName>{name}</ColorName>
          <Row>
            <ColorPrice>+ {price}원</ColorPrice>
            <CheckIcon active={active} />
          </Row>
        </ColorInfo>
      </DescWrapper>
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
  ${BodyKrRegular3};
  color: ${({ theme }) => theme.color.gray500};
`;
const PageButton = styled.button``;
const Page = styled.span``;
const Card = styled(DefaultCardStyle)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  overflow: hidden;
`;
const SelectSection = styled.div``;
const CardPage = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
`;
const InteriorImg = styled.img``;
const ImgWrapper = styled.div`
  ${flexCenterCss}
  flex-direction: column;
  width: 69px;
`;

const ColorInfo = styled.div``;
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

const DescWrapper = styled.div`
  padding: 14px 16px 14px 16px;
  width: 100%;
  height: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
