import OnBoardingGuide from '../components/dimmedBg/guide';
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
