import { styled } from 'styled-components';
import CurveHistogram from '../../components/histogram/CurveHistogram';
import BarHistogram from '../../components/histogram/BarHistogram';
import { useContext } from 'react';
import { ItemContext } from '../../context/ItemProvider';

export default function HistogramContainer() {
  const { selectedItem } = useContext(ItemContext);
  return (
    <Wrapper>
      <CurveHistogram />
      {selectedItem.options.length !== 0 && <BarHistogram />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 310px;
`;
