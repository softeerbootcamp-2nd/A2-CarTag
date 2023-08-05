import ModelBannerContainer from '../containers/ModelTypePage/ModelBannerContainer';
import ModelSelectContainer from '../containers/ModelTypePage/ModelSelectContainer';
import PageAnimationWrapper, { IDefaultPage } from '../components/layout/PageAnimationWrapper';

export function ModelTypePage({ isClone }: IDefaultPage) {
  return (
    <PageAnimationWrapper isClone={isClone}>
      <ModelBannerContainer />
      <ModelSelectContainer />
    </PageAnimationWrapper>
  );
}
