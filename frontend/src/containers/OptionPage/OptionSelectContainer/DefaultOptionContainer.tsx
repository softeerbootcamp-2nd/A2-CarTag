import { styled } from 'styled-components';
import { useContext } from 'react';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { DefaultOptionContext, IDefaultOption } from '../../../context/DefaultOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';

export default function DefaultOptionContainer() {
  const { defaultOption, currentOptionIdx, setCurrentOptionIdx } = useContext(DefaultOptionContext);
  const handleClick = (index: number) => {
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

  const displayCategory = Object.keys(groupedData).map((key, idx) => (
    <RoundButton key={idx} type="option" inactive={true}>
      {key}
    </RoundButton>
  ));
  const displayData = defaultOption?.map((option, idx) => (
    <CardWrapper key={idx}>
      {option.hasHmgData && (
        <HmgWrapper>
          <HmgTag />
        </HmgWrapper>
      )}
      <OptionCard
        onClick={() => {
          handleClick(option.optionId);
        }}
        type="default"
        active={currentOptionIdx === option.optionId}
        title={option.optionName}
        price={option.optionPrice}
        imgPath={option.optionImage}
        hashTag={option.hashtagName}
      />
    </CardWrapper>
  ));
  return (
    <>
      {defaultOption && (
        <>
          <CategoryWrapper>
            <RoundButton type="option">전체</RoundButton>
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
