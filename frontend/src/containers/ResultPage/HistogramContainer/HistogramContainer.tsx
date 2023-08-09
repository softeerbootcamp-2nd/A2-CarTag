import { styled } from 'styled-components';
import { BarHistogram, CurveHistogram } from './Histograms';

export default function HistogramContainer() {
  return (
    <Wrapper>
      <CurveHistogram />
      <BarHistogram />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
// 4300, 0
// 4400, 10
// 4500, 20
// 4600, 5
// 4700, 0
