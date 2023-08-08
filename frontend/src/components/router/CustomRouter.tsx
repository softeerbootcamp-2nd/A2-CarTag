import { useLocation } from 'react-router-dom';
import { PATH } from '../../utils/url';
import { TrimPage } from '../../pages/TrimPage';
import { ModelTypePage } from '../../pages/ModelTypePage';
import ExteriorPage from '../../pages/ExteriorPage';
import AnimatePresence from '../pageAnimation/AnimationPresence';
import PageAnimationWrapper from '../pageAnimation/PageAnimationWrapper';
import InteriorPage from '../../pages/InteriorPage';
import ResultPage from '../../pages/ResultPage';

export function CustomRouter() {
  const location = useLocation();

  return (
    <AnimatePresence>
      {location.pathname === PATH.trim && (
        <PageAnimationWrapper key={'trim'}>
          <TrimPage />
        </PageAnimationWrapper>
      )}
      {location.pathname === PATH.modelType && (
        <PageAnimationWrapper key={'modelType'}>
          <ModelTypePage />
        </PageAnimationWrapper>
      )}
      {location.pathname === PATH.exterior && (
        <PageAnimationWrapper key={'exterior'}>
          <ExteriorPage />
        </PageAnimationWrapper>
      )}
      {location.pathname === PATH.interior && (
        <PageAnimationWrapper key={'interior'}>
          <InteriorPage />
        </PageAnimationWrapper>
      )}
      {location.pathname === PATH.option && (
        <PageAnimationWrapper key={'option'}>
          <div />
        </PageAnimationWrapper>
      )}
      {location.pathname === PATH.result && (
        <PageAnimationWrapper key={'result'}>
          <ResultPage />
        </PageAnimationWrapper>
      )}
    </AnimatePresence>
  );
}
