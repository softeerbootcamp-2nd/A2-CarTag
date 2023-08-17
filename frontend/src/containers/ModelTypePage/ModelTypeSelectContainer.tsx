import { useContext, useRef } from 'react';
import { styled } from 'styled-components';
import { HeadingKrMedium6, HeadingKrMedium7 } from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import ModelTypeCard from '../../components/cards/ModelTypeCard';
import { IModelType, ModelTypeContext } from '../../context/ModelTypeProvider';
import { modelTypeToEn } from '../../utils/constants';
import { ItemContext } from '../../context/ItemProvider';

export default function ModelTypelSelectContainer() {
  const { modelType, selectedModelType, setCurrentModelTypeIdx, setSelectedModelType } =
    useContext(ModelTypeContext);
  const { totalPrice, setTotalPrice, setSelectedItem } = useContext(ItemContext);
  const prevTotalPrice = useRef(totalPrice);

  const groupByModelTypeName = (array: IModelType[]) => {
    return array.reduce((acc: Record<string, IModelType[]>, current: IModelType) => {
      const modelTypeName = current.modelTypeName;
      if (!acc[modelTypeName]) {
        acc[modelTypeName] = [];
      }
      acc[modelTypeName].push(current);
      return acc;
    }, {});
  };
  const handleSelectedModelType = (index: number) => {
    setCurrentModelTypeIdx(index);
    const target = modelType![index - 1];
    const updatedType = {
      id: target.modelId,
      name: target.modelName,
      title: target.modelTypeName,
      imgSrc: '',
      price: target.modelPrice,
    };
    const key = modelTypeToEn[target.modelTypeName];
    selectedModelType[key] = updatedType;
    setSelectedModelType(selectedModelType);

    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: selectedModelType['powerTrain'],
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: selectedModelType['operation'],
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: selectedModelType['bodyType'],
    });

    setTotalPrice(prevTotalPrice.current + target.modelPrice);
  };

  if (!modelType) return;
  const groupedData = groupByModelTypeName(modelType);

  const drawModelType = Object.keys(groupedData).map((key, idx) => (
    <TypeWrapper key={idx}>
      <TypeTitle>{key}</TypeTitle>
      <ModelTypeSection>
        <ModelTypeCardWrapper>
          {groupedData[key].map((el) => (
            <ModelTypeCard
              key={el.modelId}
              onClick={() => {
                handleSelectedModelType(el.modelId);
              }}
              active={selectedModelType[modelTypeToEn[el.modelTypeName]].id === el.modelId}
              desc={el.percentage + '%의 선택'}
              title={el.modelName}
              price={el.modelPrice}
            />
          ))}
        </ModelTypeCardWrapper>
      </ModelTypeSection>
    </TypeWrapper>
  ));

  return (
    <>
      {modelType && (
        <Wrapper>
          <Title>모델타입을 선택해주세요.</Title>
          <TypeSection>{drawModelType}</TypeSection>
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
