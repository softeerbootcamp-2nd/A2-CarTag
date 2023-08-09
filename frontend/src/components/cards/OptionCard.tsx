import { styled } from 'styled-components';
import { BodyKrRegular4, HeadingEn4, HeadingKrMedium7 } from '../../styles/typefaces';
import HmgTag from '../common/hmgTag/HmgTag';
import { CheckIcon } from '../common/icons/Icons';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';

interface IOptionCard extends HTMLAttributes<HTMLDivElement> {
  type: 'default' | 'extra';
  active: boolean;
  desc?: string;
  title: string;
  price: number;
}

export default function OptionCard({ type, active, desc, title, price, ...props }: IOptionCard) {
  const displayCaption =
    type === 'default' ? (
      <DefaultInfo>기본포함</DefaultInfo>
    ) : (
      <OptionPrice>
        +{price} 원 <CheckIcon active={active} />
      </OptionPrice>
    );

  return (
    <Card active={active} {...props}>
      <HmgWrapper>
        <HmgTag />
      </HmgWrapper>
      <OptionImg />
      <OptionCardInfo>
        <div>
          <OptionDesc>{desc}</OptionDesc>
          <OptionTitle>{title}</OptionTitle>
        </div>
        {displayCaption}
      </OptionCardInfo>
    </Card>
  );
}

const Card = styled(DefaultCardStyle)`
  position: relative;
  width: 244px;
  border-radius: 2px;
`;

const HmgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const OptionImg = styled.div`
  border-radius: 1px 1px 0px 0px;
  width: 100%;
  height: 160px;
  background-image: url('/images/extra_option/roa.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(211, 211, 211, 0.5);
`;
const OptionCardInfo = styled.div`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 116px;
`;

const OptionTitle = styled.div`
  ${HeadingEn4}
`;
const OptionPrice = styled.div`
  ${HeadingKrMedium7}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DefaultInfo = styled.div`
  color: ${({ theme }) => theme.color.gray500};
`;

const OptionDesc = styled.div`
  ${BodyKrRegular4}
`;
