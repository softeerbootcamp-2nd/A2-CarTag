import OnBoardingGuide from '../components/modal/OnBoardingGuide';
import TrimBannerContainer from '../containers/TrimPage/TrimBannerContainer';
import TrimSelectContainer from '../containers/TrimPage/TrimSelectContainer';

export default function TrimPage() {
  return (
    <>
      <OnBoardingGuide />
      <TrimBannerContainer />
      <TrimSelectContainer />
    </>
  );
}
