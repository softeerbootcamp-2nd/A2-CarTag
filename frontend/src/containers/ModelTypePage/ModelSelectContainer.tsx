import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import {
  BodyKrMedium2,
  BodyKrMedium3,
  BodyKrRegular3,
  BodyKrRegular4,
  HeadingEn4,
  HeadingKrMedium5,
  HeadingKrMedium7,
  HeadingKrRegular1,
} from '../../styles/typefaces';
import DefaultCardStyle from '../../components/card/DefaultCardStyle';
import { useState } from 'react';
import HmgTag from '../../components/hmgTag/HmgTag';
import { CheckIcon } from '../../components/icons/Icons';

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
              >
                <ModelTypeDesc>38%의 선택</ModelTypeDesc>
                <ModelTypeTitle>디젤 2,2</ModelTypeTitle>
                <ModelTypePrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </ModelTypePrice>
              </ModelTypeCard>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('powerTrain', 1)}
                active={selectedTypeIdx.powerTrain === 1}
              >
                <ModelTypeDesc>38%의 선택</ModelTypeDesc>
                <ModelTypeTitle>디젤 2,2</ModelTypeTitle>
                <ModelTypePrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 1} />
                </ModelTypePrice>
              </ModelTypeCard>
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
              >
                <ModelTypeDesc>38%의 선택</ModelTypeDesc>
                <ModelTypeTitle>디젤 2,2</ModelTypeTitle>
                <ModelTypePrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.bodyType === 0} />
                </ModelTypePrice>
              </ModelTypeCard>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('bodyType', 1)}
                active={selectedTypeIdx.bodyType === 1}
              >
                <ModelTypeDesc>38%의 선택</ModelTypeDesc>
                <ModelTypeTitle>디젤 2,2</ModelTypeTitle>
                <ModelTypePrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.bodyType === 1} />
                </ModelTypePrice>
              </ModelTypeCard>
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
              >
                <ModelTypeDesc>38%의 선택</ModelTypeDesc>
                <ModelTypeTitle>디젤 2,2</ModelTypeTitle>
                <ModelTypePrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.drivingSystem === 0} />
                </ModelTypePrice>
              </ModelTypeCard>
              <ModelTypeCard
                onClick={() => handleSelectedIdx('drivingSystem', 1)}
                active={selectedTypeIdx.drivingSystem === 1}
              >
                <ModelTypeDesc>38%의 선택</ModelTypeDesc>
                <ModelTypeTitle>디젤 2,2</ModelTypeTitle>
                <ModelTypePrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.drivingSystem === 1} />
                </ModelTypePrice>
              </ModelTypeCard>
            </ModelTypeCardWrapper>
          </ModelTypeSection>
        </TypeWrapper>
      </TypeSection>
      <HmgDataSection>
        <HmgTag size="small" />
        <HmgInfoWrapper>
          <HmgTagDescription>
            <p>
              <BlueText>디젤 2.2</BlueText>와 <BlueText>2WD</BlueText>의
            </p>
            <p>배기량과 평균연비입니다.</p>
          </HmgTagDescription>
          <DataList>
            <Data>
              <DataTitle>배기량</DataTitle>
              <DataInfo>2,199cc</DataInfo>
            </Data>
            <Data className="separator" />
            <Data>
              <DataTitle>평균연비</DataTitle>
              <DataInfo>12km/s</DataInfo>
            </Data>
          </DataList>
        </HmgInfoWrapper>
      </HmgDataSection>
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

const ModelTypeCard = styled(DefaultCardStyle)`
  padding: 8px 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ModelTypeTitle = styled.div`
  ${HeadingEn4}
`;
const ModelTypePrice = styled.div`
  ${HeadingKrMedium7}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModelTypeDesc = styled.div`
  ${BodyKrRegular4}
`;

const HmgDataSection = styled.div`
  margin-top: 34px;
  padding: 0px 48px;
  width: 677px;
  height: 114px;
  background-color: ${(props) => props.theme.color.blueBg};
`;

const HmgInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const HmgTagDescription = styled.div`
  ${BodyKrMedium3}
`;

const BlueText = styled.span`
  ${BodyKrMedium2}
  color: ${({ theme }) => theme.color.activeBlue};
`;

const DataList = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;
const Data = styled.li`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:first-child {
    padding-right: 32px;
  }

  &:last-child {
    padding-left: 32px;
  }

  &.separator {
    width: 1px;
    height: 41px;
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;

const DataTitle = styled.div`
  ${BodyKrRegular3}
  word-break: keep-all;
  color: ${({ theme }) => theme.color.gray900};
`;
const DataInfo = styled.div`
  ${HeadingKrRegular1}
  color: ${({ theme }) => theme.color.gray900};
  font-size: 28px;
`;
