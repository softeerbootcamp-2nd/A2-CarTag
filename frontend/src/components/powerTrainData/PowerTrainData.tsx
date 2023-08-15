import styled, { keyframes } from 'styled-components';
import { BodyKrRegular5, HeadingKrRegular2 } from '../../styles/typefaces';

interface IPowerTrainData {
  title: string;
  value: string;
  current: number;
  max: number;
}
export default function PowerTrainData({ title, value, current, max }: IPowerTrainData) {
  return (
    <Data>
      <DataTitle>{title}</DataTitle>
      <DataInfo>
        {value}
        <DataRatio>
          <Ratio $current={current} $max={max}>
            <Highlight />
          </Ratio>
        </DataRatio>
      </DataInfo>
    </Data>
  );
}

const Data = styled.li`
  width: 100%;
  height: 67px;
  display: flex;
  flex-direction: column;
  &:first-child {
    padding-right: 24px;
  }

  &:last-child {
    padding-left: 24px;
  }
`;

const DataTitle = styled.div`
  margin-bottom: 8px;
  ${BodyKrRegular5}
  color: ${({ theme }) => theme.color.gray600};
`;
const DataInfo = styled.div`
  ${HeadingKrRegular2}
`;
const DataRatio = styled.div`
  height: 4px;
  background-color: ${({ theme }) => theme.color.gray200};
`;

const Ratio = styled.div<{ $current: number; $max: number }>`
  height: 4px;
  width: ${({ $current, $max }) => ($current / $max) * 100}%;
`;

const widthKeyframe = keyframes`
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }

`;

const Highlight = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.activeBlue2};
  animation: ${widthKeyframe} 0.7s ease;
`;
