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
import { CheckIcon } from '../../components/icons/Icons';
import RoundButton from '../../components/buttons/RoundButton';
import HmgTag from '../../components/hmgTag/HmgTag';
import SearchBar from '../../components/searchBar/SearchBar';

export default function OptionSelectContainer() {
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
      <Header>
        <Title>추가옵션 기본옵션</Title>
        <SearchBar placeholder="옵션명, 해시태그, 카테고리로 검색해보세요."></SearchBar>
      </Header>
      <CategoryWrapper>
        <RoundButton type="option">전체</RoundButton>
        <RoundButton type="option" inactive={true}>
          상세품목
        </RoundButton>
        <RoundButton type="option" inactive={true}>
          악세서리
        </RoundButton>
        <RoundButton type="option" inactive={true}>
          휠
        </RoundButton>
      </CategoryWrapper>
      <OptionSection>
        <OptionWrapper>
          {/* Todo. map() 으로 데이터 받아서 만들기! */}

          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>

          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard
              onClick={() => handleSelectedIdx('powerTrain', 0)}
              active={selectedTypeIdx.powerTrain === 0}
            >
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedTypeIdx.powerTrain === 0} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
        </OptionWrapper>
      </OptionSection>
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
`;
const Title = styled.div`
  ${HeadingKrMedium5}
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const OptionSection = styled.div`
  margin: 16px 0px;
`;
const OptionWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 16px;
`;

const OptionCardWrapper = styled.div`
  position: relative;
`;

const HmgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const OptionCard = styled(DefaultCardStyle)`
  width: 244px;
  height: 278px;
  border-radius: 2px;
`;

const OptionImg = styled.div`
  border-radius: 1px 1px 0px 0px;
  width: 100%;
  height: 160px;
  background-image: url('/images/extra_option/roa.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(211, 211, 211, 0.5);
`;
const OptionCardInfo = styled.div`
  padding: 12px 14px;
`;

const OptionTitle = styled.div`
  ${HeadingEn4}
`;
const OptionPrice = styled.div`
  ${HeadingKrMedium7}
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  align-items: center;
`;
const OptionDesc = styled.div`
  ${BodyKrRegular4}
`;

const HmgDataSection = styled.div`
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
