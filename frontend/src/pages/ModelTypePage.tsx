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
  const { data, loading, error } = useFetch<IModelType[]>(
    `${MODEL_TYPE_API}/list?carid=${CAR_TYPE}`
  );
  const { setModelType, setLoading } = useContext(ModelTypeContext);

  useEffect(() => {
    setModelType(data);
    setLoading(loading);
  }, [data, loading, setModelType, setLoading]);

  if (error) {
    <ErrorModal message={error.message} />;
  }
  return (
    <>
      <ModelBannerContainer />
      <ModelSelectContainer />
      <ModelFooterContainer />
    </>
  );
}
