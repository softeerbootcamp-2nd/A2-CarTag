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
        <InnerColorBanner subtitle={'내장색상'} title={innerColorData[idx].colorName}>
          <Img onLoad={() => console.log('로드완료')} src={`${IMG_URL}${imgSrc}`} />
        </InnerColorBanner>
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
const InnerColorBanner = styled(Banner)`
  height: 360px;

  overflow: hidden;
  padding: 0;
  p {
    position: relative;
    color: ${({ theme }) => theme.color.white};
    z-index: 1;
  }
`;

const Img = styled.img`
  position: absolute;
  top: -20%;
  width: 100%;
  object-fit: cover;
`;
