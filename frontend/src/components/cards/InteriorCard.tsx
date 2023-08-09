import { styled } from 'styled-components';
import { BodyKrMedium3, BodyKrMedium4 } from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { CheckIcon } from '../common/icons/Icons';
import { HTMLAttributes } from 'react';

interface IInTeriorCard extends HTMLAttributes<HTMLDivElement> {
  imgSrc1: string;
  imgSrc2: string;
  active: boolean;
  desc: string;
  name: string;
  price: number;
}

export default function InteriorCard({
  imgSrc1,
  imgSrc2,
  active,
  desc,
  name,
  price,
  ...props
}: IInTeriorCard) {
  return (
    <Card active={active} {...props}>
      <ImgWrapper>
        <InteriorImg src={imgSrc1}></InteriorImg>
        <InteriorImg src={imgSrc2}></InteriorImg>
      </ImgWrapper>
      <DescWrapper>
        <ColorInfo>
          <ColorDesc>{desc}</ColorDesc>
          <ColorName>{name}</ColorName>
          <Row>
            <ColorPrice>+ {price}원</ColorPrice>
            <CheckIcon active={active} />
          </Row>
        </ColorInfo>
      </DescWrapper>
    </Card>
  );
}

const Card = styled(DefaultCardStyle)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  overflow: hidden;
`;
const InteriorImg = styled.img``;
const ImgWrapper = styled.div`
  ${flexCenterCss}
  flex-direction: column;
  width: 69px;
`;

const ColorInfo = styled.div``;
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
const DescWrapper = styled.div`
  padding: 14px 16px;
  width: 100%;
  height: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
