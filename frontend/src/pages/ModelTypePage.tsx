import { useContext, useEffect } from 'react';
import ModelBannerContainer from '../containers/ModelTypePage/ModelTypeBannerContainer';
import ModelFooterContainer from '../containers/ModelTypePage/ModelTypeFooterContainer';
import ModelSelectContainer from '../containers/ModelTypePage/ModelTypeSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { MODEL_TYPE_API } from '../utils/apis';
import { IModelType, ModelTypeContext } from '../context/ModelTypeProvider';
import { CAR_TYPE } from '../utils/constants';
import ErrorModal from '../components/modal/ErrorModal';

export default function ModelTypePage() {
  const {
    data: modelTypeData,
    loading: modelTypeLoading,
    error: modelTypeError,
  } = useFetch<IModelType[]>(`${MODEL_TYPE_API}/list?carid=${CAR_TYPE}`);

  const { setModelType, setLoading } = useContext(ModelTypeContext);

  useEffect(() => {
    setModelType(modelTypeData);
    setLoading(modelTypeLoading);
  }, [modelTypeData, modelTypeLoading, setModelType, setLoading]);

  if (modelTypeError) return <ErrorModal message={modelTypeError.message} />;

  return (
    <>
      <ModelBannerContainer />
      <ModelSelectContainer />
      <ModelFooterContainer />
    </>
  );
}
