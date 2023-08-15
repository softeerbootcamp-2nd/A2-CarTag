import { useContext } from 'react';
import { PATH } from '../../utils/constants';
import { MODEL_TYPE_API } from '../../utils/apis';
import { styled } from 'styled-components';
import {
  BodyKrMedium2,
  BodyKrMedium3,
  BodyKrRegular3,
  HeadingKrRegular1,
} from '../../styles/typefaces';
import { useFetch } from '../../hooks/useFetch';
import CenterWrapper from '../../components/layout/CenterWrapper';
import PriceSummary from '../../components/summary/PriceSummary';
import HmgTag from '../../components/common/hmgTag/HmgTag';
import { ModelTypeContext } from '../../context/ModelTypeProvider';

interface IHmgEfficiency {
  averageFuel: string;
  displacement: string;
}
export default function ModelTypeFooterContainer() {
  const { modelType, selectedModelTypeIdx } = useContext(ModelTypeContext);
  const { data: hmgEfficiency, loading: hmgEfficiencyLoading } = useFetch<IHmgEfficiency>(
    `${MODEL_TYPE_API}/hmg-efficiency/?powertrain=${selectedModelTypeIdx.파워트레인}&operation=${selectedModelTypeIdx.구동방식}`
  );

  return (
    <>
      {modelType && hmgEfficiency && !hmgEfficiencyLoading && (
        <Wrapper>
          <HmgDataSection>
            <HmgTag size="small" />
            <HmgInfoWrapper>
              <HmgTagDescription>
                <BlueText>{modelType[selectedModelTypeIdx.파워트레인 - 1].modelName}</BlueText>와{' '}
                <BlueText>{modelType[selectedModelTypeIdx.구동방식 - 1].modelName}</BlueText>의
                배기량과 평균연비입니다.
              </HmgTagDescription>
              <DataList>
                <Data>
                  <DataTitle>배기량</DataTitle>
                  <DataInfo>{hmgEfficiency.displacement}</DataInfo>
                </Data>
                <Data className="separator" />
                <Data>
                  <DataTitle>평균연비</DataTitle>
                  <DataInfo>{hmgEfficiency.averageFuel}</DataInfo>
                </Data>
              </DataList>
            </HmgInfoWrapper>
          </HmgDataSection>
          <PriceSummary nextPagePath={PATH.exterior} />
        </Wrapper>
      )}
    </>
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
  word-break: keep-all;
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
