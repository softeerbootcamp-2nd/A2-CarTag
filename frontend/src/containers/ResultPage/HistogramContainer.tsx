import { styled } from 'styled-components';
import CurveHistogram from '../../components/histogram/CurveHistogram';
import BarHistogram from '../../components/histogram/BarHistogram';

export default function HistogramContainer() {
  return (
    <Wrapper>
      <CurveHistogram />
      <BarHistogram />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
