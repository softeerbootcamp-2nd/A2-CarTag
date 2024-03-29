import {
  HTMLAttributes,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
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
  const { data: similarQuoteData } = useSimilarDetail(similarQuoteIdList);
  const CARD_SLIDE_MAX_PAGE = similarQuoteData ? similarQuoteData.length : 0;
  const arrowLeftColor = page <= 0 ? theme.color.gray200 : theme.color.gray600;
  const arrowRightColor =
    page >= CARD_SLIDE_MAX_PAGE - 1 ? theme.color.gray200 : theme.color.gray600;

  const stopEvent: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handlePrevPage = () => {
    if (page - 1 < 0) return;
    setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page + 1 >= CARD_SLIDE_MAX_PAGE) return;
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
    similarQuoteData && similarQuoteData?.length !== 0
      ? similarQuoteData[page].reduce((acc, option) => acc + option.optionPrice, 0)
      : 0;

  const prevPrice = useRef(totalPrice);

  useEffect(() => {
    prevPrice.current = totalPrice;
  }, [prevPrice, totalPrice]);
  return (
    <DimmedBackground $displayDimmed={visible} {...props}>
      <Modal onClick={stopEvent}>
        <Wrapper>
          <Header>
            <CloseBtn aria-label="close-btn" onClick={() => setVisible(false)}>
              <CloseIcon />
            </CloseBtn>
          </Header>
          {similarQuoteData ? (
            <>
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
                <SimilarPriceBar similarPrice={prevPrice.current + difference} />
              </InfoWrapper>
              <CardWrapper>
                <LeftButton
                  aria-label="prev-page-btn"
                  onClick={handlePrevPage}
                  style={{ cursor: page <= 0 ? 'default' : 'pointer' }}
                >
                  <ArrowLeft fill={arrowLeftColor} />
                </LeftButton>
                <CarInfo>
                  <InfoSection>
                    <OrderInfo>유사견적서</OrderInfo>
                    <TrimTitle>{selectedItem.trim.name}</TrimTitle>
                    <TypeTagWrapper>
                      <TypeTag>{selectedItem.modelType.powerTrain.name}</TypeTag>
                      <TypeTag>{selectedItem.modelType.bodyType.name}</TypeTag>
                      <TypeTag>{selectedItem.modelType.operation.name}</TypeTag>
                    </TypeTagWrapper>
                    <TotalPrice>{(prevPrice.current + difference!).toLocaleString()}원</TotalPrice>
                    <Difference>+ {difference?.toLocaleString()}원</Difference>
                  </InfoSection>
                  <ImgWrapper
                    src={IMG_URL + selectedItem.outerColor.carImgSrc}
                    loading="lazy"
                    alt="차 외장 이미지"
                  />
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
                <RightButton
                  aria-label="next-page-btn"
                  onClick={handleNextPage}
                  style={{ cursor: page >= CARD_SLIDE_MAX_PAGE - 1 ? 'default' : 'pointer' }}
                >
                  <ArrowRight fill={arrowRightColor} />
                </RightButton>
              </CardWrapper>
            </>
          ) : (
            <Loading />
          )}
        </Wrapper>
        <OkButton type={'price'} onClick={handleOkButton}>
          옵션 선택하기
        </OkButton>
      </Modal>
    </DimmedBackground>
  );
}

const Modal = styled.div`
  background: ${({ theme }) => theme.color.white};
  width: 850px;
  height: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 20px 72px 20px;
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
  justify-content: space-around;
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
  margin-bottom: 4px;
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
