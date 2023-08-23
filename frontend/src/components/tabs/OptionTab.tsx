import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react';
import { BodyKrMedium3, BodyKrRegular3, BodyKrRegular4 } from '../../styles/typefaces';
import styled, { css, useTheme } from 'styled-components';
import { ArrowLeft, ArrowRight } from '../common/icons/Icons';
import { NUM_IN_A_PAGE } from '../../utils/constants';
import { IOptionDetail, ISubOptionList } from '../../containers/OptionPage/OptionBannerContainer';

interface ISubOptionTab extends HTMLAttributes<HTMLDivElement> {
  options: ISubOptionList[];
  setBannerInfo: Dispatch<SetStateAction<IOptionDetail>>;
}

export default function OptionTab({ options, setBannerInfo }: ISubOptionTab) {
  const theme = useTheme();
  const TAB_MAX_PAGE = options.length / NUM_IN_A_PAGE;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [page, setPage] = useState(0);
  const arrowLeftColor = page <= 0 ? theme.color.gray200 : theme.color.gray600;
  const arrowRightColor = page >= TAB_MAX_PAGE - 1 ? theme.color.gray200 : theme.color.gray600;
  const tabDivisionRef = useRef<HTMLDivElement>(null);
  const [tabDivisionWidth, setTabDivisionWidth] = useState(0);

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
    changeInfo(0, page + 1);
  };
  const handleOffsetPrev = () => {
    if (page - 1 < 0) return;
    setSelectedIdx(0);
    setPage(page - 1);
    changeInfo(0, page - 1);
  };

  const handleOptionClick = (index: number) => {
    setSelectedIdx(index);
    changeInfo(index, page);
  };

  const chunkArray = (array: ISubOptionList[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const chunkedOptions = chunkArray(options, NUM_IN_A_PAGE);
  const changeInfo = (idx: number, page: number) => {
    const index = page * NUM_IN_A_PAGE + idx;
    if (options && options.length > 0) {
      setBannerInfo({
        categoryName: options[index].categoryName,
        optionDescription: options[index].optionDescription,
        optionImage: options[index].optionImage,
        hmgData: options[index].hmgData,
        optionName: options[index].optionName,
        package: options[index].package,
        subOptionList: options[index].subOptionList,
      });
    }
  };
  useEffect(() => {
    setSelectedIdx(0);
    setPage(0);
  }, [options]);

  useEffect(() => {
    if (tabDivisionRef.current) {
      const tabDivisionWidth = tabDivisionRef.current.offsetWidth;
      setTabDivisionWidth(tabDivisionWidth);
    }
  }, [tabDivisionRef]);

  return (
    <>
      <TabWrapper>
        <BtnWrapper
          onClick={handleOffsetPrev}
          style={{ cursor: page <= 0 ? 'default' : 'pointer' }}
        >
          <ArrowLeft fill={arrowLeftColor} />
        </BtnWrapper>
        <TabWrapperInner ref={tabDivisionRef}>
          <Tab $offset={page * -tabDivisionWidth}>
            {chunkedOptions.map((optionGroup: ISubOptionList[], groupIndex) => (
              <TabDivision key={groupIndex} $display={page === groupIndex}>
                {optionGroup.map((option: ISubOptionList, index: number) => (
                  <TabButtonWrapper key={index}>
                    <TabButton
                      onClick={() => handleOptionClick(index)}
                      $isselected={page === groupIndex && index === selectedIdx}
                    >
                      <div>{option.optionName}</div>
                      {displayUnderline(groupIndex, index)}
                    </TabButton>
                    <HoverCaption>{option.optionName}</HoverCaption>
                  </TabButtonWrapper>
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
    </>
  );
}
const HoverCaption = styled.div`
  z-index: 2;

  display: none;
  white-space: nowrap;
  left: 0;
  top: -30px;
  position: absolute;
  padding: 4px 12px;
  text-align: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray900};
  color: ${({ theme }) => theme.color.white};
  ${BodyKrRegular4}
  &:after {
    content: '';
    position: absolute;
    left: 30%;
    top: 100%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-top-color: ${({ theme }) => theme.color.gray900};
    border-width: 3px;
  }
`;
const TabWrapper = styled.div`
  width: 488px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BtnWrapper = styled.button`
  z-index: 10;
`;
const Tab = styled.div<{ $offset: number }>`
  /* display: flex; */
  /* transition: transform 0.4s ease; */
  /* transform: translateX(${({ $offset }) => $offset}px); */
`;
const TabWrapperInner = styled.div`
  /* overflow: hidden; */
  width: 408px;
  height: 100%;
`;
const TabDivision = styled.ul<{ $display: boolean }>`
  width: 408px;
  padding: 0 16px;
  display: ${({ $display }) => ($display ? 'flex' : 'none')};
`;
const TabButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  position: relative;
  height: 100%;
  &:hover {
    ${HoverCaption} {
      display: block;
    }
  }
`;
const TabButton = styled.div<{ $isselected: boolean }>`
  display: flex;
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
