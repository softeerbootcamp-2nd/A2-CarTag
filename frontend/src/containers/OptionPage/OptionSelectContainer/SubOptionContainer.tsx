import { Dispatch, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { styled } from 'styled-components';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { ISubOption, SubOptionContext } from '../../../context/SubOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';
import { ItemContext } from '../../../context/ItemProvider';

interface ISubOptionContainer {
  query: string | null;
  setQuery: Dispatch<React.SetStateAction<string | null>>;
}

export default function SubOptionContainer({ query, setQuery }: ISubOptionContainer) {
  const [filteredByCategory, setFilteredByCategory] = useState<ISubOption[]>([]);
  const [displayData, setDisplayData] = useState<ISubOption[]>([]);
  const handleSearch = useCallback(
    (query: string) => {
      const filteredResults = filteredByCategory.filter((option) => {
        const optionName = option.optionName;
        const category = option.optionCategoryName;
        const hashtags = option.hashtagName;

        return (
          optionName.includes(query) ||
          hashtags.some((tag) => tag.includes(query)) ||
          category.includes(query)
        );
      });
      setDisplayData(filteredResults);
    },
    [filteredByCategory]
  );

  const [currentCategory, setCurrentCategory] = useState('전체');
  const { subOption, setCurrentOptionIdx } = useContext(SubOptionContext);
  const { selectedItem, setTotalPrice, setSelectedItem } = useContext(ItemContext);
  const groupByCategoryName = (array: ISubOption[] | null) => {
    if (!array) return;

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
  const handleSelectOption = useCallback(
    (option: ISubOption) => {
      if (!subOption) return;
      setSelectedItem({
        type: 'SET_OPTIONS',
        value: selectedItem.options.some((item) => item.id === option.subOptionId)
          ? selectedItem.options.filter((item) => item.id !== option.subOptionId)
          : [
              ...selectedItem.options,
              {
                id: option.subOptionId,
                name: option.optionName,
                title: option.optionCategoryName,
                imgSrc: option.optionImage,
                price: option.optionPrice,
              },
            ],
      });

      setTotalPrice((prevTotalPrice) =>
        selectedItem.options.some((item) => item.id === option.subOptionId)
          ? prevTotalPrice - option.optionPrice
          : prevTotalPrice + option.optionPrice
      );
    },
    [subOption, selectedItem, setSelectedItem, setTotalPrice]
  );
  useEffect(() => {
    if (!displayData || !query) {
      return;
    }
    handleSearch(query);
  }, [query, displayData, handleSearch]);

  useEffect(() => {
    setDisplayData(filteredByCategory);
  }, [filteredByCategory]);
  const setQueryCallback = useCallback(setQuery, [setQuery]);
  useEffect(() => {
    if (!subOption || !groupedData) return;
    const filteredByCategory =
      currentCategory === '전체' ? subOption : groupedData![currentCategory];
    setFilteredByCategory(filteredByCategory);
    setQueryCallback(null);
  }, [subOption, currentCategory, setQueryCallback, groupedData]);

  useLayoutEffect(() => {
    handleSelectOption;
  }, [subOption, selectedItem, setSelectedItem, setTotalPrice, handleSelectOption]);

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };
  const handleCardClick = (index: number) => {
    setCurrentOptionIdx(index);
  };
  if (!groupedData) return;
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

  const displayOptionList = displayData.map((option, idx) => (
    <CardWrapper key={idx}>
      <OptionCard
        onClick={() => handleCardClick(option.subOptionId)}
        type="sub"
        active={!!selectedItem.options.find((item) => item.id === option.subOptionId)}
        desc={`${option.percentage}%의 선택`}
        title={option.optionName}
        price={option.optionPrice}
        imgPath={option.optionImage}
        hashTag={option.hashtagName}
        handleSelectOption={() => handleSelectOption(option)}
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
            <OptionWrapper>{displayOptionList}</OptionWrapper>
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
