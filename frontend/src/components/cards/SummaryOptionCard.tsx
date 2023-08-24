import { styled } from 'styled-components';
import { BodyKrMedium5 } from '../../styles/typefaces';
import { CheckIcon } from '../common/icons/Icons';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';

interface ISummaryOptionCard extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  title: string;
  price: number;
  imgSrc: string;
}

export default function SummaryOptionCard({
  active,
  title,
  price,
  imgSrc,
  ...props
}: ISummaryOptionCard) {
  return (
    <Card active={active} {...props}>
      <OptionImg src={imgSrc} />
      <OptionCardInfo>
        <div>
          <OptionTitle>{title}</OptionTitle>
        </div>
        <OptionPrice>
          +{price.toLocaleString()} 원 <CheckIcon active={active} />
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

const OptionImg = styled.img`
  border-radius: 1px 1px 0px 0px;
  width: 100%;
  height: 49px;
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
  ${BodyKrMedium5}
`;
const OptionPrice = styled.div`
  ${BodyKrMedium5}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;