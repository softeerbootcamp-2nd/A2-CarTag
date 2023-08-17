import { styled } from 'styled-components';
import { BodyKrMedium3, BodyKrMedium4 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';
import { CheckIcon } from '../common/icons/Icons';
import { IMG_URL } from '../../utils/apis';

interface IOuterColorCard extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  color: string;
  desc: string;
  name: string;
  price: number;
}

export default function OuterColorCard({
  active,
  color,
  desc,
  name,
  price,
  ...props
}: IOuterColorCard) {
  return (
    <Card active={active} {...props}>
      <ColorWrapper>
        <ColorBorder $active={active}>
          <ColorImg $src={`${IMG_URL}${color}`}></ColorImg>
        </ColorBorder>
      </ColorWrapper>
      <DescWrapper>
        <ColorDesc>
          <PointText $active={active}>{desc}</PointText>
          %가 선택했어요.
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
`;
const ColorImg = styled.div<{ $src: string }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-image: url(${({ $src }) => $src});
  background-position: center;
  background-size: cover;
`;
const ColorWrapper = styled.div`
  ${flexCenterCss}
  flex-grow: 1;
`;

const ColorBorder = styled.div<{ $active: boolean }>`
  ${flexCenterCss}
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.color.gray900 : theme.color.gray200)};
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
  height: 100%;
  flex-grow: 2;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
