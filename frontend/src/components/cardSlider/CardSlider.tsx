import { styled, useTheme } from 'styled-components';
import { BodyKrRegular3, HeadingKrMedium6 } from '../../styles/typefaces';
import CenterWrapper from '../common/layout/CenterWrapper';
import { ArrowLeft, ArrowRight } from '../../components/common/icons/Icons';
import { ReactNode, useState } from 'react';
import Loading from '../loading/Loading';

interface ICardSlider {
  title: string;
  cardList?: ReactNode[];
  maxPage: number;
}
export default function CardSlider({ title, cardList, maxPage }: ICardSlider) {
  const [page, setPage] = useState(0);
  const theme = useTheme();

  const arrowLeftColor = page <= 0 ? theme.color.gray200 : theme.color.gray600;
  const arrowRightColor = page >= maxPage - 1 ? theme.color.gray200 : theme.color.gray600;

  const handlePageNext = () => {
    setPage((cur) => {
      const nextPage = cur + 1 >= maxPage ? cur : cur + 1;
      return nextPage;
    });
  };
  const handlePagePrev = () => {
    setPage((cur) => {
      const prevPage = cur - 1 < 0 ? cur : cur - 1;
      return prevPage;
    });
  };

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <PageButtonWrapper>
          {maxPage > 1 && (
            <>
              <PageButton aria-label="prev-page-btn" onClick={handlePagePrev}>
                <ArrowLeft fill={arrowLeftColor} />
              </PageButton>
              <Page>
                {page + 1}/{maxPage}
              </Page>
              <PageButton aria-label="next-page-btn" onClick={handlePageNext}>
                <ArrowRight fill={arrowRightColor} />
              </PageButton>
            </>
          )}
        </PageButtonWrapper>
      </Header>
      <SelectSection>{cardList ? cardList[page] : <Loading />}</SelectSection>
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
