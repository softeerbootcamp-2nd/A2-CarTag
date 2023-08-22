import { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { ISubOption, SubOptionContext } from '../../../context/PageProviders/SubOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';
import { ItemContext } from '../../../context/ItemProvider';
import { DEBOUNCE_TIME } from '../../../utils/constants';

interface ISubOptionContainer {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  setResult: Dispatch<React.SetStateAction<string[]>>;
}

export default function SubOptionContainer({ query, setQuery, setResult }: ISubOptionContainer) {
  const [filteredByCategory, setFilteredByCategory] = useState<ISubOption[]>([]);
  const [displayData, setDisplayData] = useState<ISubOption[]>([]);
  const setResultCallback = useCallback(setResult, [setResult]);

  const handleSearch = useCallback(
    (query: string) => {
      const resultOptionNames: string[] = [];
      const resultHashtags: string[] = [];

      const filteredResults = filteredByCategory.filter((option) => {
        const keyword = query.toLowerCase();
        const optionName = option.optionName.toLowerCase();
        const hashtags = option.hashtagName.map((tag) => tag.toLowerCase());

        const optionMatches = optionName.includes(keyword);
        const hashtagMatches = hashtags.some((tag) => tag.includes(keyword));

        if (optionMatches && !resultOptionNames.includes(option.optionName)) {
          resultOptionNames.push(option.optionName);
        }

        if (hashtagMatches) {
          hashtags.forEach((tag) => {
            if (tag.includes(keyword) && !resultHashtags.includes(tag)) {
              resultHashtags.push(tag);
            }
          });
        }
        return optionMatches || hashtagMatches;
      });

      setDisplayData(filteredResults);
      setResultCallback([...resultOptionNames, ...resultHashtags]);
    },
    [filteredByCategory, setResultCallback]
  );

  const [currentCategory, setCurrentCategory] = useState('전체');
  const { subOption, currentOptionIdx, setCurrentOptionIdx } = useContext(SubOptionContext);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const setQueryCallback = useCallback(setQuery, [setQuery]);
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
  const groupedData = useRef(groupByCategoryName(subOption));

  const handleSelectOption = useCallback(
    (option: ISubOption) => {
      if (!subOption) return;
      const existingWheelOptionIdx = selectedItem.options.findIndex(
        (item) => item.title === '휠' && item.id !== option.subOptionId
      );
      if (option.optionCategoryName === '휠' && existingWheelOptionIdx !== -1) {
        selectedItem.options.splice(existingWheelOptionIdx, 1);
      }
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
    },
    [subOption, selectedItem, setSelectedItem]
  );

  useEffect(() => {
    groupedData.current = groupByCategoryName(subOption);
  }, [subOption]);

  useEffect(() => {
    if (!filteredByCategory || !query) {
      setDisplayData(filteredByCategory);

      return;
    }

    const debounce = setTimeout(() => {
      if (query) handleSearch(query);
    }, DEBOUNCE_TIME);
    return () => {
      clearTimeout(debounce);
    };
  }, [query, filteredByCategory, handleSearch, setResult]);

  useEffect(() => {
    if (!subOption || !groupedData.current) return;
    const category = currentCategory === '전체' ? subOption : groupedData.current[currentCategory];
    setQueryCallback('');
    setResultCallback([]);
    setFilteredByCategory(category);
    setDisplayData(category);
  }, [subOption, currentCategory, setQueryCallback, setResultCallback]);

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };
  const handleCardClick = (index: number) => {
    setCurrentOptionIdx(index);
  };
  if (!groupedData.current) return;
  const displayCategory = Object.keys(groupedData.current).map((key) => (
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
    <CardWrapper key={idx} onClick={() => handleCardClick(option.subOptionId)}>
      <OptionCard
        type="sub"
        active={currentOptionIdx === option.subOptionId}
        option={option}
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
  cursor: pointer;
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
