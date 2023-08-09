import { useState } from 'react';
import { styled } from 'styled-components';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';

export default function ExtraOptionContainer() {
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
          <OptionCard
            type="extra"
            active={selectedOptions.includes(0)}
            desc="38%의 선택"
            title="디젤 2.2"
            price={0}
            onClick={() => handleClick(0)}
          ></OptionCard>
          <OptionCard
            type="extra"
            active={selectedOptions.includes(1)}
            desc="38%의 선택"
            title="디젤 2.2"
            price={0}
            onClick={() => handleClick(1)}
          ></OptionCard>
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
