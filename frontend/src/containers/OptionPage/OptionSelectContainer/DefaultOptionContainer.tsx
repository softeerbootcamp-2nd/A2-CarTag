import { styled } from 'styled-components';
import { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import {
  DefaultOptionContext,
  IDefaultOption,
} from '../../../context/PageProviders/DefaultOptionProvider';
import HmgTag from '../../../components/common/hmgTag/HmgTag';
import { DEBOUNCE_TIME } from '../../../utils/constants';
interface IDefaultOptionContainer {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  setResult: Dispatch<React.SetStateAction<string[]>>;
  imgBlobUrl: { [key: string]: string };
}
export default function DefaultOptionContainer({
  query,
  setQuery,
  setResult,
  imgBlobUrl,
}: IDefaultOptionContainer) {
  const [filteredByCategory, setFilteredByCategory] = useState<IDefaultOption[]>([]);
  const [currentCategory, setCurrentCategory] = useState('전체');
  const { defaultOption, currentOptionIdx, setCurrentOptionIdx } = useContext(DefaultOptionContext);
  const setQueryCallback = useCallback(setQuery, [setQuery]);
  const [displayData, setDisplayData] = useState<IDefaultOption[]>([]);
  const setResultCallback = useCallback(setResult, [setResult]);
  const groupByCategoryName = (array: IDefaultOption[] | null) => {
    if (!array) return;

    return array.reduce((acc: Record<string, IDefaultOption[]>, current: IDefaultOption) => {
      const optionCategoryName = current.optionCategoryName;
      if (!acc[optionCategoryName]) {
        acc[optionCategoryName] = [];
      }
      acc[optionCategoryName].push(current);
      return acc;
    }, {});
  };
  const groupedData = useRef(groupByCategoryName(defaultOption!));

  const handleSearch = useCallback(
    (query: string) => {
      const filteredResults = filteredByCategory.filter((option) => {
        const keyword = query.toLowerCase();
        const optionName = option.optionName.toLowerCase();
        return optionName.includes(keyword);
      });
      setDisplayData(filteredResults);
      setResultCallback(filteredResults.map((option) => option.optionName));
    },
    [filteredByCategory, setResultCallback]
  );

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  const handleCardClick = (index: number) => {
    setCurrentOptionIdx(index);
  };

  useEffect(() => {
    groupedData.current = groupByCategoryName(defaultOption);
  }, [defaultOption]);

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
    if (!defaultOption || !groupedData.current) return;
    const category =
      currentCategory === '전체' ? defaultOption : groupedData.current[currentCategory];
    setQueryCallback('');
    setResultCallback([]);
    setFilteredByCategory(category);
    setDisplayData(category);
  }, [defaultOption, currentCategory, setQueryCallback, setResultCallback]);

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
    <CardWrapper key={idx}>
      <OptionCard
        onClick={() => {
          handleCardClick(option.optionId);
        }}
        type="default"
        active={currentOptionIdx === option.optionId}
        option={option}
        imgBlobUrl={imgBlobUrl}
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
