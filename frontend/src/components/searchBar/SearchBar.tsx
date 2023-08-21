import { styled } from 'styled-components';
import { BodyKrRegular4 } from '../../styles/typefaces';
import { SearchIcon } from '../common/icons/Icons';
import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';

interface SearchBarProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  result: string[];
  setQuery: Dispatch<React.SetStateAction<string>>;
}
export default function SearchBar({ value, result, setQuery, ...props }: SearchBarProps) {
  const [visibleAutoBox, setVisibleAutoBox] = useState(true);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const displayData = result.map((res, index) => (
    <AutoSearchData key={index}>{res}</AutoSearchData>
  ));
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      if (searchBarRef.current && !searchBarRef.current.contains(target)) {
        setVisibleAutoBox(false);
        return;
      }
      if (target.closest('li')?.innerText !== undefined) {
        setQuery(target.closest('li')!.innerText!);
        setVisibleAutoBox(false);
      }
    },
    [setQuery]
  );
  useEffect(() => {
    window.addEventListener('click', (e) => handleClick(e));
    return () => {
      window.removeEventListener('click', (e) => handleClick(e));
    };
  }, [handleClick]);

  useEffect(() => {
    setVisibleAutoBox(true);
  }, [value]);
  return (
    <Wrapper ref={searchBarRef}>
      <Input value={value} {...props} />
      <Button>
        <SearchIcon width={18} height={18} />
      </Button>
      <AutoSearchContainer $visible={result.length > 0 && visibleAutoBox}>
        <AutoSearchWrapper>{displayData}</AutoSearchWrapper>
      </AutoSearchContainer>
    </Wrapper>
  );
}
const AutoSearchContainer = styled.div<{ $visible: boolean }>`
  ${BodyKrRegular4}
  z-index: 1;
  width: 400px;
  height: 204px;
  overflow-y: scroll;
  top: 31px;
  left: -1px;
  position: absolute;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-top: none;
  color: ${({ theme }) => theme.color.gray900};
  background-color: ${({ theme }) => theme.color.gray50};
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
`;

const AutoSearchWrapper = styled.ul``;

const AutoSearchData = styled.li`
  padding: 8px 16px;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.color.activeBlue2};
    color: ${({ theme }) => theme.color.white};
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
`;

const Input = styled.input.attrs(({ value }) => ({
  value: value,
}))`
  padding: 4px 16px;
  ${BodyKrRegular4}
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.color.gray900};

  :focus {
    outline: none;
    border: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.gray600};
  }
`;

const Button = styled.button`
  width: 67px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray100};
`;
