import { styled } from 'styled-components';
import {
  BodyKrMedium2,
  BodyKrMedium3,
  BodyKrRegular3,
  HeadingKrRegular1,
} from '../../styles/typefaces';
import PriceSummary from '../../components/summary/PriceSummary';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import CenterWrapper from '../../components/layout/CenterWrapper';

export default function ModelFooterContainer() {
  return (
    <Wrapper>
      <HmgDataSection>
        <HmgTag size="small" />
        <HmgInfoWrapper>
          <HmgTagDescription>
            <BlueText>디젤 2.2</BlueText>와 <BlueText>2WD</BlueText>의 배기량과 평균연비입니다.
          </HmgTagDescription>
          <DataList>
            <Data>
              <DataTitle>배기량</DataTitle>
              <DataInfo>2,199cc</DataInfo>
            </Data>
            <Data className="separator" />
            <Data>
              <DataTitle>평균연비</DataTitle>
              <DataInfo>12km/s</DataInfo>
            </Data>
          </DataList>
        </HmgInfoWrapper>
      </HmgDataSection>
      <PriceSummary />
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)`
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
`;
const HmgDataSection = styled.div`
  padding: 0px 48px;
  width: 677px;
  height: 114px;
  background-color: ${({ theme }) => theme.color.blueBg};
`;

const HmgInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const HmgTagDescription = styled.div`
  ${BodyKrMedium3}
  width: 160px;
`;

const BlueText = styled.span`
  ${BodyKrMedium2}
  color: ${({ theme }) => theme.color.activeBlue};
`;

const DataList = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;
const Data = styled.li`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:first-child {
    padding-right: 32px;
  }

  &:last-child {
    padding-left: 32px;
  }

  &.separator {
    width: 1px;
    height: 41px;
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;

const DataTitle = styled.div`
  ${BodyKrRegular3}
  word-break: keep-all;
  color: ${({ theme }) => theme.color.gray900};
`;
const DataInfo = styled.div`
  ${HeadingKrRegular1}
  color: ${({ theme }) => theme.color.gray900};
  font-size: 28px;
`;
