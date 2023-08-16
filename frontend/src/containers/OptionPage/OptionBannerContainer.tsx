import { styled } from 'styled-components';
import {
  BodyKrMedium4,
  BodyKrRegular4,
  BodyKrRegular5,
  HeadingKrRegular2,
} from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import Banner from '../../components/common/banner/Banner';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import OptionTab from '../../components/tabs/OptionTab';
import { MAX_TEXT_CNT } from '../../utils/constants';
import { useContext, useEffect, useState } from 'react';
import { OPTION_API } from '../../utils/apis';
import { useFetch } from '../../hooks/useFetch';
import { SubOptionContext } from '../../context/SubOptionProvider';

interface IOptionDetail {
  categoryName: string;
  optionName: string;
  optionDescription: string;
  optionImage: string;
  hmgData: IHmgData | null;
  subOptionList: ISubOptionList[] | null;
  package: boolean;
}
interface IHmgData {
  optionBoughtCount: number;
  optionUsedCount: number;
  overHalf: boolean;
}

export interface ISubOptionList {
  categoryName: string;
  hmgData: IHmgData | null;
  optionDescription: string;
  optionImage: string;
  optionName: string;
  package: false;
  subOptionList: null;
}
export default function OptionBannerContainer() {
  const { currentOptionIdx } = useContext(SubOptionContext);

  const { data: optionDetail, loading: optionDetailLoading } = useFetch<IOptionDetail>(
    `${OPTION_API}/optiondetail?carid=${1}&optionid=${currentOptionIdx}`
  );

  console.log(optionDetail);

  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const optionDesc =
    '초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다. 초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다.  ';
  const displayText =
    optionDesc.length > MAX_TEXT_CNT ? optionDesc.substring(0, MAX_TEXT_CNT) + '...' : optionDesc;
  const handleBannerVisibility = () => {
    setIsBannerVisible(!isBannerVisible);
  };
  const [winY, setWinY] = useState(0);
  const handleScroll = () => {
    setWinY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {optionDetail && !optionDetailLoading && (
        <Wrapper $isBannerVisible={isBannerVisible}>
          <OptionBanner subtitle={'TODO'} title={optionDetail.optionName}>
            <ContainerWrapper>
              <Container>
                <InfoWrapper>
                  {optionDetail.subOptionList && <OptionTab options={optionDetail.subOptionList} />}
                  <AdditionalText>
                    {displayText}
                    {optionDetail?.optionDescription.length > MAX_TEXT_CNT && <span>더보기</span>}
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
                <ToastPopup
                  $offsetY={winY}
                  $isBannerVisible={isBannerVisible}
                  onClick={handleBannerVisibility}
                >
                  {isBannerVisible ? '이미지 접기' : '이미지 확인'}
                </ToastPopup>
              </Container>
              <ImgSection />
            </ContainerWrapper>
          </OptionBanner>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div<{ $isBannerVisible: boolean }>`
  z-index: 5;
  position: sticky;
  top: ${({ $isBannerVisible }) => ($isBannerVisible ? '60' : '-150')}px;
  transition: top 0.3s ease;

  left: 0;
`;

const ContainerWrapper = styled(CenterWrapper)`
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

const ToastPopup = styled.button<{ $offsetY: number; $isBannerVisible: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translate(-50%, 50%);
  z-index: 10;
  width: 76px;
  height: 28px;
  border-radius: 20px;
  background: rgba(117, 117, 117, 0.5);
  backdrop-filter: blur(2px);
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  ${BodyKrMedium4}
  display:    ${({ $offsetY, $isBannerVisible }) =>
    ($offsetY >= 200 && !$isBannerVisible) || $offsetY ? 'block' : 'none'};
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
