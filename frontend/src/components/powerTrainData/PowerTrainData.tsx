import styled, { keyframes } from 'styled-components';
import { BodyKrRegular5, HeadingKrRegular2 } from '../../styles/typefaces';
import { useEffect } from 'react';

interface IPowerTrainData {
  title: string;
  value: string;
  ratio: number;
}
export default function PowerTrainData({ title, value, ratio }: IPowerTrainData) {
  useEffect(() => {}, [ratio]);
  return (
    <Data>
      <DataTitle>{title}</DataTitle>
      <DataInfo>
        {value}
        <DataRatio>
          <Ratio $ratio={ratio}>
            <Highlight key={ratio} />
          </Ratio>
        </DataRatio>
      </DataInfo>
    </Data>
  );
}

const Data = styled.li`
  width: 200px;
  height: 67px;
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

const Ratio = styled.div<{ $ratio: number }>`
  height: 4px;
  width: ${({ $ratio }) => $ratio * 100}%;
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
