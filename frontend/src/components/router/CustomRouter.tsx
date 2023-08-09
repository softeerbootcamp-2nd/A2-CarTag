import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/url';
import ExteriorPage from '../../pages/ExteriorPage';
import AnimatePresence from '../pageAnimation/AnimationPresence';
import PageAnimationWrapper from '../pageAnimation/PageAnimationWrapper';
import OptionPage from '../../pages/OptionPage';
import InteriorPage from '../../pages/InteriorPage';
import ResultPage from '../../pages/ResultPage';
import { useEffect } from 'react';
import TrimPage from '../../pages/TrimPage';
import ModelTypePage from '../../pages/ModelTypePage';

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
        <PageAnimationWrapper key={'trim'}>
          <TrimPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.modelType && (
        <PageAnimationWrapper key={'modelType'}>
          <ModelTypePage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.exterior && (
        <PageAnimationWrapper key={'exterior'}>
          <ExteriorPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.interior && (
        <PageAnimationWrapper key={'interior'}>
          <InteriorPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.option && (
        <PageAnimationWrapper key={'option'}>
          <OptionPage />
        </PageAnimationWrapper>
      )}
      {pathname === PATH.result && (
        <PageAnimationWrapper key={'result'}>
          <ResultPage />
        </PageAnimationWrapper>
      )}
    </AnimatePresence>
  );
}
