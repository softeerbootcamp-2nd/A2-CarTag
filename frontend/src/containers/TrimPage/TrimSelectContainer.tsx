import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  BodyKrRegular4,
  HeadingEn4,
  HeadingKrMedium6,
  HeadingKrMedium7,
} from '../../styles/typefaces';
import { MESSAGE, PATH } from '../../utils/constants';
import CenterWrapper from '../../components/layout/CenterWrapper';
import DefaultCardStyle from '../../components/common/card/DefaultCardStyle';
import RectButton from '../../components/common/buttons/RectButton';
import { TrimContext } from '../../context/TrimProvider';
import { ItemContext } from '../../context/ItemProvider';

export default function TrimSelectContainer() {
  const {
    selectedTrimIdx,
    data: trimData,
    loading,
    setSelectedTrimIdx,
    setSelectedImgIdx,
  } = useContext(TrimContext);
  const { setSelectedItem, setTotalPrice } = useContext(ItemContext);
  const selectedTrim = trimData && trimData[selectedTrimIdx];
  const navigate = useNavigate();

  const handleSelectedIdx = (idx: number) => {
    setSelectedTrimIdx(idx);
    setSelectedImgIdx(0);
  };
  const isAcitve = (idx: number) => selectedTrimIdx === idx;
  const handleNextButtonClick = (idx: number) => {
    if (!isAcitve(idx)) {
      return;
    }
    if (!selectedTrim) {
      alert(MESSAGE.trimSelectRequired);
      return;
    }
    setSelectedItem({
      type: 'SET_TRIM',
      value: {
        id: selectedTrimIdx,
        name: selectedTrim.trim,
        price: selectedTrim.carDefaultPrice,
      },
    });
    setTotalPrice(selectedTrim.carDefaultPrice);
    navigate(PATH.modelType);
  };

  const displayTrimCards = () => {
    if (!(selectedTrim && !loading)) {
      return <></>;
    }

    const cardIndices = Array.from({ length: trimData.length }, (_, index) => index);
    return cardIndices.map((idx) => (
      <TrimCard key={idx} onClick={() => handleSelectedIdx(idx)} active={isAcitve(idx)}>
        <TrimDesc>{trimData[idx].carDescription}</TrimDesc>
        <TrimTitle>{trimData[idx].trim}</TrimTitle>
        <TrimPrice>{trimData[idx].carDefaultPrice.toLocaleString()} 원</TrimPrice>
        <TrimButton type={'trim'} onClick={() => handleNextButtonClick(idx)}>
          선택하기
        </TrimButton>
      </TrimCard>
    ));
  };

  return (
    <>
      {trimData ? (
        <Wrapper>
          <Title>트림을 선택해주세요.</Title>
          <TrimSection>{displayTrimCards()}</TrimSection>
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
