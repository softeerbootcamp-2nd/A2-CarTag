import { styled } from 'styled-components';
import {
  BodyKrMedium4,
  BodyKrRegular4,
  BodyKrRegular5,
  HeadingKrRegular2,
} from '../../styles/typefaces';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import Banner from '../../components/common/banner/Banner';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import OptionTab from '../../components/tabs/OptionTab';
import { useContext, useEffect, useState } from 'react';
import { IMG_URL, OPTION_API } from '../../utils/apis';
import { DefaultOptionContext } from '../../context/DefaultOptionProvider';
import { SubOptionContext } from '../../context/SubOptionProvider';
import { CAR_TYPE } from '../../utils/constants';
import { useFetch } from '../../hooks/useFetch';

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

export interface IOptionDetail {
  categoryName: string;
  optionName: string;
  optionDescription: string;
  optionImage: string;
  hmgData: IHmgData | null;
  subOptionList: ISubOptionList[] | null;
  package: boolean;
}

interface IOptionBannerContainer {
  isDefault: boolean;
}
export default function OptionBannerContainer({ isDefault }: IOptionBannerContainer) {
  const defaultOptionContext = useContext(DefaultOptionContext);
  const subOptionContext = useContext(SubOptionContext);
  const { currentOptionIdx } = isDefault ? defaultOptionContext : subOptionContext;
  const optionType = isDefault ? 'default' : 'sub';

  const { data: optionDetail, loading: optionDetailLoading } = useFetch<IOptionDetail>(
    `${OPTION_API}/${optionType}/detail/?carid=${CAR_TYPE}&optionid=${currentOptionIdx}`
  );

  const [bannerInfo, setBannerInfo] = useState<IOptionDetail>({
    categoryName: '',
    hmgData: null,
    optionDescription: '',
    optionImage: '',
    optionName: '',
    package: false,
    subOptionList: null,
  });
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const handleBannerVisibility = () => {
    setIsBannerVisible(!isBannerVisible);
  };
  const [winY, setWinY] = useState(0);
  const handleScroll = () => {
    setWinY(window.scrollY);
  };
  const [visibleDesc, setVisibleDesc] = useState(false);

  const handleDescVisibility = (visible: boolean) => {
    setVisibleDesc(visible);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!optionDetail) return;
    const target = optionDetail.subOptionList ? optionDetail.subOptionList[0] : optionDetail;
    setBannerInfo({
      categoryName: target.categoryName,
      hmgData: target.hmgData,
      optionDescription: target.optionDescription,
      optionImage: target.optionImage,
      optionName: target.optionName,
      package: target.package,
      subOptionList: target.subOptionList,
    });
  }, [optionDetail]);

  return (
    <>
      {optionDetail && !optionDetailLoading && (
        <Wrapper $isBannerVisible={isBannerVisible}>
          <OptionBanner subtitle={bannerInfo.categoryName} title={optionDetail.optionName}>
            <ContainerWrapper>
              <Container>
                <InfoWrapper>
                  {optionDetail.package && (
                    <OptionTab
                      options={optionDetail.subOptionList!}
                      setBannerInfo={setBannerInfo}
                    />
                  )}
                  {bannerInfo.optionDescription && (
                    <Description
                      onMouseLeave={() => handleDescVisibility(false)}
                      onMouseOver={() => handleDescVisibility(true)}
                    >
                      <AdditionalText>{bannerInfo.optionDescription}</AdditionalText>

                      <HoverCaption $visible={visibleDesc}>
                        {bannerInfo.optionDescription}
                      </HoverCaption>
                    </Description>
                  )}

                  {bannerInfo.hmgData?.optionBoughtCount && (
                    <HmgDataSection>
                      <HmgTag size="small" />
                      <DataList>
                        {bannerInfo.hmgData.optionBoughtCount !== null && (
                          <Data>
                            <DataTitle>
                              {bannerInfo.hmgData.overHalf
                                ? '구매자의 절반 이상이 선택했어요.'
                                : '구매자가 이 옵션을 이만큼 선택했어요.'}
                            </DataTitle>
                            <DataInfo>
                              {Number(bannerInfo.hmgData.optionBoughtCount).toLocaleString()}개
                              <DataCaption>최근 90일 동안</DataCaption>
                            </DataInfo>
                          </Data>
                        )}
                        {bannerInfo.hmgData.optionUsedCount !== null && (
                          <Data>
                            <DataTitle>주행 중 실제로 이만큼 사용해요.</DataTitle>
                            <DataInfo>
                              {bannerInfo.hmgData.optionUsedCount}번
                              <DataCaption>1.5만km 당</DataCaption>
                            </DataInfo>
                          </Data>
                        )}
                      </DataList>
                    </HmgDataSection>
                  )}
                </InfoWrapper>

                <ToastPopup
                  $offsetY={winY}
                  $isBannerVisible={isBannerVisible}
                  onClick={handleBannerVisibility}
                >
                  {isBannerVisible ? '이미지 접기' : '이미지 확인'}
                </ToastPopup>
              </Container>
              {bannerInfo.optionImage ? (
                <ImgSection src={`${IMG_URL}${bannerInfo.optionImage}`} />
              ) : (
                <ImgSection src={`${IMG_URL}${optionDetail.optionImage}`} />
              )}
            </ContainerWrapper>
          </OptionBanner>
        </Wrapper>
      )}
    </>
  );
}
const HoverCaption = styled.div<{ $visible: boolean }>`
  white-space: pre-wrap;
  padding: 4px 12px;
  border-radius: 10px;
  position: relative;
  color: ${({ theme }) => theme.color.gray50};
  opacity: 90%;
  margin-top: 10px;
  z-index: 1;
  width: 448px;
  background-color: ${({ theme }) => theme.color.gray900};
  ${BodyKrRegular4}
  &:after {
    content: '';
    position: absolute;
    left: 10%;
    bottom: 100%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-bottom-color: ${({ theme }) => theme.color.gray900};
    border-width: 3px;
  }
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;
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
  height: 100%;
`;
const OptionBanner = styled(Banner)`
  height: 360px;
  background: ${({ theme }) => theme.color.blueBg};
`;

const Container = styled(CenterWrapper)`
  position: relative;
  height: 100%;
`;

const Description = styled.div`
  position: relative;
`;

const AdditionalText = styled.div`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: keep-all;
  width: 456px;
  color: ${({ theme }) => theme.color.gray800};
  ${BodyKrRegular4}
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  position: absolute;
  top: 140px;
`;

const ToastPopup = styled.button<{ $offsetY: number; $isBannerVisible: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  bottom: 50px;
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
  position: absolute;
  top: 80px;
`;
const DataList = styled.ul`
  display: flex;
  width: 448px;
  margin-top: 16px;
  align-items: center;
  gap: 24px;
`;
const Data = styled.li`
  width: 100%;
  height: 67px;
  display: flex;
  flex-direction: column;
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

const ImgSection = styled.img`
  position: absolute;
  width: 632px;
  height: 360px;
`;
