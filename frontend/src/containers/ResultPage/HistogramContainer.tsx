import { styled } from 'styled-components';
import CurveHistogram from '../../components/histogram/CurveHistogram';
import BarHistogram from '../../components/histogram/BarHistogram';
import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

interface ISimilarQuote extends HTMLAttributes<HTMLDivElement> {
  setDisplayDimmed: Dispatch<SetStateAction<boolean>>;
}

export default function HistogramContainer({ setDisplayDimmed }: ISimilarQuote) {
  return (
    <Wrapper>
      <CurveHistogram />
      <BarHistogram setDisplayDimmed={setDisplayDimmed} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
