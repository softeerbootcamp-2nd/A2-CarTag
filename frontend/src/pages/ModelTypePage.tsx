import { useContext, useEffect } from 'react';
import ModelBannerContainer from '../containers/ModelTypePage/ModelTypeBannerContainer';
import ModelFooterContainer from '../containers/ModelTypePage/ModelTypeFooterContainer';
import ModelSelectContainer from '../containers/ModelTypePage/ModelTypeSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { MODEL_TYPE_API } from '../utils/apis';
import { IModelType, ModelTypeContext } from '../context/ModelTypeProvider';

export default function ModelTypePage() {
  const { data, loading } = useFetch<IModelType[]>(`${MODEL_TYPE_API}/list?carid=${1}`);
  const { setModelType, setLoading } = useContext(ModelTypeContext);

  useEffect(() => {
    setModelType(data);
    setLoading(loading);
  }, [data, loading, setModelType, setLoading]);

  return (
    <>
      <ModelBannerContainer />
      <ModelSelectContainer />
      <ModelFooterContainer />
    </>
  );
}
