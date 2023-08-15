import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { HeadingKrMedium6, HeadingKrMedium7 } from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import ModelTypeCard from '../../components/cards/ModelTypeCard';
import { IModelType, ModelTypeContext } from '../../context/ModelTypeProvider';

export default function ModelTypelSelectContainer() {
  const { modelType, selectedModelTypeIdx, setCurrentModelTypeIdx, handleSelectedIdx } =
    useContext(ModelTypeContext);
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
  if (!modelType) return;
  const groupedData = groupByModelTypeName(modelType);
  const drawModelType = Object.keys(groupedData).map((key) => (
    <TypeWrapper key={key}>
      <TypeTitle>{key}</TypeTitle>
      <ModelTypeSection>
        <ModelTypeCardWrapper>
          {groupedData[key].map((el) => (
            <React.Fragment key={el.modelId}>
              <ModelTypeCard
                onClick={() => {
                  setCurrentModelTypeIdx(el.modelId);
                  handleSelectedIdx(el.modelTypeName, el.modelId);
                }}
                active={selectedModelTypeIdx[el.modelTypeName] === el.modelId}
                desc={el.percentage + '%의 선택'}
                title={el.modelName}
                price={el.modelPrice}
              />
            </React.Fragment>
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
