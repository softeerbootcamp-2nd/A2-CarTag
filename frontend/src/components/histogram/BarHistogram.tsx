import { styled } from 'styled-components';
import HmgTag from '../common/hmgTag/HmgTag';
import {
  BodyKrMedium2,
  BodyKrRegular3,
  HeadingKrMedium6,
  HeadingKrMedium7,
} from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import { useContext } from 'react';
import { SimilarQuoteModalContext } from '../../context/ModalProviders/SimilarQuoteModalProvider';
import Loading from '../loading/Loading';
import ErrorModal from '../modal/ErrorModal';
import useQuoteListData from '../../hooks/useQuoteList';
import { ItemContext } from '../../context/ItemProvider';

interface IQuote {
  historyId: number;
  soldCount: number;
  histories: [IQuote | null];
}

export default function BarHistogram() {
  const { selectedItem } = useContext(ItemContext);
  const { setVisible: setSimilarQuoteModalVisible } = useContext(SimilarQuoteModalContext);
  const {
    data: quoteListData,
    error: quoteListError,
    loading: quoteListLoading,
  } = useQuoteListData<IQuote | null>(selectedItem);

  const getMaxSoldCount = (quoteListData: IQuote) => {
    const soldCountList = [];
    soldCountList.push(quoteListData.soldCount);
    quoteListData.histories.forEach((quote) => {
      if (quote === null) return;
      soldCountList.push(quote.soldCount);
    });
    const max = Math.max(...soldCountList);
    return max;
  };

  const myQuoteSoldCount = quoteListData && quoteListData.soldCount;
  const myQuoteSoldPercent =
    myQuoteSoldCount && (myQuoteSoldCount / getMaxSoldCount(quoteListData)) * 100;

  const similarQuote = quoteListData?.histories.map((quote) => {
    if (quote === null) return;
    const { historyId, soldCount } = quote;
    const maxSoldCount = getMaxSoldCount(quoteListData);
    const percentage = (soldCount / maxSoldCount) * 100;

    return (
      <BarItem key={historyId}>
        <BarValue>{soldCount}대</BarValue>
        <Bar $height={`${percentage}%`}></Bar>
        <BarItemName>유사 견적</BarItemName>
      </BarItem>
    );
  });

  const hasSimilarQuote = !similarQuote?.every((quote) => quote === undefined);
  console.log('2');

  if (quoteListError) {
    return <ErrorModal message={quoteListError.message} />;
  }

  return (
    <HistogramWrapper>
      <HmgTag size="small" />
      <PaddingWrapper>
        <CaptionWrapper>
          <Caption>
            <BlueText>내 견적과 비슷한 실제 출고 견적</BlueText>
            들을 확인하고 비교해보세요.
          </Caption>
          <CaptionDesc>
            유사 출고 견적이란, 내 견적과 해시태그 유사도가 높은 다른 사람들의 실제 출고 견적이에요.
          </CaptionDesc>
        </CaptionWrapper>
        {quoteListLoading ? (
          <Loading />
        ) : (
          <BarChart>
            <BarItem $active={true}>
              <BarValue>{myQuoteSoldCount}대</BarValue>
              <Bar $height={`${myQuoteSoldPercent}%`} $active={true}></Bar>
              <BarItemName>내 견적</BarItemName>
            </BarItem>
            {hasSimilarQuote ? similarQuote : <Text>유사 견적이 없습니다.</Text>}
          </BarChart>
        )}
        <Button onClick={() => setSimilarQuoteModalVisible(true)}>유사 출고 견적 확인하기</Button>
      </PaddingWrapper>
    </HistogramWrapper>
  );
}

const BarChart = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 140px;
`;
const BarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme, $active }) => ($active ? theme.color.activeBlue : theme.color.gray300)};
`;
const BarValue = styled.div`
  ${BodyKrRegular3}
`;
const BarItemName = styled.div`
  ${HeadingKrMedium7}
`;
const CaptionWrapper = styled.div`
  ${BodyKrMedium2}
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  margin-bottom: 20px;
`;
const Caption = styled.div`
  width: 200px;
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue};
`;

const HistogramWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
  margin-top: 38px;
`;

const PaddingWrapper = styled.div`
  padding: 21px 16px;
`;

const CaptionDesc = styled.p`
  width: 280px;
  ${BodyKrRegular3}
  margin-top: 10px;

  color: ${({ theme }) => theme.color.gray500};
`;

const Bar = styled.div<{ $height: string; $active?: boolean }>`
  width: 14px;
  height: ${({ $height }) => $height};
  background-color: ${({ theme, $active }) =>
    $active ? theme.color.activeBlue : theme.color.gray200};
`;

const Button = styled.button`
  ${flexCenterCss};
  ${HeadingKrMedium6};
  background: ${({ theme }) => theme.color.skyBlueCardBg};
  border-radius: 2px;
  color: ${({ theme }) => theme.color.primaryColor};
  width: 100%;
  height: 52px;
  margin-top: 10px;
`;
const Text = styled.span`
  ${flexCenterCss}
  height: 100%;

  ${BodyKrRegular3}
`;
