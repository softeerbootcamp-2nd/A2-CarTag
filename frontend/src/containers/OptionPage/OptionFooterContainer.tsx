import { styled } from 'styled-components';
import PriceSummary from '../../components/summary/PriceSummary';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { PATH } from '../../utils/constants';

export default function OptionFooterContainer() {
  return (
    <Wrapper>
      <FooterWrapper>
        <PriceSummary nextPagePath={PATH.result} />
      </FooterWrapper>
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

const FooterWrapper = styled(CenterWrapper)`
  display: flex;
  justify-content: flex-end;
`;
