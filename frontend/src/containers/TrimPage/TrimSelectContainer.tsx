import { useContext } from 'react';
import { styled } from 'styled-components';
import {
  BodyKrRegular4,
  HeadingEn4,
  HeadingKrMedium6,
  HeadingKrMedium7,
} from '../../styles/typefaces';
import CenterWrapper from '../../components/layout/CenterWrapper';
import DefaultCardStyle from '../../components/common/card/DefaultCardStyle';
import RectButton from '../../components/common/buttons/RectButton';
import { TrimContext } from '../../context/TrimContext';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/constants';

export default function TrimSelectContainer() {
  const navigate = useNavigate();
  const { selectedTrimIdx, setSelectedTrimIdx, data, loading, setSelectedImgIdx } =
    useContext(TrimContext);
  const selectedData = data && data[selectedTrimIdx];

  const handleSelectedIdx = (idx: number) => {
    setSelectedTrimIdx(idx);
    setSelectedImgIdx(0);
  };
  const handleButtonClick = (price: number) => {
    price; // Todo. price 누적 값 저장
    navigate(PATH.modelType);
  };

  const displayTrimCards = () => {
    if (!(selectedData && !loading)) {
      return <></>;
    }

    const cardIndices = Array.from({ length: data.length }, (_, index) => index);
    return cardIndices.map((idx) => (
      <TrimCard key={idx} onClick={() => handleSelectedIdx(idx)} active={selectedTrimIdx === idx}>
        <TrimDesc>{data[idx].carDescription}</TrimDesc>
        <TrimTitle>{data[idx].trim}</TrimTitle>
        <TrimPrice>{data[idx].carDefaultPrice.toLocaleString()} 원</TrimPrice>
        <TrimButton type={'trim'} onClick={() => handleButtonClick(data[idx].carDefaultPrice)}>
          선택하기
        </TrimButton>
      </TrimCard>
    ));
  };

  return (
    <>
      {data ? (
        <Wrapper>
          <Title>트림을 선택해주세요.</Title>
          <TrimSection>
            {/* Todo. map() 으로 데이터 받아서 만들기! */}
            {displayTrimCards()}
          </TrimSection>
        </Wrapper>
      ) : null}
    </>
  );
}

const Wrapper = styled(CenterWrapper)``;
const Title = styled.div`
  ${HeadingKrMedium6}
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
