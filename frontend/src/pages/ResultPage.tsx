import { styled } from 'styled-components';
import CenterWrapper from '../components/layout/CenterWrapper';
import DetailContainer from '../containers/ResultPage/DetailContainer';
import QuoteSummaryContainer from '../containers/ResultPage/QuoteSummaryContainer';
import ResultBannerContainer from '../containers/ResultPage/ResultBannerContainer';
import HistogramContainer from '../containers/ResultPage/HistogramContainer';
import ResultFooterContainer from '../containers/ResultPage/ResultFooterContainer';
import SimilarQuote from '../components/modal/SimilarQuote';
import { useState } from 'react';

export default function ResultPage() {
  const [displayDimmed, setDisplayDimmed] = useState(false);

  const handleCloseModalClick = () => {
    setDisplayDimmed(false);
  };
  return (
    <>
      <SimilarQuote
        displayDimmed={displayDimmed}
        setDisplayDimmed={setDisplayDimmed}
        onClick={handleCloseModalClick}
      />
      <ResultBannerContainer />
      <QuoteSummaryContainer />
      <Row>
        <DetailContainer />
        <HistogramContainer setDisplayDimmed={setDisplayDimmed} />
      </Row>
      <ResultFooterContainer />
    </>
  );
}

const Row = styled(CenterWrapper)`
  display: flex;
  flex-direction: row;
  min-height: 300px;
  gap: 70px;
`;
