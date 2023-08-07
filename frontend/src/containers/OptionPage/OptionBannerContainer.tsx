import { styled } from 'styled-components';
import { BodyKrRegular5, HeadingKrRegular2 } from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import Banner from '../../components/banner/Banner';
import HmgTag from '../../components/hmgTag/HmgTag';
import PriceStaticBar from '../../components/priceStaticBar/PriceStaticBar';

export default function OptionBannerContainer() {
  return (
    <>
      <PriceStaticBar />
      <OptionBanner
        subtitle={'파워트레인/성능'}
        title={'컴포트 ll'}
        desc={
          '초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게 경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다. 더보기'
        }
      >
        <Container>
          <HmgDataSection>
            <HmgTag size="small" />
            <DataList>
              <Data>
                <DataTitle>최고출력(PS/rpm)</DataTitle>
                <DataInfo>
                  202/3,800
                  <DataRatio>
                    <Ratio $current={0.49} $max={0.53}></Ratio>
                  </DataRatio>
                </DataInfo>
              </Data>
              <Separator />
              <Data>
                <DataTitle>최대토크(kgf·m/rpm)</DataTitle>
                <DataInfo>
                  45/1,750-2,750
                  <DataRatio>
                    <Ratio $current={0.005} $max={0.02}></Ratio>
                  </DataRatio>
                </DataInfo>
              </Data>
            </DataList>
          </HmgDataSection>
          <ImgSection />
        </Container>
      </OptionBanner>
    </>
  );
}

const OptionBanner = styled(Banner)`
  background: ${({ theme }) => theme.color.blueBg};
`;

const Container = styled(CenterWrapper)`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const HmgDataSection = styled.div`
  padding-top: 202px;
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

const Separator = styled(Data)`
  width: 1px;
  height: 41px;
  background-color: ${({ theme }) => theme.color.gray200};
`;

const DataTitle = styled.div`
  margin-bottom: 8px;
  ${BodyKrRegular5}
  color: ${({ theme }) => theme.color.gray600};
`;
const DataInfo = styled.div`
  ${HeadingKrRegular2}
`;
const DataRatio = styled.div`
  height: 4px;
  background-color: ${({ theme }) => theme.color.gray200};
`;
const Ratio = styled.div<{ $current: number; $max: number }>`
  height: 4px;
  width: ${(props) => (props.$current / props.$max) * 100}%;
  background-color: ${({ theme }) => theme.color.activeBlue2};
`;

// const ImgSection = styled.div`
//   width: 632px;
//   height: 360px;
//   background:
//     url('/images/option_roa.png'),
//     rgba(211, 211, 211, 0.5) / cover no-repeat;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-color: lightgray 50%;
//   background-color: rgba(211, 211, 211, 0.5);
// `;

const ImgSection = styled.div`
  width: 632px;
  height: 360px;
  background-image: url('/images/option_roa.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(211, 211, 211, 0.5); /* "lightgray"에 50%의 투명도 적용 */
`;
