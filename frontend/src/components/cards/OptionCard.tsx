import { styled } from 'styled-components';
import { BodyKrRegular4, HeadingKrMedium6, HeadingKrMedium7 } from '../../styles/typefaces';
import { CheckIcon } from '../common/icons/Icons';
import DefaultCardStyle from '../common/card/DefaultCardStyle';
import { HTMLAttributes, useContext } from 'react';
import { IMG_URL } from '../../utils/apis';
import { flexCenterCss } from '../../utils/commonStyle';
import { ItemContext } from '../../context/ItemProvider';
import { IDefaultOption } from '../../context/DefaultOptionProvider';
import { ISubOption } from '../../context/SubOptionProvider';

interface IOptionCard extends HTMLAttributes<HTMLDivElement> {
  type: 'default' | 'sub';
  active: boolean;
  option: ISubOption | IDefaultOption;
  handleSelectOption?: React.MouseEventHandler<HTMLDivElement>;
}

export default function OptionCard({
  type,
  active,
  option,
  handleSelectOption,
  ...props
}: IOptionCard) {
  const { selectedItem } = useContext(ItemContext);

  const displayCaption =
    type === 'default' ? (
      <DefaultInfo>기본포함</DefaultInfo>
    ) : (
      <OptionPrice>
        +{option.optionPrice.toLocaleString()} 원
        <BtnWrapper
          $active={!!selectedItem.options.find((item) => item.name === option.optionName)}
          onClick={handleSelectOption}
        >
          <CheckIcon
            active={!!selectedItem.options.find((item) => item.name === option.optionName)}
          />
        </BtnWrapper>
      </OptionPrice>
    );

  const displayHashTag = option.hashtagName?.map((tag, idx) => {
    return <HashTag key={idx}>{tag}</HashTag>;
  });

  return (
    <Card active={active} {...props}>
      <ImgWrapper>
        <OptionImg src={`${IMG_URL}${option.optionImage}`} />
        <HashTagWrapper>{displayHashTag}</HashTagWrapper>
      </ImgWrapper>
      <OptionCardInfo>
        <div>
          {type === 'sub' && option.percentage !== null && (
            <OptionDesc>
              <BlueText>{option.percentage}%</BlueText>가 선택했어요
            </OptionDesc>
          )}
          <OptionTitle>{option.optionName}</OptionTitle>
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
  object-fit: cover;
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
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue2};
`;

const OptionDesc = styled.div`
  ${BodyKrRegular4}
`;

const BtnWrapper = styled.div<{ $active: boolean }>`
  ${flexCenterCss}
  width: 32px;
  height: 32px;
  border: 1px solid;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 2px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.color.activeBlue : theme.color.white};
  color: ${({ $active, theme }) => ($active ? theme.color.activeBlue : theme.color.gray100)};
`;
