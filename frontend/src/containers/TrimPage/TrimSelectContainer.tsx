import { styled } from 'styled-components';
import CenterWrapper from '../../components/layout/CenterWrapper';
import {
  BodyKrRegular4,
  HeadingEn4,
  HeadingKrMedium5,
  HeadingKrMedium7,
} from '../../styles/typefaces';
import DefaultCardStyle from '../../components/common/card/DefaultCardStyle';
import { useState } from 'react';
import RectButton from '../../components/common/buttons/RectButton';

export default function TrimSelectContainer() {
  const firstTrimIdx = 0;
  const [selectedTrimIdx, setSelectedTrimIdx] = useState(firstTrimIdx);
  const handleSelectedIdx = (idx: number) => {
    setSelectedTrimIdx(idx);
  };

  return (
    <Wrapper>
      <Title>트림을 선택해주세요.</Title>
      <TrimSection>
        {/* Todo. map() 으로 데이터 받아서 만들기! */}
        <TrimCard onClick={() => handleSelectedIdx(0)} active={selectedTrimIdx === 0}>
          <TrimDesc>기본기를 갖춘 베이직한 펠리세이드</TrimDesc>
          <TrimTitle>Exclusive</TrimTitle>
          <TrimPrice>100원!</TrimPrice>
          <TrimButton type={'trim'}>선택하기</TrimButton>
        </TrimCard>
        <TrimCard onClick={() => handleSelectedIdx(1)} active={selectedTrimIdx === 1}>
          <TrimDesc>기본기를 갖춘 베이직한 펠리세이드</TrimDesc>
          <TrimTitle>Exclusive</TrimTitle>
          <TrimPrice>100원!</TrimPrice>
          <TrimButton type={'trim'}>선택하기</TrimButton>
        </TrimCard>
        <TrimCard onClick={() => handleSelectedIdx(2)} active={selectedTrimIdx === 2}>
          <TrimDesc>기본기를 갖춘 베이직한 펠리세이드</TrimDesc>
          <TrimTitle>Exclusive</TrimTitle>
          <TrimPrice>100원!</TrimPrice>
          <TrimButton type={'trim'}>선택하기</TrimButton>
        </TrimCard>
        <TrimCard onClick={() => handleSelectedIdx(3)} active={selectedTrimIdx === 3}>
          <TrimDesc>기본기를 갖춘 베이직한 펠리세이드</TrimDesc>
          <TrimTitle>Exclusive</TrimTitle>
          <TrimPrice>100원!</TrimPrice>
          <TrimButton type={'trim'}>선택하기</TrimButton>
        </TrimCard>
      </TrimSection>
    </Wrapper>
  );
}

const Wrapper = styled(CenterWrapper)``;
const Title = styled.div`
  ${HeadingKrMedium5}
  margin-top: 16px;
`;

const TrimSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
`;

const TrimCard = styled(DefaultCardStyle)`
  padding: 20px 16px 12px 16px;
  height: 158px;
  box-sizing: border-box;
  width: 100%;
`;

const TrimTitle = styled.div`
  ${HeadingEn4}
`;
const TrimPrice = styled.div`
  ${HeadingKrMedium7}
  margin-top: 8px;
`;
const TrimDesc = styled.div`
  ${BodyKrRegular4}
`;
const TrimButton = styled(RectButton)`
  width: 100%;
  margin-top: 8px;
  border-radius: 2px;
`;
