import { useContext } from 'react';
import { styled } from 'styled-components';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { SubOptionContext } from '../../../context/SubOptionProvider';

export default function SubOptionContainer() {
  const { subOption, selectedOptionIdx, setCurrentOptionIdx } = useContext(SubOptionContext);

  const displayData = subOption?.map((option, idx) => (
    <OptionCard
      key={idx}
      type="sub"
      active={selectedOptionIdx.includes(idx)}
      desc={`${option.percentage}%의 선택`}
      title={option.optionName}
      price={option.optionPrice}
      imgPath={option.optionImage}
      onClick={() => setCurrentOptionIdx(option.subOptionId)}
    ></OptionCard>
  ));
  return (
    <>
      {subOption && (
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
            <OptionWrapper>{displayData}</OptionWrapper>
          </OptionSection>
        </>
      )}
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
