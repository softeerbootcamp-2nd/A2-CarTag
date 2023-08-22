import { styled } from 'styled-components';
import { CheckIcon } from '../common/icons/Icons';
import { BodyKrRegular4, HeadingKrMedium6, HeadingKrMedium7 } from '../../styles/typefaces';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';

interface IModelTypeCard extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  percentage: number;
  title: string;
  price: number;
}

export default function ModelTypeCard({
  active = false,
  percentage,
  title,
  price,
  ...props
}: IModelTypeCard) {
  return (
    <Wrapper active={active} {...props}>
      <ModelTypeDesc>
        <BlueText $active={active}>{percentage}%</BlueText>의 선택
      </ModelTypeDesc>
      <ModelTypeTitle>{title}</ModelTypeTitle>
      <ModelTypePrice>
        +{price.toLocaleString()} 원 <CheckIcon active={active} />
      </ModelTypePrice>
    </Wrapper>
  );
}

const Wrapper = styled(DefaultCardStyle)`
  padding: 8px 12px;
  width: 100%;
`;

const ModelTypeTitle = styled.div`
  ${HeadingKrMedium6}
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
const BlueText = styled.span<{ $active: boolean }>`
  color: ${({ theme, $active }) => $active && theme.color.activeBlue2};
`;
