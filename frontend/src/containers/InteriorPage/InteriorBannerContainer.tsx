import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';

export default function InteriorBannerContainer() {
  return (
    <>
      <InteriorBanner subtitle={'내장색상'} title={'퀼팅천연(블랙)'} />{' '}
    </>
  );
}

const InteriorBanner = styled(Banner)`
  overflow: hidden;
  padding: 0;
  p {
    color: ${({ theme }) => theme.color.white};
  }
  background-image: url('images/inner_car.png');
  background-position: 0% 30%;
  background-size: cover;
`;
