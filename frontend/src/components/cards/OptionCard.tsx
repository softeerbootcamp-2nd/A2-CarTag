import { styled } from 'styled-components';
import { BodyKrRegular4, HeadingKrMedium6, HeadingKrMedium7 } from '../../styles/typefaces';
import { CheckIcon } from '../common/icons/Icons';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes } from 'react';
import { IMG_URL } from '../../utils/apis';

interface IOptionCard extends HTMLAttributes<HTMLDivElement> {
  type: 'default' | 'sub';
  active: boolean;
  desc?: string;
  title: string;
  price: number;
  imgPath: string;
  hashTag: string[] | null;
  handleSelectOption?: React.MouseEventHandler<HTMLDivElement>;
}

export default function OptionCard({
  type,
  active,
  desc,
  title,
  price,
  imgPath,
  hashTag,
  handleSelectOption,
  ...props
}: IOptionCard) {
  const displayCaption =
    type === 'default' ? (
      <DefaultInfo>기본포함</DefaultInfo>
    ) : (
      <OptionPrice>
        +{price.toLocaleString()} 원 <CheckIcon active={active} />
      </OptionPrice>
    );

  const displayHashTag = hashTag?.map((tag, idx) => {
    return <HashTag key={idx}>{tag}</HashTag>;
  });

  return (
    <Card active={active} {...props}>
      <ImgWrapper>
        <OptionImg src={`${IMG_URL}${imgPath}`} />
        <HashTagWrapper>{displayHashTag}</HashTagWrapper>
      </ImgWrapper>
      <OptionCardInfo onClick={handleSelectOption}>
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
  width: 244px;
  border-radius: 2px;
`;

const ImgWrapper = styled.div`
  position: relative;
`;
const OptionImg = styled.img`
  border-radius: 1px 1px 0px 0px;
  width: 100%;
  height: 160px;
`;
const HashTagWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  margin: 8px 12px;
  gap: 10px;
  overflow: hidden;
  flex-wrap: wrap;
`;
const HashTag = styled.div`
  ${BodyKrRegular4}
  padding: 2px 6px;
  border-radius: 2px;
  background: rgba(117, 117, 117, 0.5);
  color: ${({ theme }) => theme.color.gray50};
  backdrop-filter: blur(2px);
`;
const OptionCardInfo = styled.div`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 116px;
`;

const OptionTitle = styled.div`
  ${HeadingKrMedium6}
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
