import { useLocation } from 'react-router-dom';
import ExteriorPage from '../../pages/ExteriorPage';
import AnimatePresence from '../pageAnimation/AnimationPresence';
import PageAnimationWrapper from '../pageAnimation/PageAnimationWrapper';
import OptionPage from '../../pages/OptionPage';
import InteriorPage from '../../pages/InteriorPage';
import ResultPage from '../../pages/ResultPage';
import TrimPage from '../../pages/TrimPage';
import ModelTypePage from '../../pages/ModelTypePage';
import { PATH } from '../../utils/constants';
import TrimProvider from '../../context/TrimContext';
import ModelTypeProvider from '../../context/ModelTypeProvider';

export default function CustomRouter() {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {(pathname === PATH.trim || pathname === PATH.home) && (
        <PageAnimationWrapper key={0}>
          <TrimProvider>
            <TrimPage />
          </TrimProvider>
        </PageAnimationWrapper>
      )}
      {pathname === PATH.modelType && (
        <PageAnimationWrapper key={1}>
          <ModelTypeProvider>
            <ModelTypePage />
          </ModelTypeProvider>
        </PageAnimationWrapper>
      )}
      {pathname === PATH.exterior && (
        <PageAnimationWrapper key={2}>
          <ExteriorPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.interior && (
        <PageAnimationWrapper key={3}>
          <InteriorPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.option && (
        <PageAnimationWrapper key={4}>
          <OptionPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.result && (
        <PageAnimationWrapper key={5}>
          <ResultPage />
        </PageAnimationWrapper>
      )}
    </AnimatePresence>
  );
}
