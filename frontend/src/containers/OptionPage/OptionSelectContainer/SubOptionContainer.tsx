import { useContext, useState } from 'react';
import { styled } from 'styled-components';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { ISubOption, SubOptionContext } from '../../../context/SubOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';
export default function SubOptionContainer() {
  const [currentCategory, setCurrentCategory] = useState('전체');

  const { subOption, selectedOptionIdx, setCurrentOptionIdx, setSelectedOptionIdx } =
    useContext(SubOptionContext);
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  const handleCardClick = (index: number) => {
    setCurrentOptionIdx(index);
  };
  if (!subOption) return;
  const groupByCategoryName = (array: ISubOption[]) => {
    return array.reduce((acc: Record<string, ISubOption[]>, current: ISubOption) => {
      const optionCategoryName = current.optionCategoryName;
      if (!acc[optionCategoryName]) {
        acc[optionCategoryName] = [];
      }
      acc[optionCategoryName].push(current);
      return acc;
    }, {});
  };
  const groupedData = groupByCategoryName(subOption);

  const handleSelectOption = (index: number) => {
    setSelectedOptionIdx((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(index)) {
        return prevSelectedOptions.filter((item) => item !== index);
      } else {
        return [...prevSelectedOptions, index];
      }
    });
  };
  const displayCategory = Object.keys(groupedData).map((key) => (
    <RoundButton
      key={key}
      type="option"
      inactive={!(currentCategory === key)}
      onClick={() => handleCategoryClick(key)}
    >
      {key}
    </RoundButton>
  ));
  const filteredByCategory = currentCategory === '전체' ? subOption : groupedData[currentCategory];
  const displayData = filteredByCategory.map((option, idx) => (
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
            <RoundButton
              type="option"
              inactive={!(currentCategory === '전체')}
              onClick={() => handleCategoryClick('전체')}
            >
              전체
            </RoundButton>
            {displayCategory}
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
