import { styled } from 'styled-components';
import { BodyKrMedium5, HeadingKrMedium7 } from '../../styles/typefaces';
import { CheckIcon } from '../common/icons/Icons';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';

interface IExtraOptionCard extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  title: string;
  price: number;
}

export default function ExtraOptionCard({ active, title, price, ...props }: IExtraOptionCard) {
  return (
    <Card active={active} {...props}>
      <OptionImg />
      <OptionCardInfo>
        <div>
          <OptionTitle>{title}</OptionTitle>
        </div>
        <OptionPrice>
          +{price} 원 <CheckIcon active={active} />
        </OptionPrice>
      </OptionCardInfo>
    </Card>
  );
}

const Card = styled(DefaultCardStyle)`
  position: relative;
  width: 103px;
  height: 107px;
  border-radius: 2px;
`;

const OptionImg = styled.div`
  border-radius: 1px 1px 0px 0px;
  width: 100%;
  height: 49px;
  background-image: url('/images/extra_option/roa.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(211, 211, 211, 0.5);
`;
const OptionCardInfo = styled.div`
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 57px;
`;

const OptionTitle = styled.div`
  ${HeadingKrMedium7}
`;
const OptionPrice = styled.div`
  ${BodyKrMedium5}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
