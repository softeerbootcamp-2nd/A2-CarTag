import { styled } from 'styled-components';
import { useContext, useState } from 'react';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { DefaultOptionContext, IDefaultOption } from '../../../context/DefaultOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';

export default function DefaultOptionContainer() {
  const [currentCategory, setCurrentCategory] = useState('전체');
  const { defaultOption, currentOptionIdx, setCurrentOptionIdx } = useContext(DefaultOptionContext);
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  const handleCardClick = (index: number) => {
    setCurrentOptionIdx(index);
  };

  if (!defaultOption) return;
  const groupByCategoryName = (array: IDefaultOption[]) => {
    return array.reduce((acc: Record<string, IDefaultOption[]>, current: IDefaultOption) => {
      const optionCategoryName = current.optionCategoryName;
      if (!acc[optionCategoryName]) {
        acc[optionCategoryName] = [];
      }
      acc[optionCategoryName].push(current);
      return acc;
    }, {});
  };
  const groupedData = groupByCategoryName(defaultOption);

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
  const filteredByCategory =
    currentCategory === '전체' ? defaultOption : groupedData[currentCategory];
  const displayData = filteredByCategory.map((option, idx) => (
    <CardWrapper key={idx}>
      <OptionCard
        onClick={() => {
          handleCardClick(option.optionId);
        }}
        type="default"
        active={currentOptionIdx === option.optionId}
        title={option.optionName}
        price={option.optionPrice}
        imgPath={option.optionImage}
        hashTag={option.hashtagName}
      />
      {option.hasHmgData && (
        <HmgWrapper>
          <HmgTag />
        </HmgWrapper>
      )}
    </CardWrapper>
  ));
  return (
    <>
      {defaultOption && (
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
