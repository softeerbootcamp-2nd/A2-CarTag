import { useContext } from 'react';
import { styled } from 'styled-components';
import { HeadingKrMedium6, HeadingKrMedium7 } from '../../styles/typefaces';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import ModelTypeCard from '../../components/cards/ModelTypeCard';
import { ModelTypeContext } from '../../context/ModelTypeProvider';
import { modelTypeToEn } from '../../utils/constants';
import { ItemContext } from '../../context/ItemProvider';

export default function ModelTypelSelectContainer() {
  const { modelType, setCurrentModelTypeIdx } = useContext(ModelTypeContext);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);

  const handleSelectedPowerTrain = (index: number) => {
    if (!modelType) return;
    const target = modelType[index - 1];
    setCurrentModelTypeIdx(index);
    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: {
        id: target.modelId,
        title: '파워트레인',
        name: target.modelName,
        price: target.modelPrice,
        imgSrc: target.modelImage,
      },
    });
  };
  const handleSelectedBodyType = (index: number) => {
    if (!modelType) return;
    const target = modelType[index - 1];

    setCurrentModelTypeIdx(index);
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: {
        id: target.modelId,
        title: '바디타입',
        name: target.modelName,
        price: target.modelPrice,
        imgSrc: target.modelImage,
      },
    });
  };
  const handleSelectedOperation = (index: number) => {
    if (!modelType) return;
    const target = modelType[index - 1];
    setCurrentModelTypeIdx(index);
    setSelectedItem({
      type: 'SET_OPERATION',
      value: {
        id: target.modelId,
        title: '구동방식',
        name: target.modelName,
        price: target.modelPrice,
        imgSrc: target.modelImage,
      },
    });
  };

  if (!modelType) return;

  const isActive = (modelType: string, id: number) => {
    const seletedId = selectedItem.modelType[modelTypeToEn[modelType]].id;
    return seletedId === id;
  };

  return (
    <>
      {modelType && (
        <Wrapper>
          <Title>모델타입을 선택해주세요.</Title>
          <TypeSection>
            <TypeWrapper>
              <TypeTitle>{modelType[0].modelTypeName}</TypeTitle>
              <ModelTypeSection>
                <ModelTypeCardWrapper>
                  {[modelType[0], modelType[1]].map((powerTrain) => (
                    <ModelTypeCard
                      key={powerTrain.modelId}
                      onClick={() => handleSelectedPowerTrain(powerTrain.modelId)}
                      active={isActive(powerTrain.modelTypeName, powerTrain.modelId)}
                      percentage={powerTrain.percentage}
                      title={powerTrain.modelName}
                      price={powerTrain.modelPrice}
                    />
                  ))}
                </ModelTypeCardWrapper>
              </ModelTypeSection>
            </TypeWrapper>

            <TypeWrapper>
              <TypeTitle>{modelType[2].modelTypeName}</TypeTitle>
              <ModelTypeSection>
                <ModelTypeCardWrapper>
                  {[modelType[2], modelType[3]].map((bodyType) => (
                    <ModelTypeCard
                      key={bodyType.modelId}
                      onClick={() => handleSelectedOperation(bodyType.modelId)}
                      active={isActive(bodyType.modelTypeName, bodyType.modelId)}
                      percentage={bodyType.percentage}
                      title={bodyType.modelName}
                      price={bodyType.modelPrice}
                    />
                  ))}
                </ModelTypeCardWrapper>
              </ModelTypeSection>
            </TypeWrapper>

            <TypeWrapper>
              <TypeTitle>{modelType[4].modelTypeName}</TypeTitle>
              <ModelTypeSection>
                <ModelTypeCardWrapper>
                  {[modelType[4], modelType[5]].map((operation) => (
                    <ModelTypeCard
                      key={operation.modelId}
                      onClick={() => handleSelectedBodyType(operation.modelId)}
                      active={isActive(operation.modelTypeName, operation.modelId)}
                      percentage={operation.percentage}
                      title={operation.modelName}
                      price={operation.modelPrice}
                    />
                  ))}
                </ModelTypeCardWrapper>
              </ModelTypeSection>
            </TypeWrapper>
          </TypeSection>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled(CenterWrapper)``;
const Title = styled.div`
  ${HeadingKrMedium6}
  margin-top: 16px;
`;

const TypeSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
`;
const TypeWrapper = styled.div``;
const TypeTitle = styled.div`
  color: ${({ theme }) => theme.color.gray600};
  ${HeadingKrMedium7};
`;

const ModelTypeSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModelTypeCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 331px;
  background: ${({ theme }) => theme.color.gray50};
  padding: 4px;
  gap: 5px;
`;
