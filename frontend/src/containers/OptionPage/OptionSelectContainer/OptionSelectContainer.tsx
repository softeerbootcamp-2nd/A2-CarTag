import { css, styled } from 'styled-components';
import CenterWrapper from '../../../components/layout/CenterWrapper';
import { BodyKrMedium1 } from '../../../styles/typefaces';
import SearchBar from '../../../components/searchBar/SearchBar';
import DefaultOptionContainer from './DefaultOptionContainer';
import SubOptionContainer from './SubOptionContainer';
import React, { useState } from 'react';

interface INavItem extends React.HTMLAttributes<HTMLLIElement> {
  active: boolean;
}

interface IOptionSelectContainer {
  isDefault: boolean;
  handleTabItemClick: (isDefault: boolean) => void;
}

export default function OptionSelectContainer({
  isDefault,
  handleTabItemClick,
}: IOptionSelectContainer) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const handleInputChange = (query: string) => {
    setQuery(query);
  };

  return (
    <Wrapper>
      <Header>
        <CategoryList>
          <CategoryItem onClick={() => handleTabItemClick(false)} active={!isDefault}>
            추가옵션
          </CategoryItem>
          <CategoryItem onClick={() => handleTabItemClick(true)} active={isDefault}>
            기본옵션
          </CategoryItem>
        </CategoryList>
        {isDefault ? (
          <SearchBar
            value={query}
            result={result}
            setQuery={setQuery}
            onChange={(e) => {
              handleInputChange(e.currentTarget.value);
            }}
            placeholder="옵션명로 검색해보세요."
          />
        ) : (
          <SearchBar
            value={query}
            result={result}
            setQuery={setQuery}
            onChange={(e) => {
              handleInputChange(e.currentTarget.value);
            }}
            placeholder="옵션명, 해시태그로 검색해보세요."
          />
        )}
      </Header>

      {isDefault ? (
        <DefaultOptionContainer query={query} setQuery={setQuery} setResult={setResult} />
      ) : (
        <SubOptionContainer query={query} setQuery={setQuery} setResult={setResult} />
      )}
    </Wrapper>
  );
}

function CategoryItem({ active, ...props }: INavItem) {
  const Highlight = active ? <Underline /> : <Underline style={{ visibility: 'hidden' }} />;
  return (
    <Item {...props} $active={active}>
      {props.children}
      {Highlight}
    </Item>
  );
}

const CategoryList = styled.ul`
  display: flex;
  gap: 24px;
`;
const Item = styled.li<{ $active: boolean }>`
  ${BodyKrMedium1}
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 28px;
  gap: 2px;
  cursor: pointer;

  ${({ theme, $active }) => {
    if ($active) {
      return css`
        color: ${theme.color.gray900};
      `;
    } else {
      return css`
        color: ${theme.color.gray200};
      `;
    }
  }}
`;

const Underline = styled.div`
  width: 18px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.primaryColor};
`;

const Wrapper = styled(CenterWrapper)``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;
`;
