import { styled } from 'styled-components';
import { BodyKrRegular3, BodyKrRegular4, HeadingKrBold1 } from '../../styles/typefaces';
import CenterWrapper from '../layout/CenterWrapper';

interface IBanner extends React.HTMLAttributes<HTMLDivElement> {
  subtitle: string;
  title: string;
  desc?: string;
}

export default function Banner({ subtitle, title, desc, ...props }: IBanner) {
  return (
    <>
      <BannerBg {...props}>
        <CenterWrapper>
          <InfoWrapper>
            <SubTitle>{subtitle}</SubTitle>
            <Title>{title}</Title>
            <AdditionalText>{desc}</AdditionalText>
          </InfoWrapper>
        </CenterWrapper>
        {props.children}
      </BannerBg>
    </>
  );
}

const BannerBg = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  background: linear-gradient(
      180deg,
      rgba(162, 199, 231, 0.2) 24.92%,
      rgba(255, 255, 255, 0) 61.36%
    ),
    #fff;
  box-shadow: 0px 0px 8px 0px rgba(131, 133, 136, 0.2);
`;
const InfoWrapper = styled.div`
  position: absolute;
  top: 72px;
`;

const SubTitle = styled.p`
  color: ${(props) => props.theme.color.gray900};
  ${BodyKrRegular3}
`;

const Title = styled.p`
  color: ${(props) => props.theme.color.primaryColor700};
  ${HeadingKrBold1}
`;

const AdditionalText = styled.p`
  width: 207px;
  color: ${(props) => props.theme.color.gray800};
  ${BodyKrRegular4}
`;