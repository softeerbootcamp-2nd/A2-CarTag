import {
  HTMLAttributes,
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { styled, useTheme } from 'styled-components';
import { ArrowLeft, ArrowRight, CloseIcon } from '../common/icons/Icons';
import {
  BodyKrMedium3,
  BodyKrMedium5,
  BodyKrRegular4,
  BodyKrRegular5,
  HeadingKrBold6,
  HeadingKrMedium6,
} from '../../styles/typefaces';
import { flexCenterCss } from '../../utils/commonStyle';
import HmgTag from '../common/hmgTag/HmgTag';
import RectButton from '../common/buttons/RectButton';
import { DimmedBackground } from './DimmedBackground';
import { SimilarQuoteModalContext } from '../../context/ModalProviders/SimilarQuoteModalProvider';
import SimilarPriceBar from '../priceStaticBar/SimilarPriceBar';
import { IMG_URL } from '../../utils/apis';
import useSimilarDetail, { ISimilarQuoteOption } from '../../hooks/useSimilarDetail';
import { ItemContext, detailItemType } from '../../context/ItemProvider';
import SummaryOptionCard from '../cards/SummaryOptionCard';
import Loading from '../loading/Loading';

interface ISimilarQuoteModal extends HTMLAttributes<HTMLDivElement> {}

export default function SimilarQuoteModal({ ...props }: ISimilarQuoteModal) {
  const theme = useTheme();
  const { totalPrice, selectedItem, setSelectedItem } = useContext(ItemContext);
  const { visible, setVisible, similarQuoteIdList } = useContext(SimilarQuoteModalContext);
  const [page, setPage] = useState(0);
  const prevPrice = useRef(totalPrice);

  const stopEvent: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const { data: similarQuoteData } = useSimilarDetail(similarQuoteIdList);
  const handlePrevPage = () => {
    const prevPage = page <= 0 ? 0 : page - 1;
    setPage(prevPage);
  };
  const handleNextPage = () => {
    const maxPage = similarQuoteData ? similarQuoteData.length : 0;
    if (page >= maxPage - 1) return;
    setPage(page + 1);
  };

  const handleOkButton = () => {
    setVisible(false);
  };

  const isActive = useCallback(
    (id: number) => {
      return !!selectedItem.options.find((selectedOption) => selectedOption.id === id);
    },
    [selectedItem]
  );

  const handleCardClick = useCallback(
    (option: ISimilarQuoteOption) => {
      if (isActive(option.optionId)) {
        const filteredOptions = selectedItem.options.filter(
          (selectedOption) => selectedOption.id !== option.optionId
        );
        setSelectedItem({ type: 'SET_OPTIONS', value: filteredOptions });
      } else {
        const newOption: detailItemType = {
          id: option.optionId,
          imgSrc: option.optionImage,
          name: option.optionName,
          title: option.optionTitle,
          price: option.optionPrice,
        };

        const newOptions = Array.from(new Set([...selectedItem.options, newOption]));
        setSelectedItem({ type: 'SET_OPTIONS', value: newOptions });
      }
    },
    [isActive, setSelectedItem, selectedItem.options]
  );

  const displayCards = useCallback(
    (page: number) => {
      if (similarQuoteData === null) return;

      const optionCards = similarQuoteData[page]?.map((option, idx) => {
        if (option === null) return;

        return (
          <SummaryOptionCard
            key={idx}
            active={isActive(option.optionId)}
            imgSrc={IMG_URL + option.optionImage}
            title={option.optionName}
            price={option.optionPrice}
            onClick={() => handleCardClick(option)}
          />
        );
      });

      return optionCards;
    },
    [similarQuoteData, handleCardClick, isActive]
  );

  const difference =
    similarQuoteData && similarQuoteData[page].reduce((acc, option) => acc + option.optionPrice, 0);

  return (
    <DimmedBackground $displayDimmed={visible} {...props}>
      <Modal onClick={stopEvent}>
        {similarQuoteData ? (
          <>
            <Header>
              <CloseBtn onClick={() => setVisible(false)}>
                <CloseIcon />
              </CloseBtn>
            </Header>
            <InfoWrapper>
              <TextWrapper>
                <TitleText>
                  <BlueText>내 견적과 비슷한 실제 출고 견적</BlueText>들을 확인하고 비교해보세요.
                </TitleText>
                <DescText>
                  *유사 출고 견적이란,
                  <br />내 견적의 판매량과 선택 옵션 유사도가 높은 다른 사람들의 실제 출고
                  견적이에요.
                </DescText>
              </TextWrapper>
              <SimilarPriceBar similarPrice={50_000_000} />
            </InfoWrapper>
            <CardWrapper>
              <LeftButton onClick={handlePrevPage}>
                <ArrowLeft fill={theme.color.gray200} />
              </LeftButton>
              <CarInfo>
                <InfoSection>
                  <OrderInfo>유사견적서</OrderInfo>
                  <TrimTitle>Le Blanc</TrimTitle>
                  <TypeTagWrapper>
                    <TypeTag>{selectedItem.modelType.powerTrain.name}</TypeTag>
                    <TypeTag>{selectedItem.modelType.bodyType.name}</TypeTag>
                    <TypeTag>{selectedItem.modelType.operation.name}</TypeTag>
                  </TypeTagWrapper>
                  <TotalPrice>{prevPrice.current.toLocaleString()}원</TotalPrice>
                  <Difference>+ {difference?.toLocaleString()}원</Difference>
                </InfoSection>
                <ImgWrapper src={IMG_URL + selectedItem.outerColor.carImgSrc} />
              </CarInfo>
              <OptionInfo>
                <HmgTagWrapper>
                  <HmgTag size="small" />
                </HmgTagWrapper>
                <OptionSection>
                  <p>내 견적에 없는 옵션이에요.</p>
                  <OptionCardWrapper>{displayCards(page)}</OptionCardWrapper>
                </OptionSection>
              </OptionInfo>
              <RightButton onClick={handleNextPage}>
                <ArrowRight fill={theme.color.gray200} />
              </RightButton>
            </CardWrapper>
            <OkButton type={'price'} onClick={handleOkButton}>
              옵션 선택하기
            </OkButton>
          </>
        ) : (
          <Loading />
        )}
      </Modal>
    </DimmedBackground>
  );
}

const Modal = styled.div`
  position: relative;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 850px;
  height: 520px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.white};

  padding: 20px 20px 72px 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CloseBtn = styled.button``;

const InfoWrapper = styled.div`
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 367px;
  gap: 15px;
`;
const TitleText = styled.div`
  width: 223px;
  ${HeadingKrMedium6}
`;
const BlueText = styled.span`
  color: ${({ theme }) => theme.color.activeBlue2};
`;

const DescText = styled.div`
  ${BodyKrRegular4}
  color: ${({ theme }) => theme.color.primaryColor};
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  border: 1px solid ${({ theme }) => theme.color.skyBlue};
  border-radius: 2px;
  padding: 0 30px;
`;

const CarInfo = styled.div`
  display: flex;
  border-radius: 2px;
  height: 100%;
  align-items: center;
`;
const OptionInfo = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 275px;
  height: 100%;
  border-radius: 0px 1px 1px 0px;
  background-color: ${({ theme }) => theme.color.gray50};
  padding: 0 16px;

  p {
    color: ${({ theme }) => theme.color.gray900};
    ${BodyKrMedium5};
    padding-bottom: 4px;
  }
`;

const OptionSection = styled.div`
  margin-top: 60px;
`;
const HmgTagWrapper = styled.div`
  position: absolute;
  top: 29px;
  left: 0;
`;
const OptionCardWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const LeftButton = styled.button`
  padding: 8px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;
const RightButton = styled.button`
  padding: 8px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const InfoSection = styled.div`
  padding: 0 20px 0 8px;
`;

const OrderInfo = styled.div`
  color: ${({ theme }) => theme.color.gray900};
  ${BodyKrRegular5}
`;

const TrimTitle = styled.p`
  color: ${({ theme }) => theme.color.primaryColor700};
  ${HeadingKrBold6}
`;
const TypeTagWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 16px;
`;
const TypeTag = styled.div`
  ${flexCenterCss}
  ${BodyKrRegular5}
  padding: 0px 4px;
  background: rgba(117, 117, 117, 0.5);
  color: ${({ theme }) => theme.color.gray50};
`;
const TotalPrice = styled.p`
  color: ${({ theme }) => theme.color.primaryColor700};
  ${BodyKrMedium3}
`;
const Difference = styled.span`
  color: ${({ theme }) => theme.color.sand};
  ${BodyKrRegular5};
`;

const ImgWrapper = styled.img`
  width: 274px;
  height: 156px;
`;

const OkButton = styled(RectButton)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 14px 0;
  border-radius: 0 0 8px 8px;
  background-color: ${({ theme }) => theme.color.gray300};
`;
