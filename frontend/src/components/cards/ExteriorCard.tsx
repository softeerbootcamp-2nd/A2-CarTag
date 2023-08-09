import { styled } from 'styled-components';
import { BodyKrMedium3, BodyKrMedium4 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';

interface IExteriorCard extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  color: string;
  desc: string;
  name: string;
  price: number;
}

export default function ExteriorCard({
  active,
  color,
  desc,
  name,
  price,
  ...props
}: IExteriorCard) {
  return (
    <Card active={active} {...props}>
      <ColorWrapper>
        <ColorImg $color={color}></ColorImg>
      </ColorWrapper>
      <ColorInfo>
        <ColorDesc>{desc}</ColorDesc>
        <ColorName>{name}</ColorName>
        <ColorPrice>+ {price}원</ColorPrice>
      </ColorInfo>
    </Card>
  );
}

const Card = styled(DefaultCardStyle)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
`;

const ColorImg = styled.div<{ $color: string }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;
const ColorWrapper = styled.div`
  ${flexCenterCss}
  border-radius: 50%;
  width: 58px;
  height: 58px;
  border: 1px solid ${({ theme }) => theme.color.gray50};
  margin-left: 12px;
`;

const ColorInfo = styled.div`
  margin-left: 14px;
`;
const ColorDesc = styled.div`
  ${BodyKrMedium4}
`;
const ColorName = styled.div`
  ${BodyKrMedium3}
  margin-bottom: 28px;
`;
const ColorPrice = styled.div`
  ${BodyKrMedium3}
`;
