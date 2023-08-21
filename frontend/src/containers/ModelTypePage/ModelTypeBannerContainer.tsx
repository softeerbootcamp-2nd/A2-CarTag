import { useCallback, useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { useFetch } from '../../hooks/useFetch';
import { BodyKrRegular4 } from '../../styles/typefaces';
import Banner from '../../components/common/banner/Banner';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PowerTrainData from '../../components/powerTrainData/PowerTrainData';
import { IHmgData, ModelTypeContext } from '../../context/ModelTypeProvider';
import { MODEL_TYPE_API, IMG_URL } from '../../utils/apis';
import { modelTypeToEn } from '../../utils/constants';
import ErrorModal from '../../components/modal/ErrorModal';

interface IModelTypeDetail {
  modelImage: string;
  modelName: string;
  modelTypeName: string;
  optionDescription: string;
}

export default function ModelTypePage() {
  const { modelType, currentModelTypeIdx, selectedModelType, setSelectedModelType } =
    useContext(ModelTypeContext);
  const {
    data: modelTypeDetail,
    loading: modelTypDetailLoading,
    error: modelTypeDetailError,
  } = useFetch<IModelTypeDetail>(`${MODEL_TYPE_API}/detail?modelid=${currentModelTypeIdx}`);

  const handleAddImgSrc = useCallback(() => {
    if (!modelType || !modelTypeDetail) return;

    const target = modelType[currentModelTypeIdx - 1];
    const key = modelTypeToEn[target.modelTypeName];
    selectedModelType[key].imgSrc = modelTypeDetail.modelImage;
    setSelectedModelType(selectedModelType);
  }, [modelType, modelTypeDetail, currentModelTypeIdx, selectedModelType, setSelectedModelType]);

  useEffect(() => {
    handleAddImgSrc();
  }, [handleAddImgSrc]);

  if (modelTypeDetailError) return <ErrorModal message={modelTypeDetailError.message} />;
  if (!modelType || (!modelTypeDetail && modelTypeDetailError)) return;
  const displaySeparator =
    modelType[currentModelTypeIdx - 1].hmgData?.maxPs &&
    modelType[currentModelTypeIdx - 1].hmgData?.maxKgfm;

  const parse = (hmgData: IHmgData | null) => {
    if (!hmgData) return { psValue: '', kgfmValue: '' };
    const [maxKgfm, kgfmRpm] = hmgData.maxKgfm.split('/');
    const [kgfmMinRpm, kgfmMaxRpm] = kgfmRpm.split('~');
    const [maxPs, maxPsRpm] = hmgData.maxPs.split('/');
    const psValue = parseInt(maxPs).toLocaleString() + '/' + parseInt(maxPsRpm).toLocaleString();
    const kgfmValue = kgfmMaxRpm
      ? parseFloat(maxKgfm).toLocaleString() +
        '/' +
        parseInt(kgfmMinRpm).toLocaleString() +
        '-' +
        parseInt(kgfmMaxRpm).toLocaleString()
      : parseFloat(maxKgfm).toLocaleString() + '/' + parseInt(kgfmMinRpm).toLocaleString();

    return { psValue, kgfmValue };
  };

  return (
    <>
      {modelType && modelTypeDetail && !modelTypDetailLoading && (
        <Banner subtitle={modelTypeDetail.modelTypeName} title={modelTypeDetail.modelName}>
          <CenterWrapper>
            <OptionDesc>{modelTypeDetail.optionDescription}</OptionDesc>

            {modelTypeDetail.modelTypeName === '파워트레인' && modelType[0].hmgData ? (
              <HmgDataSection>
                <HmgTag size="small" />
                <DataList>
                  {modelType[currentModelTypeIdx - 1].hmgData?.maxPs && (
                    <PowerTrainData
                      title="최고출력(PS/rpm)"
                      value={parse(modelType[currentModelTypeIdx - 1].hmgData).psValue} //TODO : 콤마찍기
                      ratio={modelType[currentModelTypeIdx - 1].hmgData!.ratioPs}
                    />
                  )}
                  {displaySeparator && <Separator />}
                  {modelType[currentModelTypeIdx - 1].hmgData?.maxKgfm && (
                    <PowerTrainData
                      title="최대토크(kgf·m/rpm)"
                      value={parse(modelType[currentModelTypeIdx - 1].hmgData).kgfmValue}
                      ratio={modelType[currentModelTypeIdx - 1].hmgData!.ratioKgfm}
                    />
                  )}
                </DataList>
              </HmgDataSection>
            ) : null}
            <ImgSection src={`${IMG_URL}${modelTypeDetail.modelImage}`} />
          </CenterWrapper>
        </Banner>
      )}
    </>
  );
}

const OptionDesc = styled.p`
  width: 300px;
  color: ${({ theme }) => theme.color.gray800};
  ${BodyKrRegular4}
  padding-top: 150px;
  word-break: keep-all;
`;

const HmgDataSection = styled.div`
  position: absolute;
  bottom: 40px;
`;

const DataList = styled.ul`
  display: flex;
  width: 448px;
  margin-top: 16px;
  align-items: center;
  gap: 24px;
`;

const Separator = styled.li`
  width: 1px;
  height: 41px;
  background-color: ${({ theme }) => theme.color.gray200};
`;

const ImgSection = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 632px;
  height: 360px;
  object-fit: cover;
  object-position: center;
`;
