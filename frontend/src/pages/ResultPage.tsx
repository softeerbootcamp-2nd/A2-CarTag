import { styled } from 'styled-components';
import CenterWrapper from '../components/layout/CenterWrapper';
import DetailContainer from '../containers/ResultPage/DetailContainer';
import QuoteSummaryContainer from '../containers/ResultPage/QuoteSummaryContainer';
import ResultBannerContainer from '../containers/ResultPage/ResultBannerContainer';
import HistogramContainer from '../containers/ResultPage/HistogramContainer';
import ResultFooterContainer from '../containers/ResultPage/ResultFooterContainer';
import { useContext, useEffect } from 'react';
import useSharedInfo from '../hooks/useSharedInfo';
import { ItemContext } from '../context/ItemProvider';
import { useEfficiencyData } from '../hooks/useEfficiencyData';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ProgressContext } from '../context/ProgressProvider';

export default function ResultPage() {
  const { setSelectedItem } = useContext(ItemContext);
  const { data: sharedInfo } = useSharedInfo();
  const { data: efficiencyData } = useEfficiencyData({
    powerTrainId: sharedInfo?.powerTrainId,
    operationId: sharedInfo?.operationId,
  });
  const { setNextStepAvailable } = useContext(ProgressContext);

  useEffect(() => {
    if (!efficiencyData) return;
    setSelectedItem({
      type: 'SET_EFFICIENCY',
      value: {
        averageFuel: efficiencyData.averageFuel,
        displacement: efficiencyData.displacement,
      },
    });
  }, [efficiencyData, setSelectedItem]);

  useEffect(() => {
    if (!sharedInfo) return;

    const sharedTrim = {
      id: sharedInfo.carId,
      name: sharedInfo.trim,
      price: sharedInfo.carDefaultPrice,
    };
    const sharedOptions = sharedInfo.optionList.map((option) => {
      return {
        id: option.optionId,
        name: option.optionName,
        imgSrc: option.optionImage,
        title: option.optionTitle,
        price: option.optionPrice,
      };
    });
    const sharedPowerTrain = {
      id: sharedInfo.powerTrainId,
      name: sharedInfo.powerTrainName,
      title: sharedInfo.powerTrainTitle,
      imgSrc: sharedInfo.powerTrainImage,
      price: sharedInfo.powerTrainPrice,
    };
    const shraedBodyType = {
      id: sharedInfo.bodyTypeId,
      name: sharedInfo.bodyTypeName,
      title: sharedInfo.bodyTypeTitle,
      imgSrc: sharedInfo.bodyTypeImage,
      price: sharedInfo.bodyTypePrice,
    };
    const sharedOperation = {
      id: sharedInfo.operationId,
      name: sharedInfo.operationName,
      title: sharedInfo.operationTitle,
      imgSrc: sharedInfo.operationImage,
      price: sharedInfo.operationPrice,
    };
    const sharedOuterColor = {
      id: sharedInfo.colorOuterId,
      name: sharedInfo.colorOuterImageName,
      title: sharedInfo.colorOuterTitle,
      imgSrc: sharedInfo.colorOuterImage,
      price: sharedInfo.colorOuterPrice,
      carImgSrc: sharedInfo.colorCarOuterImage,
    };

    const sharedInnerColor = {
      id: sharedInfo.colorInnerId,
      name: sharedInfo.colorInnerImageName,
      title: sharedInfo.colorInnerTitle,
      imgSrc: sharedInfo.colorInnerImage,
      price: sharedInfo.colorInnerPrice,
      carImgSrc: sharedInfo.colorCarInnerImage,
    };
    setSelectedItem({
      type: 'SET_TRIM',
      value: sharedTrim,
    });
    setSelectedItem({
      type: 'SET_POWER_TRAIN',
      value: sharedPowerTrain,
    });
    setSelectedItem({
      type: 'SET_BODY_TYPE',
      value: shraedBodyType,
    });
    setSelectedItem({
      type: 'SET_OPERATION',
      value: sharedOperation,
    });
    setSelectedItem({ type: 'SET_OUTER_COLOR', value: sharedOuterColor });
    setSelectedItem({ type: 'SET_INNER_COLOR', value: sharedInnerColor });
    setSelectedItem({ type: 'SET_OPTIONS', value: sharedOptions });
    setNextStepAvailable(true);
  }, [sharedInfo, setSelectedItem, setNextStepAvailable]);
  const resultRef = useRef<HTMLDivElement>(null);

  const getPageStyles = () => {
    return `@page {margin:40px; !important }`;
  };

  const handlePrint = useReactToPrint({
    content: () => resultRef.current,
    documentTitle: Math.random().toString(36).substring(2, 12),
  });
  return (
    <>
      <Wrapper ref={resultRef}>
        <style>{getPageStyles()}</style>
        <ResultBannerContainer />
        <QuoteSummaryContainer />
        <Row>
          <DetailContainer />
          <HistogramContainer />
        </Row>
      </Wrapper>
      <ResultFooterContainer handlePrint={handlePrint} />
    </>
  );
}

const Wrapper = styled.div``;
const Row = styled(CenterWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 300px;
  gap: 70px;
`;
