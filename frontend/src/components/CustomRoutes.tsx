import { useLocation } from 'react-router-dom';
import { PATH } from '../utils/url';
import { TrimPage } from '../pages/TrimPage';
import { ModelTypePage } from '../pages/ModelTypePage';
import ExteriorPage from '../pages/ExteriorPage';
import AnimatePresence from './AnimationPresence';

export function CustomRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      {location.pathname === PATH.trim && <TrimPage key={'trim'} />}
      {location.pathname === PATH.modelType && <ModelTypePage key={'modelType'} />}
      {location.pathname === PATH.exterior && <ExteriorPage key={'exterior'} />}
      {location.pathname === PATH.interior && <div />}
      {location.pathname === PATH.option && <div />}
      {location.pathname === PATH.result && <div />}
    </AnimatePresence>
  );
}
