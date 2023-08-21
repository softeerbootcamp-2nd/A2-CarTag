import { styled } from 'styled-components';
import CenterWrapper from '../components/layout/CenterWrapper';
import DetailContainer from '../containers/ResultPage/DetailContainer';
import QuoteSummaryContainer from '../containers/ResultPage/QuoteSummaryContainer';
import ResultBannerContainer from '../containers/ResultPage/ResultBannerContainer';
import HistogramContainer from '../containers/ResultPage/HistogramContainer';
import ResultFooterContainer from '../containers/ResultPage/ResultFooterContainer';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function ResultPage() {
  const resultRef = useRef<HTMLDivElement>(null);

  const getPageStyles = () => {
    return `@page {margin:40px; !important }`;
  };

  const handlePrint = useReactToPrint({
    content: () => resultRef.current,
    documentTitle: Math.random().toString(36).substring(2, 12),
  });
  return (
    <>
      <Wrapper ref={resultRef}>
        <style>{getPageStyles()}</style>
        <ResultBannerContainer />
        <QuoteSummaryContainer />
        <Row>
          <DetailContainer />
          <HistogramContainer />
        </Row>
      </Wrapper>
      <ResultFooterContainer handlePrint={handlePrint} />
    </>
  );
}

const Wrapper = styled.div``;
const Row = styled(CenterWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 300px;
  gap: 70px;
`;
