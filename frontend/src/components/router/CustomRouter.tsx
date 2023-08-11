import { useLocation, useNavigate } from 'react-router-dom';
import ExteriorPage from '../../pages/ExteriorPage';
import AnimatePresence from '../pageAnimation/AnimationPresence';
import PageAnimationWrapper from '../pageAnimation/PageAnimationWrapper';
import OptionPage from '../../pages/OptionPage';
import InteriorPage from '../../pages/InteriorPage';
import ResultPage from '../../pages/ResultPage';
import { useEffect } from 'react';
import TrimPage from '../../pages/TrimPage';
import ModelTypePage from '../../pages/ModelTypePage';
import { PATH } from '../../utils/constants';

export default function CustomRouter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === PATH.home) {
      navigate(PATH.trim);
    }
  });

  return (
    <AnimatePresence>
      {pathname === PATH.trim && (
        <PageAnimationWrapper key={0}>
          <TrimPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.modelType && (
        <PageAnimationWrapper key={1}>
          <ModelTypePage />
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
