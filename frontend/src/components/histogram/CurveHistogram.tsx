import { styled, useTheme } from 'styled-components';
import HmgTag from '../common/hmgTag/HmgTag';
import { BodyKrMedium2, BodyKrRegular2, HeadingKrMedium5 } from '../../styles/typefaces';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { BOUGHT_INFO_API } from '../../utils/apis';
import { ItemContext } from '../../context/ItemProvider';
import Loading from '../loading/Loading';

// 임시 데이터

interface ICarData {
  [key: string]: number;
}

interface IBoughtInfo {
  totalPrice: number;
  count: number;
}

interface ICircle {
  cx: number;
  cy: number;
}

type CoordType = [number, number];

export default function CurveHistogram() {
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [priceRange, setPriceRange] = useState({ max: 0, min: 0 });
  const [d, setD] = useState('');
  const { data: boughtInfoListData, loading: boughtInfoListLoading } =
    useFetch<IBoughtInfo[]>(BOUGHT_INFO_API);
  const theme = useTheme();
  const histogramRef = useRef<HTMLDivElement>(null);
  const { totalPrice } = useContext(ItemContext);

  const mycarPrice = Math.round(totalPrice / 10000) * 10000;
  const transformData = (boughtInfoData: IBoughtInfo[], sieve = 6000) => {
    const transfromedBoughtInfoData: { [key: number]: number } = {};
    boughtInfoData.forEach((boughtInfo, idx) => {
      if (idx % sieve == 0) transfromedBoughtInfoData[boughtInfo.totalPrice] = boughtInfo.count;
    });
    return transfromedBoughtInfoData;
  };
  const initSvgSize = () => {
    if (!histogramRef.current) {
      return;
    }
    const { width, height } = histogramRef.current.getBoundingClientRect();
    setSvgSize({ width, height: height - 10 });
  };

  const getCoords = useCallback(
    (data: ICarData) => {
      const yList = Object.values(data);
      let xList = Object.keys(data).map(Number);
      const minX = Math.min(...xList);
      const maxX = Math.max(...xList);
      const maxY = Math.max(...yList);

      xList = xList.map((value) => value - minX);
      xList = xList.map((value) => (value * svgSize.width) / (maxX - minX));

      const coords = yList.reduce((acc: CoordType[], value, idx) => {
        const x = xList[idx];
        const y = (value / maxY) * svgSize.height;
        const coord: CoordType = [x, y];
        return [...acc, coord];
      }, []);

      return coords;
    },
    [svgSize]
  );

  const drawLine = useCallback(
    (carData: ICarData) => {
      const coords = getCoords(carData);
      coords && setD(getPathDAttribute(coords));
    },
    [getCoords]
  );

  const drawCircle = useCallback(
    (mycarPrice: number) => {
      if (!boughtInfoListData) return;
      const transformedBoughtInfoData = transformData(boughtInfoListData, 1);
      const coords = getCoords(transformedBoughtInfoData);
      const boughtInfoKeys = Object.keys(transformedBoughtInfoData);
      const mycarIdx = boughtInfoKeys.findIndex((value) => value === mycarPrice.toString());
      if (mycarIdx === -1) {
        // alert('price와 일치하는 데이터 없음');
        return;
      }
      const [mycarX, myCarY] = coords[mycarIdx];
      setCirclePos({ x: mycarX, y: myCarY });
    },
    [getCoords, boughtInfoListData]
  );

  const drawHistogram = useCallback(() => {
    if (!boughtInfoListData) return;
    const transformedBoughtInfoData = transformData(boughtInfoListData);
    drawLine(transformedBoughtInfoData);
    drawCircle(mycarPrice);
  }, [drawLine, drawCircle, boughtInfoListData, mycarPrice]);

  useEffect(initSvgSize, [histogramRef]);
  useEffect(drawHistogram, [svgSize, drawHistogram]);
  useEffect(() => {
    if (!boughtInfoListData) return;
    const transformedBoughtInfoData = transformData(boughtInfoListData);
    const priceList = Object.keys(transformedBoughtInfoData).map(Number);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    setPriceRange({ max: maxPrice, min: minPrice });
  }, [boughtInfoListData]);

  return (
    <HistogramWrapper>
      <HmgTag size="small" />
      <PaddingWrapper>
        <CaptionWrapper>
          <Caption>
            르블랑으로 완성된 모든 타입의
            <BlueText>견적 가격의 분포</BlueText>
            입니다.
          </Caption>
        </CaptionWrapper>

        <HistogramSection ref={histogramRef}>
          {boughtInfoListLoading ? (
            <Loading />
          ) : (
            <HistogramSvg viewBox="-20 -20  320 140 " strokeWidth={2}>
              <path d={d} fill="none" strokeWidth="3" stroke={theme.color.gray200}></path>
              <Circle cx={circlePos.x} cy={circlePos.y} />
            </HistogramSvg>
          )}
        </HistogramSection>

        <XCaptionWrapper>
          <MinXCaption>
            <XTitle>최소</XTitle>
            <XValue>{priceRange.min.toLocaleString()}원</XValue>
          </MinXCaption>
          <MaxXCaption>
            <XTitle>최대</XTitle>
            <XValue>{priceRange.max.toLocaleString()}원</XValue>
          </MaxXCaption>
        </XCaptionWrapper>
      </PaddingWrapper>
    </HistogramWrapper>
  );
}

function Circle({ cx, cy }: ICircle) {
  return (
    <>
      <circle cx={cx} cy={cy} r="10" fill="none" stroke="#00C3F0" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="6" fill="#00C3F0" />
    </>
  );
}

const getPathDAttribute = (coords: CoordType[]) => {
  const d = coords?.reduce((acc: string, coord, idx, arr) => {
    const [x, y] = coord;
    if (idx === 0) return `M ${x},${y}`;
    const [cp1X, cp1Y] = getControllPoint(arr[idx - 2], arr[idx - 1], arr[idx]);
    const [cp2X, cp2Y] = getControllPoint(arr[idx - 1], arr[idx], arr[idx + 1], true);
    return `${acc} C${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${x} ${y}`;
  }, '');

  return d;
};

const getOpossedLine = (pointA: CoordType, pointB: CoordType) => {
  const xLength = pointB[0] - pointA[0];
  const yLength = pointB[1] - pointA[1];
  const angle = Math.atan2(yLength, xLength);
  const length = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));

  return { length, angle };
};

const getControllPoint = (
  prev: CoordType,
  cur: CoordType,
  next: CoordType,
  isEndPoint?: boolean
) => {
  const smooth = 0.1;
  const p = prev || cur;
  const n = next || cur;
  const { length, angle } = getOpossedLine(p, n);
  const _length = length * smooth;
  const _angle = angle + (isEndPoint ? Math.PI : 0);
  const x = _length * Math.cos(_angle) + cur[0];
  const y = _length * Math.sin(_angle) + cur[1];
  return [x, y];
};

const HistogramSvg = styled.svg`
  transform: scaleY(-1);
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

const XCaptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.gray600};
`;
const MinXCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const MaxXCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const XTitle = styled.div`
  ${HeadingKrMedium5}
`;
const XValue = styled.div`
  ${BodyKrRegular2}
`;
const HistogramSection = styled.div``;
