import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { BodyKrMedium3, BodyKrRegular3 } from '../../styles/typefaces';
import styled, { css, useTheme } from 'styled-components';
import { ArrowLeft, ArrowRight } from '../common/icons/Icons';
import { NUM_IN_A_PAGE } from '../../utils/constants';

interface ISubOptionTab extends HTMLAttributes<HTMLDivElement> {
  options: string[];
}

export default function OptionTab({ options }: ISubOptionTab) {
  const theme = useTheme();
  const TAB_MAX_PAGE = options.length / NUM_IN_A_PAGE;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [page, setPage] = useState(0);
  const arrowLeftColor = page <= 0 ? theme.color.gray200 : theme.color.gray600;
  const arrowRightColor = page >= TAB_MAX_PAGE - 1 ? theme.color.gray200 : theme.color.gray600;
  const tabDivisionRef = useRef<HTMLDivElement>(null);
  const [tabDivisionWidth, setTabDivisionWidth] = useState(0);

  useEffect(() => {
    if (tabDivisionRef.current) {
      const tabDivisionWidth = tabDivisionRef.current.offsetWidth;
      setTabDivisionWidth(tabDivisionWidth);
    }
  }, [tabDivisionRef]);

  const displayUnderline = (groupIndex: number, index: number) => {
    return page === groupIndex && index === selectedIdx ? (
      <Underline />
    ) : (
      <Underline style={{ visibility: 'hidden' }} />
    );
  };
  const handleOffsetNext = () => {
    if (page + 1 >= TAB_MAX_PAGE) return;
    setSelectedIdx(0);
    setPage(page + 1);
  };
  const handleOffsetPrev = () => {
    if (page - 1 < 0) return;
    setSelectedIdx(0);
    setPage(page - 1);
  };

  const handleOptionClick = (index: number) => {
    setSelectedIdx(index);
  };

  const chunkArray = (array: string[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const chunkedOptions = chunkArray(options, NUM_IN_A_PAGE);

  return (
    <TabWrapper>
      <BtnWrapper onClick={handleOffsetPrev} style={{ cursor: page <= 0 ? 'default' : 'pointer' }}>
        <ArrowLeft fill={arrowLeftColor} />
      </BtnWrapper>
      <TabWrapperInner ref={tabDivisionRef}>
        <Tab $offset={page * -tabDivisionWidth}>
          {chunkedOptions.map((optionGroup: string[], groupIndex) => (
            <TabDivision key={groupIndex}>
              {optionGroup.map((option: string, index: number) => (
                <TabButton
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  $isselected={page === groupIndex && index === selectedIdx}
                >
                  <div>{option}</div>
                  {displayUnderline(groupIndex, index)}
                </TabButton>
              ))}
            </TabDivision>
          ))}
        </Tab>
      </TabWrapperInner>
      <BtnWrapper
        onClick={handleOffsetNext}
        style={{ cursor: page >= TAB_MAX_PAGE - 1 ? 'default' : 'pointer' }}
      >
        <ArrowRight fill={arrowRightColor} />
      </BtnWrapper>
    </TabWrapper>
  );
}

const TabWrapper = styled.div`
  width: 488px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  height: 40px;
`;

const BtnWrapper = styled.button`
  z-index: 10;
`;
const Tab = styled.div<{ $offset: number }>`
  display: flex;

  transition: transform 1s ease;
  transform: translateX(${({ $offset }) => $offset}px);
`;
const TabWrapperInner = styled.div`
  overflow: hidden;
  width: 408px;
`;
const TabDivision = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 408px;
  padding: 0 16px;
`;

const TabButton = styled.div<{ $isselected: boolean }>`
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  width: 78px;
  margin: 0 8px;
  height: 28px;
  cursor: pointer;
  ${({ theme, $isselected }) => {
    if ($isselected) {
      return css`
        ${BodyKrMedium3}
        color: ${theme.color.gray800};
      `;
    } else {
      return css`
        ${BodyKrRegular3}
        color: ${theme.color.gray400};
      `;
    }
  }}

  div:first-child {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Underline = styled.div`
  width: 58px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.gray800};
`;
