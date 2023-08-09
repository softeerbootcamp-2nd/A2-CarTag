import { styled } from 'styled-components';
import HmgTag from '../common/hmgTag/HmgTag';
import { BodyKrMedium2, BodyKrRegular3, HeadingKrMedium6 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';

export default function BarHistogram() {
  return (
    <HistogramWrapper>
      <HmgTag size="small" />
      <PaddingWrapper>
        <CaptionWrapper>
          <Caption>
            <BlueText>내 견적과 비슷한 실제 출고 견적</BlueText>
            들을 확인하고 비교해보세요.
          </Caption>
          <CaptionDesc>
            유사 출고 견적이란, 내 견적과 해시태그 유사도가 높은 다른 사람들의 실제 출고 견적이에요.
          </CaptionDesc>
        </CaptionWrapper>

        <BarChart>
          <BarItem $active={true}>
            <BarValue> 3,444대</BarValue>
            <Bar $height="100%" $active={true}></Bar>
            <BarItemName>내 견적</BarItemName>
          </BarItem>
          <BarItem>
            <BarValue> 3,444대</BarValue>
            <Bar $height="60%"></Bar>
            <BarItemName>내 견적</BarItemName>
          </BarItem>
          <BarItem>
            <BarValue> 3,444대</BarValue>
            <Bar $height="70%"></Bar>
            <BarItemName>내 견적</BarItemName>
          </BarItem>
          <BarItem>
            <BarValue> 3,444대</BarValue>
            <Bar $height="80%"></Bar>
            <BarItemName>내 견적</BarItemName>
          </BarItem>
          <BarItem>
            <BarValue> 3,444대</BarValue>
            <Bar $height="77%"></Bar>
            <BarItemName>내 견적</BarItemName>
          </BarItem>
        </BarChart>
        <Button>유사 출고 견적 확인하기</Button>
      </PaddingWrapper>
    </HistogramWrapper>
  );
}

const BarChart = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 140px;
`;
const BarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme, $active }) => ($active ? theme.color.activeBlue : theme.color.gray300)};
`;
const BarValue = styled.div`
  ${BodyKrRegular3}
`;
const BarItemName = styled.div`
  ${HeadingKrMedium6}
`;
const CaptionWrapper = styled.div`
  ${BodyKrMedium2}
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  margin-bottom: 20px;
`;
const Caption = styled.div`
  width: 200px;
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue};
`;

const HistogramWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
  margin-top: 38px;
`;

const PaddingWrapper = styled.div`
  padding: 21px 16px;
`;

const CaptionDesc = styled.p`
  width: 280px;
  ${BodyKrRegular3}
  margin-top: 10px;

  color: ${({ theme }) => theme.color.gray500};
`;

const Bar = styled.div<{ $height: string; $active?: boolean }>`
  width: 14px;
  height: ${({ $height }) => $height};
  background-color: ${({ theme, $active }) =>
    $active ? theme.color.activeBlue : theme.color.gray200};
`;

const Button = styled.button`
  ${flexCenterCss};
  ${HeadingKrMedium6};
  background: ${({ theme }) => theme.color.skyBlueCardBg};
  border-radius: 2px;
  color: ${({ theme }) => theme.color.primaryColor};
  width: 100%;
  height: 52px;
  margin-top: 10px;
`;
