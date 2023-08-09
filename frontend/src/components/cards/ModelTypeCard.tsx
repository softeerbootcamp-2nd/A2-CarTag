import { styled } from 'styled-components';
import { CheckIcon } from '../common/icons/Icons';
import { BodyKrRegular4, HeadingEn4, HeadingKrMedium7 } from '../../styles/typefaces';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';

interface IModelTypeCard extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  desc: string;
  title: string;
  price: number;
}

export default function ModelTypeCard({
  active = false,
  desc,
  title,
  price,
  ...props
}: IModelTypeCard) {
  return (
    <Wrapper active={active} {...props}>
      <ModelTypeDesc>{desc}</ModelTypeDesc>
      <ModelTypeTitle>{title}</ModelTypeTitle>
      <ModelTypePrice>
        +{price} 원 <CheckIcon active={active} />
      </ModelTypePrice>
    </Wrapper>
  );
}

const Wrapper = styled(DefaultCardStyle)`
  padding: 8px 12px;
  width: 100%;
`;

const ModelTypeTitle = styled.div`
  ${HeadingEn4}
`;
const ModelTypePrice = styled.div`
  ${HeadingKrMedium7}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModelTypeDesc = styled.div`
  ${BodyKrRegular4}
`;
