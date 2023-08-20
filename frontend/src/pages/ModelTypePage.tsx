import { useCallback, useContext, useEffect } from 'react';
import ModelBannerContainer from '../containers/ModelTypePage/ModelTypeBannerContainer';
import ModelFooterContainer from '../containers/ModelTypePage/ModelTypeFooterContainer';
import ModelSelectContainer from '../containers/ModelTypePage/ModelTypeSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { DEFAULT_INFO_API, MODEL_TYPE_API } from '../utils/apis';
import { IModelType, ModelTypeContext } from '../context/ModelTypeProvider';
import { CAR_TYPE } from '../utils/constants';
import ErrorModal from '../components/modal/ErrorModal';
import { IDefaultInfo, ItemContext } from '../context/ItemProvider';

export default function ModelTypePage() {
  const {
    data: modelTypeData,
    loading: modelTypeLoading,
    error: modelTypeError,
  } = useFetch<IModelType[]>(`${MODEL_TYPE_API}/list?carid=${CAR_TYPE}`);
  const {
    data: defaultInfoData,
    loading: defaultInfoLoading,
    error: defaultInfoError,
  } = useFetch<IDefaultInfo>(`${DEFAULT_INFO_API}?carid=${CAR_TYPE}`);
  const { setModelType, setLoading } = useContext(ModelTypeContext);
  const { setSelectedItem } = useContext(ItemContext);

  const setDefaultInfo = useCallback(() => {
    if (!defaultInfoData || defaultInfoLoading) return;
    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: {
        id: defaultInfoData.powerTrainId,
        title: '파워트레인',
        name: defaultInfoData.powerTrainName,
        imgSrc: defaultInfoData.powerTrainImage,
        price: defaultInfoData.powerTrainPrice,
      },
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: {
        id: defaultInfoData.bodyTypeId,
        title: '바디타입',
        name: defaultInfoData.bodyTypeName,
        imgSrc: defaultInfoData.bodyTypeImage,
        price: defaultInfoData.bodyTypePrice,
      },
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: {
        id: defaultInfoData.operationId,
        title: '바디타입',
        name: defaultInfoData.operationName,
        imgSrc: defaultInfoData.operationImage,
        price: defaultInfoData.operationPrice,
      },
    });
    setSelectedItem({
      type: 'SET_OUTER_COLOR',
      value: {
        id: defaultInfoData.colorOuterId,
        title: '외장색상',
        name: defaultInfoData.colorOuterImageName,
        carImgSrc: defaultInfoData.colorCarOuterImage,
        imgSrc: defaultInfoData.colorOuterImage,
        price: defaultInfoData.colorOuterPrice,
      },
    });
    setSelectedItem({
      type: 'SET_INNER_COLOR',
      value: {
        id: defaultInfoData.colorInnerId,
        title: '내장색상',
        name: defaultInfoData.colorInnerImageName,
        carImgSrc: defaultInfoData.colorCarInnerImage,
        imgSrc: defaultInfoData.colorInnerImage,
        price: defaultInfoData.colorInnerPrice,
      },
    });
  }, [defaultInfoData, defaultInfoLoading, setSelectedItem]);

  useEffect(setDefaultInfo, [setDefaultInfo]);
  useEffect(() => {
    setModelType(modelTypeData);
    setLoading(modelTypeLoading);
  }, [modelTypeData, modelTypeLoading, setModelType, setLoading]);

  if (modelTypeError) return <ErrorModal message={modelTypeError.message} />;
  else if (defaultInfoError) return <ErrorModal message={defaultInfoError.message} />;

  return (
    <>
      <ModelBannerContainer />
      <ModelSelectContainer />
      <ModelFooterContainer />
    </>
  );
}
