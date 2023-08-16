import { useContext } from 'react';
import { styled } from 'styled-components';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { SubOptionContext } from '../../../context/SubOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';
export default function SubOptionContainer() {
  const { subOption, selectedOptionIdx, setCurrentOptionIdx, setSelectedOptionIdx } =
    useContext(SubOptionContext);

  const handleCardClick = (index: number) => {
    setCurrentOptionIdx(index);
  };

  const handleSelectOption = (index: number) => {
    setSelectedOptionIdx((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(index)) {
        return prevSelectedOptions.filter((item) => item !== index);
      } else {
        return [...prevSelectedOptions, index];
      }
    });
  };
  const displayData = subOption?.map((option, idx) => (
    <CardWrapper key={idx}>
      {option.hasHmgData && (
        <HmgWrapper>
          <HmgTag />
        </HmgWrapper>
      )}
      <OptionCard
        onClick={() => handleCardClick(option.subOptionId)}
        type="sub"
        active={selectedOptionIdx.includes(option.subOptionId)}
        desc={`${option.percentage}%의 선택`}
        title={option.optionName}
        price={option.optionPrice}
        imgPath={option.optionImage}
        hashTag={option.hashtagName}
        handleSelectOption={() => handleSelectOption(option.subOptionId)}
      />
    </CardWrapper>
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
const HmgWrapper = styled.div`
  position: absolute;
  top: 1px;
  right: 1px;
`;

const CardWrapper = styled.div`
  position: relative;
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
