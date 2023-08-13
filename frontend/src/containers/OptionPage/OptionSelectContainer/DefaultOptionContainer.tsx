import { styled } from 'styled-components';
import { useState } from 'react';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';

export default function DefaultOptionContainer() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleClick = (index: number) => {
    setSelectedOption(index);
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
            type="default"
            active={selectedOption === 0}
            title="디젤 2.2"
            price={0}
            onClick={() => handleClick(0)}
          ></OptionCard>
          <OptionCard
            type="default"
            active={selectedOption === 1}
            title="디젤 2.2"
            price={0}
            onClick={() => handleClick(1)}
          ></OptionCard>
          <OptionCard
            type="default"
            active={selectedOption === 2}
            title="디젤 2.2"
            price={0}
            onClick={() => handleClick(2)}
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
