import { styled } from 'styled-components';
import CenterWrapper from '../components/layout/CenterWrapper';
import DetailContainer from '../containers/ResultPage/DetailContainer';
import QuoteSummaryContainer from '../containers/ResultPage/QuoteSummaryContainer';
import ResultBannerContainer from '../containers/ResultPage/ResultBannerContainer';
import HistogramContainer from '../containers/ResultPage/HistogramContainer';
import ResultFooterContainer from '../containers/ResultPage/ResultFooterContainer';

export default function ResultPage() {
  return (
    <>
      <ResultBannerContainer />
      <QuoteSummaryContainer />
      <Row>
        <DetailContainer />
        <HistogramContainer />
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
