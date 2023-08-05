import TrimBannerContainer from '../containers/TrimPage/TrimBannerContainer';
import TrimSelectContainer from '../containers/TrimPage/TrimSelectContainer';
import PageAnimationWrapper, { IDefaultPage } from '../components/layout/PageAnimationWrapper';

export function TrimPage({ isClone = false }: IDefaultPage) {
  return (
    <PageAnimationWrapper isClone={isClone}>
      <TrimBannerContainer />
      <TrimSelectContainer />
    </PageAnimationWrapper>
  );
}
