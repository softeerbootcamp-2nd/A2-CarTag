import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import { HeadingKrMedium5, HeadingKrMedium7 } from '../../styles/typefaces';
import { useState } from 'react';
import ModelTypeCard from '../../components/cards/ModelTypeCard';

export default function ModelTypelSelectContainer() {
  const [selectedTypeIdx, setSelectedTypeIdx] = useState({
    powerTrain: 0,
    bodyType: 0,
    drivingSystem: 0,
  });
  const handleSelectedIdx = (key: string, idx: number) => {
    setSelectedTypeIdx((prevSelectedTypeIdx) => ({
      ...prevSelectedTypeIdx,
      [key]: idx,
    }));
  };

  return (
    <Wrapper>
      <Title>모델타입을 선택해주세요.</Title>
      <TypeSection>
        <TypeWrapper>
          <TypeTitle>파워트레인</TypeTitle>
          <ModelTypeSection>
            {/* Todo. map() 으로 데이터 받아서 만들기! */}
            <ModelTypeCardWrapper>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('powerTrain', 0)}
                active={selectedTypeIdx.powerTrain === 0}
                desc={'38%의 선택'}
                title={'디젤 2.2'}
                price={0}
              ></ModelTypeCard>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('powerTrain', 1)}
                active={selectedTypeIdx.powerTrain === 1}
                desc={'38%의 선택'}
                title={'디젤 2.2'}
                price={0}
              ></ModelTypeCard>
            </ModelTypeCardWrapper>
          </ModelTypeSection>
        </TypeWrapper>
        <TypeWrapper>
          <TypeTitle>바디타입</TypeTitle>
          <ModelTypeSection>
            {/* Todo. map() 으로 데이터 받아서 만들기! */}
            <ModelTypeCardWrapper>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('bodyType', 0)}
                active={selectedTypeIdx.bodyType === 0}
                desc={'38%의 선택'}
                title={'디젤 2.2'}
                price={0}
              ></ModelTypeCard>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('bodyType', 1)}
                active={selectedTypeIdx.bodyType === 1}
                desc={'38%의 선택'}
                title={'디젤 2.2'}
                price={0}
              ></ModelTypeCard>
            </ModelTypeCardWrapper>
          </ModelTypeSection>
        </TypeWrapper>
        <TypeWrapper>
          <TypeTitle>구동방식</TypeTitle>
          <ModelTypeSection>
            {/* Todo. map() 으로 데이터 받아서 만들기! */}
            <ModelTypeCardWrapper>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('drivingSystem', 0)}
                active={selectedTypeIdx.drivingSystem === 0}
                desc={'38%의 선택'}
                title={'디젤 2.2'}
                price={0}
              ></ModelTypeCard>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('drivingSystem', 1)}
                active={selectedTypeIdx.drivingSystem === 1}
                desc={'38%의 선택'}
                title={'디젤 2.2'}
                price={0}
              ></ModelTypeCard>
            </ModelTypeCardWrapper>
          </ModelTypeSection>
        </TypeWrapper>
      </TypeSection>
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)``;
const Title = styled.div`
  ${HeadingKrMedium5}
  margin-top: 16px;
`;

const TypeSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
`;
const TypeWrapper = styled.div``;
const TypeTitle = styled.div`
  color: ${(props) => props.theme.color.gray600};
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
  background: ${(props) => props.theme.color.gray50};
  padding: 4px;
  gap: 5px;
`;
