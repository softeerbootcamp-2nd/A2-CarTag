import ModelBannerContainer from '../containers/ModelTypePage/ModelBannerContainer';
import ModelFooterContainer from '../containers/ModelTypePage/ModelFooterContainer';
import ModelSelectContainer from '../containers/ModelTypePage/ModelSelectContainer';

export default function ModelTypePage() {
  return (
    <>
      <ModelBannerContainer />
      <ModelSelectContainer />
      <ModelFooterContainer />
    </>
  );
}
