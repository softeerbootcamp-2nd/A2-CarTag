import { styled } from 'styled-components';
import HmgTag from '../common/hmgTag/HmgTag';
import {
  BodyKrMedium2,
  BodyKrRegular3,
  HeadingKrMedium6,
  HeadingKrMedium7,
} from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import { useContext, useEffect } from 'react';
import { SimilarQuoteModalContext } from '../../context/ModalProviders/SimilarQuoteModalProvider';
import Loading from '../loading/Loading';
import useQuoteListData from '../../hooks/useQuoteList';
import { ItemContext } from '../../context/ItemProvider';

interface IQuote {
  historyId: number;
  soldCount: number;
  histories: [IQuote | null];
}

export default function BarHistogram() {
  const { setVisible: setSimilarQuoteModalVisible, setSimilarQuoteIdList } =
    useContext(SimilarQuoteModalContext);
  const { selectedItem } = useContext(ItemContext);
  const { data: quoteListData, loading: quoteListLoading } = useQuoteListData<IQuote | null>(
    selectedItem
  );
  const handleSimliarQuoteModal = () => {
    setSimilarQuoteModalVisible(true);
  };

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
        <Bar $height={`${percentage}%`}>
          <BarValue>{soldCount.toLocaleString()}대</BarValue>
          <BarItemName>유사견적</BarItemName>
        </Bar>
      </BarItem>
    );
  });

  const hasSimilarQuote = !similarQuote?.every((quote) => quote === undefined);

  useEffect(() => {
    if (!quoteListData || quoteListLoading) return;
    const myQuoteId = quoteListData.historyId;
    const historyIds: number[] = [];
    quoteListData.histories.forEach((history) => {
      if (!history) return;
      historyIds.push(history.historyId);
    });
    setSimilarQuoteIdList({
      quoteId: myQuoteId,
      historyIds,
    });
  }, [quoteListData, setSimilarQuoteIdList, quoteListLoading]);

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
            유사 출고 견적이란, 판매량 및 내 견적과 선택 옵션 유사도가 높은 다른 사람들의 실제 출고
            견적이에요.
          </CaptionDesc>
        </CaptionWrapper>
        {quoteListLoading || !hasSimilarQuote || !quoteListData ? (
          <Loading />
        ) : (
          <BarChart>
            <BarItem $active={true}>
              <Bar $height={`${myQuoteSoldPercent}%`} $active={true}>
                <BarValue>{myQuoteSoldCount}대</BarValue>
                <BarItemName>내 견적</BarItemName>
              </Bar>
            </BarItem>
            {similarQuote}
          </BarChart>
        )}
        <Button onClick={handleSimliarQuoteModal}>유사 출고 견적 확인하기</Button>
      </PaddingWrapper>
    </HistogramWrapper>
  );
}

const BarChart = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 140px;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const BarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: flex-end;
  color: ${({ theme, $active }) => ($active ? theme.color.activeBlue : theme.color.gray300)};
  height: 80%;
`;
const BarValue = styled.div`
  ${BodyKrRegular3}
  position: absolute;
  top: -22px;
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
`;
const BarItemName = styled.div`
  ${HeadingKrMedium7}
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;
const CaptionWrapper = styled.div`
  ${BodyKrMedium2}
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  margin-bottom: 20px;
`;
const Caption = styled.div`
  word-break: keep-all;
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
  position: relative;
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
