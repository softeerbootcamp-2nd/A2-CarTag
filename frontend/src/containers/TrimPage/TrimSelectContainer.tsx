import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  BodyKrRegular4,
  HeadingEn4,
  HeadingKrMedium6,
  HeadingKrMedium7,
} from '../../styles/typefaces';
import { LE_BLANC, PALISADE, PATH } from '../../utils/constants';
import CenterWrapper from '../../components/common/layout/CenterWrapper';
import DefaultCardStyle from '../../components/common/card/DefaultCardStyle';
import RectButton from '../../components/common/buttons/RectButton';
import { TrimContext } from '../../context/PageProviders/TrimProvider';
import { ItemContext } from '../../context/ItemProvider';
import useDefaultInfo from '../../hooks/useDefaultInfo';
import { ProgressContext } from '../../context/ProgressProvider';

export default function TrimSelectContainer() {
  const { data: trimData, loading, setSelectedImgIdx } = useContext(TrimContext);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const { setNextStepAvailable } = useContext(ProgressContext);
  const navigate = useNavigate();
  const { defaultInfo } = useDefaultInfo(PALISADE);

  const initDefaultInfo = useCallback(() => {
    if (!defaultInfo) return;

    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: {
        id: defaultInfo.powerTrain.id,
        title: defaultInfo.powerTrain.title,
        name: defaultInfo.powerTrain.name,
        imgSrc: defaultInfo.powerTrain.imgSrc,
        price: defaultInfo.powerTrain.price,
      },
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: {
        id: defaultInfo.bodyType.id,
        title: defaultInfo.bodyType.title,
        name: defaultInfo.bodyType.name,
        imgSrc: defaultInfo.bodyType.imgSrc,
        price: defaultInfo.bodyType.price,
      },
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: {
        id: defaultInfo.operation.id,
        title: defaultInfo.operation.title,
        name: defaultInfo.operation.name,
        imgSrc: defaultInfo.operation.imgSrc,
        price: defaultInfo.operation.price,
      },
    });

    setSelectedItem({
      type: 'SET_OUTER_COLOR',
      value: {
        id: defaultInfo.outerColor.id,
        name: defaultInfo.outerColor.name,
        title: defaultInfo.outerColor.title,
        price: defaultInfo.outerColor.price,
        carImgSrc: defaultInfo.outerColor.carImgSrc,
        imgSrc: defaultInfo.outerColor.imgSrc,
      },
    });
    setSelectedItem({
      type: 'SET_INNER_COLOR',
      value: {
        id: defaultInfo.innerColor.id,
        name: defaultInfo.innerColor.name,
        title: defaultInfo.innerColor.title,
        price: defaultInfo.innerColor.price,
        carImgSrc: defaultInfo.innerColor.carImgSrc,
        imgSrc: defaultInfo.innerColor.imgSrc,
      },
    });
    setSelectedItem({
      type: 'SET_OPTIONS',
      value: [],
    });
  }, [defaultInfo, setSelectedItem]);

  const handleSelectedIdx = (idx: number) => {
    if (!trimData || !defaultInfo) return;
    setSelectedImgIdx(0);
    setSelectedItem({
      type: 'SET_TRIM',
      value: {
        id: trimData[idx].carId,
        name: trimData[idx].trim,
        price: trimData[idx].carDefaultPrice,
      },
    });
  };
  const isAcitve = (idx: number) => selectedItem.trim.id === idx;
  const handleNextButtonClick = (idx: number) => {
    if (!isAcitve(idx)) return;
    const hasData = selectedItem.cartype.id === PALISADE && selectedItem.trim.id === LE_BLANC;
    if (hasData) {
      initDefaultInfo();
      setNextStepAvailable(true);
      navigate(PATH.modelType);
      return;
    }
    setNextStepAvailable(false);
  };

  const displayTrimCards = () => {
    if (!(trimData && !loading)) return <></>;

    return trimData.map((trim, idx) => (
      <TrimCard key={idx} onClick={() => handleSelectedIdx(idx)} active={isAcitve(trim.carId)}>
        <TrimDesc>{trimData[idx].carDescription}</TrimDesc>
        <TrimTitle>{trimData[idx].trim}</TrimTitle>
        <TrimPrice>{trimData[idx].carDefaultPrice.toLocaleString()} 원</TrimPrice>
        <TrimButton type={'trim'} onClick={() => handleNextButtonClick(trim.carId)}>
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
  width: 25%;
  padding: 20px 16px 12px 16px;
  height: 158px;
  box-sizing: border-box;
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
