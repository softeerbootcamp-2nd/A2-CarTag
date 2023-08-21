import { styled } from 'styled-components';
import PriceSummary from '../../components/summary/PriceSummary';
import { PATH } from '../../utils/constants';
import CenterWrapper from '../../components/layout/CenterWrapper';

export default function OuterColorFooterContainer() {
  return (
    <Wrapper>
      <Footer>
        <PriceSummary nextPagePath={PATH.innerColor} />
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 999;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
`;

const Footer = styled(CenterWrapper)`
  display: flex;
  justify-content: flex-end;
`;
