import { styled } from 'styled-components';
import PriceSummary from '../../components/summary/PriceSummary';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import { PATH } from '../../utils/constants';

export default function OptionFooterContainer() {
  return (
    <Wrapper>
      <Footer>
        <PriceSummary nextPagePath={PATH.result} />
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
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
