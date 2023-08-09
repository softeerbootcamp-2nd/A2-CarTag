import { styled } from 'styled-components';
import { BarHistogram, CurveHistogram } from './Histogram';

export default function HistogramContainer() {
  return (
    <Wrapper>
      <CurveHistogram />
      <BarHistogram />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
