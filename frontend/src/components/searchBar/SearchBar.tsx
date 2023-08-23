import { styled } from 'styled-components';
import { BodyKrRegular4 } from '../../styles/typefaces';
import { NorthWest, SearchIcon } from '../common/icons/Icons';
import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { flexCenterCss } from '../../utils/commonStyle';

interface SearchBarProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  result: string[];
  setQuery: Dispatch<React.SetStateAction<string>>;
  setResult: Dispatch<React.SetStateAction<string[]>>;
}

interface IKeyEvent {
  [key: string]: () => void;
}
export default function SearchBar({
  value,
  result,
  setQuery,
  setResult,
  ...props
}: SearchBarProps) {
  const [focusIndex, setFocusIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const [visibleAutoBox, setVisibleAutoBox] = useState(true);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const displayData = result.map((res, index) => (
    <ListItem $focus={index === focusIndex}>
      <AutoSearchData key={index}>{res}</AutoSearchData>
      <IconBtn>
        <NorthWest active={index === focusIndex} />
      </IconBtn>
    </ListItem>
  ));

  const KeyEvent: IKeyEvent = {
    Enter: () => {
      focusIndex >= 0 ? setQuery(result[focusIndex]) : setQuery(value);
      setVisibleAutoBox(false);
    },
    ArrowDown: () => {
      if (result.length === 0) {
        return;
      }
      if (listRef.current && listRef.current.childElementCount === focusIndex + 1) {
        setFocusIndex(() => 0);
        return;
      }
      setFocusIndex((index) => index + 1);
    },
    ArrowUp: () => {
      if (focusIndex === -1) {
        return;
      }
      if (focusIndex === 0) {
        setFocusIndex((index) => index - 1);
        return;
      }
      setFocusIndex((index) => index - 1);
    },
    Escape: () => {
      setFocusIndex(-1);
    },
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setVisibleAutoBox(true);
    if (KeyEvent[e.key]) {
      KeyEvent[e.key]();
    }
  };

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      const isOutsideSearchBox = searchBarRef.current && !searchBarRef.current.contains(target);
      if (isOutsideSearchBox) {
        setVisibleAutoBox(false);
      } else if (target.closest('li')?.innerText !== undefined) {
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

  useEffect(() => {}, [focusIndex]);

  useEffect(() => {
    if (!value) {
      setResult([]);
      setVisibleAutoBox(false);
      return;
    }
    setFocusIndex(-1);
  }, [value, visibleAutoBox, result, setResult]);

  return (
    <Wrapper ref={searchBarRef}>
      <Input value={value} onKeyUp={(e) => handleKeyUp(e)} {...props} />
      <Button>
        <SearchIcon width={18} height={18} />
      </Button>
      <AutoSearchContainer $visible={result.length > 0 && visibleAutoBox}>
        <AutoSearchWrapper ref={listRef}>{displayData}</AutoSearchWrapper>
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
const ListItem = styled.div<{ $focus: boolean }>`
  ${flexCenterCss}
  background-color: ${({ $focus, theme }) => ($focus ? theme.color.activeBlue2 : 'transparent')};
  color: ${({ $focus, theme }) => ($focus ? theme.color.white : theme.color.gray900)};
  &:hover {
    background-color: ${({ theme }) => theme.color.activeBlue2};
    color: ${({ theme }) => theme.color.white};
    opacity: 0.5;
    cursor: pointer;
  }
`;
const Button = styled.button`
  width: 67px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray100};
`;

const IconBtn = styled.button`
  padding: 8px 16px;
`;
