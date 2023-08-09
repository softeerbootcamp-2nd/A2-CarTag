import { styled } from 'styled-components';
import DefaultCardStyle from '../../../components/common/card/DefaultCardStyle';
import { BodyKrRegular4, HeadingEn4, HeadingKrMedium7 } from '../../../styles/typefaces';
import { useState } from 'react';
import RoundButton from '../../../components/common/buttons/RoundButton';
import { CheckIcon } from '../../../components/common/icons/Icons';
import HmgTag from '../../../components/common/hmgTag/HmgTag';

export default function DefaultOptionContainer() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(index)) {
        return prevSelectedOptions.filter((item) => item !== index);
      } else {
        return [...prevSelectedOptions, index];
      }
    });
  };
  return (
    <>
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
            <OptionCard onClick={() => handleClick(0)} active={selectedOptions.includes(0)}>
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedOptions.includes(0)} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard onClick={() => handleClick(1)} active={selectedOptions.includes(1)}>
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedOptions.includes(1)} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
          <OptionCardWrapper>
            <HmgWrapper>
              <HmgTag />
            </HmgWrapper>
            <OptionCard onClick={() => handleClick(2)} active={selectedOptions.includes(2)}>
              <OptionImg />
              <OptionCardInfo>
                <OptionDesc>38%의 선택</OptionDesc>
                <OptionTitle>디젤 2.2</OptionTitle>
                <OptionPrice>
                  +0 원 <CheckIcon active={selectedOptions.includes(2)} />
                </OptionPrice>
              </OptionCardInfo>
            </OptionCard>
          </OptionCardWrapper>
        </OptionWrapper>
      </OptionSection>
    </>
  );
}

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
