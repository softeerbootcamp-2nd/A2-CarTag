import { styled } from 'styled-components';
import { BodyKrMedium3, BodyKrRegular5, HeadingKrRegular2 } from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import Banner from '../../components/banner/Banner';
import HmgTag from '../../components/hmgTag/HmgTag';

export default function TrimBanner() {
  return (
    <Banner subtitle={'기본에 충실한 펠리세이드'} title={'Le blanc'}>
      <Container>
        <HmgDataSection>
          <HmgTag size="small" />
          <HmgTagDescription>
            해당 트림 포함된 옵션들의
            <BlueText>실활용 데이터</BlueText>에요.
          </HmgTagDescription>
          <DataList>
            <Data>
              <DataTitle>안전 하차 보조</DataTitle>
              <DataInfo>
                42회
                <DataCaption>15,000km 당</DataCaption>
              </DataInfo>
            </Data>
            <Data>
              <DataTitle>후측방 충돌 경고</DataTitle>
              <DataInfo>
                42회
                <DataCaption>15,000km 당</DataCaption>
              </DataInfo>
            </Data>
            <Data>
              <DataTitle>후방 교차 충돌 방지 경고</DataTitle>
              <DataInfo>
                42회
                <DataCaption>15,000km 당</DataCaption>
              </DataInfo>
            </Data>
          </DataList>
        </HmgDataSection>
        <ImgSection></ImgSection>
      </Container>
    </Banner>
  );
}

const Container = styled(CenterWrapper)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  height: 100%;
`;
const HmgDataSection = styled.div`
  padding-top: 166px;
`;
const ImgSection = styled.div`
  border: 1px solid blue;
`;
const HmgTagDescription = styled.div`
  ${BodyKrMedium3}
  margin-top: 12px;
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue};
`;
const DataList = styled.ul`
  display: flex;
  gap: 52px;
  margin-top: 16px;
`;
const Data = styled.li`
  display: flex;
  flex-direction: column;
  width: 60px;
`;
const DataTitle = styled.div`
  ${BodyKrRegular5}
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
  word-break: keep-all;
  color: ${({ theme }) => theme.color.gray900};
`;
const DataInfo = styled.div`
  margin-top: 6px;
  ${HeadingKrRegular2}
`;
const DataCaption = styled.div`
  ${BodyKrRegular5}
  color: ${({ theme }) => theme.color.gray600};
`;
