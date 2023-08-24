import { useLocation } from 'react-router-dom';
import OuterColorPage from '../../pages/OuterColorPage';
import AnimatePresence from '../pageAnimation/AnimationPresence';
import PageAnimationWrapper from '../pageAnimation/PageAnimationWrapper';
import OptionPage from '../../pages/OptionPage';
import InnerColorPage from '../../pages/InnerColorPage';
import ResultPage from '../../pages/ResultPage';
import TrimPage from '../../pages/TrimPage';
import ModelTypePage from '../../pages/ModelTypePage';
import { PATH } from '../../utils/constants';
import TrimProvider from '../../context/PageProviders/TrimProvider';
import ModelTypeProvider from '../../context/PageProviders/ModelTypeProvider';
import OuterColorProvider from '../../context/PageProviders/OuterColorProvider';
import SubOptionProvider from '../../context/PageProviders/SubOptionProvider';
import DefaultOptionProvider from '../../context/PageProviders/DefaultOptionProvider';
import Providers from '../contextProviders/Providers';
import InnerColorProvider from '../../context/PageProviders/InnerColorProvider';

export default function CustomRouter() {
  const optionProviders = [SubOptionProvider, DefaultOptionProvider];

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
      {pathname === PATH.outerColor && (
        <PageAnimationWrapper key={2}>
          <OuterColorProvider>
            <OuterColorPage />
          </OuterColorProvider>
        </PageAnimationWrapper>
      )}
      {pathname === PATH.innerColor && (
        <PageAnimationWrapper key={3}>
          <InnerColorProvider>
            <InnerColorPage />
          </InnerColorProvider>
        </PageAnimationWrapper>
      )}
      {pathname === PATH.option && (
        <PageAnimationWrapper key={4}>
          <Providers contexts={optionProviders}>
            <OptionPage />
          </Providers>
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
