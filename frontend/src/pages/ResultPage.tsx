import { styled } from 'styled-components';
import CenterWrapper from '../components/common/layout/CenterWrapper';
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
    powerTrainId: sharedInfo?.powertrainData.modelId,
    operationId: sharedInfo?.operationData.modelId,
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
      id: sharedInfo.trimData.carId,
      name: sharedInfo.trimData.trim,
      price: sharedInfo.trimData.carDefaultPrice,
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
      id: sharedInfo.powertrainData.modelId,
      name: sharedInfo.powertrainData.modelName,
      title: sharedInfo.powertrainData.modelTypeName,
      imgSrc: sharedInfo.powertrainData.modelImage,
      price: sharedInfo.powertrainData.modelPrice,
    };
    const shraedBodyType = {
      id: sharedInfo.bodyTypeData.modelId,
      name: sharedInfo.bodyTypeData.modelName,
      title: sharedInfo.bodyTypeData.modelTypeName,
      imgSrc: sharedInfo.bodyTypeData.modelImage,
      price: sharedInfo.bodyTypeData.modelPrice,
    };
    const sharedOperation = {
      id: sharedInfo.operationData.modelId,
      name: sharedInfo.operationData.modelName,
      title: sharedInfo.operationData.modelTypeName,
      imgSrc: sharedInfo.operationData.modelImage,
      price: sharedInfo.operationData.modelPrice,
    };
    const sharedOuterColor = {
      id: sharedInfo.outerColor.colorId,
      name: sharedInfo.outerColor.colorName,
      title: sharedInfo.outerColor.colorType,
      imgSrc: sharedInfo.outerColor.colorImage,
      price: sharedInfo.outerColor.colorPrice,
      carImgSrc: sharedInfo.outerColor.colorCarImage,
    };

    const sharedInnerColor = {
      id: sharedInfo.innerColor.colorId,
      name: sharedInfo.innerColor.colorName,
      title: sharedInfo.innerColor.colorType,
      imgSrc: sharedInfo.innerColor.colorImage,
      price: sharedInfo.innerColor.colorPrice,
      carImgSrc: sharedInfo.innerColor.colorCarImage,
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
