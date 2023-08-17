import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import { useContext } from 'react';
import { InnerColorContext } from '../../context/InnerColorProvider';
import { NUM_IN_A_PAGE } from '../../utils/constants';
import { IMG_URL } from '../../utils/apis';
import Loading from '../../components/loading/Loading';
import { flexCenterCss } from '../../utils/commonStyle';

export default function InnerColorBannerContainer() {
  const { data: innerColorData, selectedIdx } = useContext(InnerColorContext);
  const idx = selectedIdx.page * NUM_IN_A_PAGE + selectedIdx.idx;
  const imgSrc = innerColorData && innerColorData[idx].colorCarImage;

  return (
    <Wrapper>
      {innerColorData ? (
        <InnerColorBanner
          $src={`${IMG_URL}${imgSrc}`}
          subtitle={'내장색상'}
          title={'퀼팅천연(블랙)'}
        />
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${flexCenterCss}
  width: 100%;
  height: 360px;
`;
const InnerColorBanner = styled(Banner)<{ $src: string }>`
  overflow: hidden;
  padding: 0;
  p {
    color: ${({ theme }) => theme.color.white};
  }
  background-image: url(${({ $src }) => $src});
  background-position: 0% 30%;
  background-size: cover;
`;
