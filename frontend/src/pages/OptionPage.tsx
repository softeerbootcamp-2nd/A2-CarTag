import OptionBannerContainer from '../containers/OptionPage/OptionBannerContainer';
import OptionSelectContainer from '../containers/OptionPage/OptionSelectContainer/OptionSelectContainer';
import OptionFooterContainer from '../containers/OptionPage/OptionFooterContainer';
import { styled } from 'styled-components';

export default function OptionPage() {
  return (
    <Wrapper>
      <OptionBannerContainer />
      <OptionSelectContainer />
      <OptionFooterContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 120px;
`;
