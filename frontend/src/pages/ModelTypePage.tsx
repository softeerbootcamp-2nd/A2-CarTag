import { useContext, useEffect } from 'react';
import ModelBannerContainer from '../containers/ModelTypePage/ModelTypeBannerContainer';
import ModelFooterContainer from '../containers/ModelTypePage/ModelTypeFooterContainer';
import ModelSelectContainer from '../containers/ModelTypePage/ModelTypeSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { MODEL_TYPE_API } from '../utils/apis';
import { IModelType, ModelTypeContext } from '../context/PageProviders/ModelTypeProvider';
import ErrorModal from '../components/modal/ErrorModal';
import { ItemContext } from '../context/ItemProvider';

export default function ModelTypePage() {
  const { selectedItem } = useContext(ItemContext);
  const {
    data: modelTypeData,
    loading: modelTypeLoading,
    error: modelTypeError,
  } = useFetch<IModelType[]>(`${MODEL_TYPE_API}/list?carid=${selectedItem.trim.id}`);

  const { setModelType, setLoading } = useContext(ModelTypeContext);

  useEffect(() => {
    setModelType(modelTypeData);
    setLoading(modelTypeLoading);
  }, [modelTypeData, modelTypeLoading, setModelType, setLoading]);

  if (modelTypeError) return <ErrorModal message={modelTypeError.message} />;

  return (
    <>
      {modelTypeData && !modelTypeLoading && (
        <>
          <ModelBannerContainer />
          <ModelSelectContainer />
          <ModelFooterContainer />
        </>
      )}
    </>
  );
}
