import { css, styled, useTheme } from 'styled-components';
import {
  BodyKrMedium3,
  BodyKrMedium4,
  BodyKrRegular3,
  BodyKrRegular4,
  BodyKrRegular5,
  HeadingKrRegular2,
} from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import Banner from '../../components/common/banner/Banner';
import HmgTag from '../../components/hmgTag/HmgTag';
import PriceStaticBar from '../../components/priceStaticBar/PriceStaticBar';
import { HTMLAttributes, useState } from 'react';
import { ArrowLeft, ArrowRight } from '../../components/common/icons/Icons';

interface ISubOptionTab extends HTMLAttributes<HTMLDivElement> {
  options: string[];
}

export default function OptionBannerContainer() {
  const MAX_TEXT_CNT = 152;
  const suboptions = [
    '후석승객알림',
    '메탈 리어범퍼스텝',
    '메탈 도어스커프',
    '3열파워폴딩시트',
    '내비게이션기반스마트크루즈컨트롤',
    '3열 열선시트',
    '헤드업 디스플레이',
    '3열 열선시트',
    '헤드업 디스플레이',
    '3열 열선시트',
    '11헤드업 디스플레이',
  ];
  const optionDesc =
    '초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다. 초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다.  ';
  const displayText =
    optionDesc.length > MAX_TEXT_CNT ? optionDesc.substring(0, MAX_TEXT_CNT) + '...' : optionDesc;

  return (
    <>
      <PriceStaticBar />
      <OptionBanner subtitle={'파워트레인/성능'} title={'컴포트 ll'}>
        <Wrapper>
          <Container>
            <InfoWrapper>
              <SubOptionTab options={suboptions} />
              <AdditionalText>
                {displayText}
                {optionDesc.length > MAX_TEXT_CNT && <span>더보기</span>}
              </AdditionalText>
              <HmgDataSection>
                <HmgTag size="small" />
                <DataList>
                  <Data>
                    <DataTitle>구매자의 절반 이상이 선택했어요.</DataTitle>
                    <DataInfo>
                      2,384개
                      <DataCaption>최근 90일 동안</DataCaption>
                    </DataInfo>
                  </Data>

                  <Data>
                    <DataTitle>주행 중 실제로 이만큼 사용해요.</DataTitle>
                    <DataInfo>
                      73.2번
                      <DataCaption>1.5만km 당</DataCaption>
                    </DataInfo>
                  </Data>
                </DataList>
              </HmgDataSection>
            </InfoWrapper>
          </Container>
          <ImgSection />
        </Wrapper>
      </OptionBanner>
    </>
  );
}

function SubOptionTab({ options }: ISubOptionTab) {
  const theme = useTheme();
  const MAX_PAGE = options.length / 4;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [page, setPage] = useState(0);
  const arrowLeftColor = page <= 0 ? theme.color.gray200 : theme.color.gray600;
  const arrowRightColor = page >= MAX_PAGE - 1 ? theme.color.gray200 : theme.color.gray600;
  const displayUnderline = (groupIndex: number, index: number) => {
    return page === groupIndex && index === selectedIdx ? (
      <Underline />
    ) : (
      <Underline style={{ visibility: 'hidden' }} />
    );
  };
  const handleOffsetNext = () => {
    if (page + 1 >= MAX_PAGE) return;
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
  const chunkedOptions = chunkArray(options, 4);

  return (
    <TabWrapper>
      <BtnWrapper onClick={handleOffsetPrev} style={{ cursor: page <= 0 ? 'default' : 'pointer' }}>
        <ArrowLeft fill={arrowLeftColor} />
      </BtnWrapper>
      <TabWrapperInner>
        <Tab $offset={page * -408}>
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
        style={{ cursor: page >= MAX_PAGE - 1 ? 'default' : 'pointer' }}
      >
        <ArrowRight fill={arrowRightColor} />
      </BtnWrapper>
    </TabWrapper>
  );
}

const Wrapper = styled(CenterWrapper)`
  display: flex;
  justify-content: flex-end;
  width: 1280px;
`;
const OptionBanner = styled(Banner)`
  background: ${({ theme }) => theme.color.blueBg};
`;

const Container = styled(CenterWrapper)`
  position: relative;
  height: 100%;
`;

const TabWrapper = styled.div`
  width: 488px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  height: 40px;
`;

const TabWrapperInner = styled.div`
  overflow: hidden;
`;
const BtnWrapper = styled.button`
  z-index: 10;
`;
const Tab = styled.div<{ $offset: number }>`
  display: flex;
  justify-content: space-between;
  width: 408px;
  transition: transform 1s ease;
  transform: translateX(${({ $offset }) => $offset}px);
`;

const TabDivision = styled.ul`
  display: flex;
  width: 408px;
`;

const TabButton = styled.div<{ $isselected: boolean }>`
  display: flex;
  flex: 1;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  margin-right: 16px;
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

const AdditionalText = styled.p`
  width: 456px;
  color: ${({ theme }) => theme.color.gray800};
  ${BodyKrRegular4}
  span {
    padding-left: 10px;
    text-decoration: underline;
    ${BodyKrMedium4}
    cursor:pointer;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding-top: 120px;
`;
const HmgDataSection = styled.div`
  margin-top: 12px;
`;
const DataList = styled.ul`
  display: flex;
  width: 448px;
  margin-top: 16px;
  align-items: center;
`;
const Data = styled.li`
  width: 100%;
  height: 67px;
  display: flex;
  flex-direction: column;
  &:first-child {
    padding-right: 24px;
  }

  &:last-child {
    padding-left: 24px;
  }
`;

const DataTitle = styled.div`
  margin-bottom: 8px;
  ${BodyKrMedium4}
  color: ${({ theme }) => theme.color.gray800};
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  white-space: nowrap;
  width: 134px;
`;
const DataInfo = styled.div`
  ${HeadingKrRegular2}
`;
const DataCaption = styled.div`
  ${BodyKrRegular5}
  color: ${({ theme }) => theme.color.gray600};
`;

const ImgSection = styled.div`
  position: absolute;
  width: 632px;
  height: 360px;
  background-image: url('/images/extra_option/roa.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(211, 211, 211, 0.5);
`;
