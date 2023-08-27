import { styled } from 'styled-components';
import { BodyKrMedium3, BodyKrMedium4 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { CheckIcon } from '../common/icons/Icons';
import { HTMLAttributes } from 'react';

interface IInnerColorCard extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  active: boolean;
  desc: string;
  name: string;
  price: number;
}

export default function InnerColorCard({
  imgSrc,
  active,
  desc,
  name,
  price,
  ...props
}: IInnerColorCard) {
  return (
    <Card active={active} {...props}>
      <ImgWrapper>
        <InnerColorImg src={imgSrc} loading="lazy" alt="내장색상 이미지" />
      </ImgWrapper>
      <DescWrapper>
        <ColorDesc>
          <PointText $active={active}>{desc}%</PointText>가 선택했어요.
        </ColorDesc>
        <ColorName>{name}</ColorName>
        <Row>
          <ColorPrice>+ {price}원</ColorPrice>
          <CheckIcon active={active} />
        </Row>
      </DescWrapper>
    </Card>
  );
}

const Card = styled(DefaultCardStyle)`
  display: flex;
  align-items: center;

  width: 256px;
  height: 110px;
  overflow: hidden;
`;
const InnerColorImg = styled.img``;
const ImgWrapper = styled.div`
  ${flexCenterCss}
  flex-direction: column;
  width: 69px;
`;

const ColorDesc = styled.div`
  ${BodyKrMedium4}
`;
const PointText = styled.span<{ $active: boolean }>`
  color: ${({ $active, theme }) => $active && theme.color.activeBlue};
`;
const ColorName = styled.div`
  ${BodyKrMedium3}
  margin-bottom: 28px;
`;
const ColorPrice = styled.div`
  ${BodyKrMedium3}
`;
const DescWrapper = styled.div`
  padding: 14px 16px;
  width: 100%;
  height: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
