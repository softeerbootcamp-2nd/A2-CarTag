import { useContext } from 'react';
import { styled } from 'styled-components';
import { useFetch } from '../../hooks/useFetch';
import { BodyKrRegular4 } from '../../styles/typefaces';
import Banner from '../../components/common/banner/Banner';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PowerTrainData from '../../components/powerTrainData/PowerTrainData';
import { ModelTypeContext } from '../../context/ModelTypeProvider';
import { MODEL_TYPE_API, IMG_URL } from '../../utils/apis';

interface IModelTypeDetail {
  modelImage: string;
  modelName: string;
  modelTypeName: string;
  optionDescription: string;
}

export default function ModelTypePage() {
  const { modelType, currentModelTypeIdx } = useContext(ModelTypeContext);

  const { data: modelTypeDetail, loading: modelTypDetailLoading } = useFetch<IModelTypeDetail>(
    `${MODEL_TYPE_API}/detail?modelid=${currentModelTypeIdx}`
  );
  if (!modelType || !modelTypeDetail) return;
  const displaySeparator =
    modelType[currentModelTypeIdx - 1].hmgData?.maxPs &&
    modelType[currentModelTypeIdx - 1].hmgData?.maxKgfm;
  return (
    <>
      {modelType && modelTypeDetail && !modelTypDetailLoading && (
        <Banner subtitle={modelTypeDetail.modelTypeName} title={modelTypeDetail.modelName}>
          <Wrapper>
            <Container>
              <InfoWrapper>
                <AdditionalText>{modelTypeDetail.optionDescription}</AdditionalText>
                {modelTypeDetail.modelTypeName === '파워트레인' && modelType[0].hmgData ? (
                  <HmgDataSection>
                    <HmgTag size="small" />
                    <DataList>
                      {modelType[currentModelTypeIdx - 1].hmgData?.maxPs && (
                        <PowerTrainData
                          title="최고출력(PS/rpm)"
                          value={modelType[currentModelTypeIdx - 1].hmgData!.maxPs} //TODO : 콤마찍기
                          ratio={modelType[currentModelTypeIdx - 1].hmgData!.ratioPs}
                        />
                      )}
                      {displaySeparator && <Separator />}
                      {modelType[currentModelTypeIdx - 1].hmgData?.maxKgfm && (
                        <>
                          <PowerTrainData
                            title="최대토크(kgf·m/rpm)"
                            value={modelType[currentModelTypeIdx - 1].hmgData!.maxKgfm}
                            ratio={modelType[currentModelTypeIdx - 1].hmgData!.ratioKgfm}
                          />
                        </>
                      )}
                    </DataList>
                  </HmgDataSection>
                ) : null}
              </InfoWrapper>
            </Container>
            <ImgSection src={`${IMG_URL}${modelTypeDetail.modelImage}`} />
          </Wrapper>
        </Banner>
      )}
    </>
  );
}

const AdditionalText = styled.p`
  width: 300px;
  color: ${({ theme }) => theme.color.gray800};
  ${BodyKrRegular4}
  margin-bottom: 10px;
  word-break: keep-all;
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 1280px;
`;
const Container = styled(CenterWrapper)`
  height: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding-top: 150px;
`;
const HmgDataSection = styled.div``;

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
  object-fit: contain;
  object-position: center;
`;
