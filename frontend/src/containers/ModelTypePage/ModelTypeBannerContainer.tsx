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

interface IHmgData {
  maxKgfm: string;
  maxPs: string;
}

export default function ModelTypePage() {
  const { currentModelTypeIdx } = useContext(ModelTypeContext);
  const { data: hmgData, loading: hmgDataLoading } = useFetch<IHmgData>(
    `${MODEL_TYPE_API}/hmg-powertrain?powertrain=${currentModelTypeIdx}`
  );
  const { data: modelTypDetail, loading: modelTypDetailLoading } = useFetch<IModelTypeDetail>(
    `${MODEL_TYPE_API}/detail?modelid=${currentModelTypeIdx}`
  );
  const parseStringData = (dataString: string) => {
    const powerUnitRegEx = /kgf-m\/rpm/g;
    const torqueUnitRegEx = /PS\/rpm/g;
    const result = dataString.replace(powerUnitRegEx, '').replace(torqueUnitRegEx, '');
    return result;
  };

  return (
    <>
      {modelTypDetail && !modelTypDetailLoading && (
        <Banner subtitle={modelTypDetail.modelTypeName} title={modelTypDetail.modelName}>
          <Wrapper>
            <Container>
              <InfoWrapper>
                <AdditionalText>{modelTypDetail.optionDescription}</AdditionalText>
                {modelTypDetail.modelTypeName === '파워트레인' && hmgData && !hmgDataLoading ? (
                  <HmgDataSection>
                    <HmgTag size="small" />
                    <DataList>
                      <PowerTrainData
                        title="최고출력(PS/rpm)"
                        value={parseStringData(hmgData.maxPs)}
                        current={0.49}
                        max={0.53}
                      />
                      <Separator />
                      <PowerTrainData
                        title="최대토크(kgf·m/rpm)"
                        value={parseStringData(hmgData.maxKgfm)}
                        current={0.005}
                        max={0.02}
                      />
                    </DataList>
                  </HmgDataSection>
                ) : null}
              </InfoWrapper>
            </Container>
            <ImgSection src={`${IMG_URL}${modelTypDetail.modelImage}`} />
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
`;
const Data = styled.li`
  width: 100%;
  height: 67px;
  display: flex;
  flex-direction: column;
  &:first-child {
    padding-right: 24px;
  }

  &:last-child {
    padding-left: 24px;
  }
`;

const Separator = styled(Data)`
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
