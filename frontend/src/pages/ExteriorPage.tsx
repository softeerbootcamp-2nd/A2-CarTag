import ExteriorBannerContainer from '../containers/ExteriorPage/ExtreriorBannerContainer';
import PageAnimationWrapper, { IDefaultPage } from '../components/layout/PageAnimationWrapper';

export default function ExteriorPage({ isClone }: IDefaultPage) {
  return (
    <PageAnimationWrapper isClone={isClone}>
      <ExteriorBannerContainer></ExteriorBannerContainer>
    </PageAnimationWrapper>
  );
}
