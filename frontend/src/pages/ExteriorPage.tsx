import { styled } from 'styled-components';
import ExteriorBannerContainer from '../containers/ExteriorPage/ExtreriorBannerContainer';
import AnimatePresence from '../components/AnimationPresence';
import PageAnimationWrapper, { IDefaultPage } from '../components/layout/PageAnimationWrapper';

export default function ExteriorPage({ isClone }: IDefaultPage) {
  return (
    <PageAnimationWrapper isClone={isClone}>
      <ExteriorBannerContainer></ExteriorBannerContainer>
    </PageAnimationWrapper>
  );
}

const Wrapper = styled.div``;
