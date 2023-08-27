import { HTMLAttributes, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { QuoteSummaryModalContext } from '../../context/ModalProviders/QuoteSummaryModalProvider';
import { PATH } from '../../utils/constants';
import { ItemContext } from '../../context/ItemProvider';
import RectButton from '../common/buttons/RectButton';
import { CloseIcon } from '../common/icons/Icons';
import ToggleButtons from '../common/buttons/ToggleButtons';
import { flexCenterCss } from '../../utils/commonStyle';
import {
  BodyKrRegular3,
  BodyKrRegular4,
  HeadingKrMedium2,
  HeadingKrMedium5,
} from '../../styles/typefaces';
import { DimmedBackground } from './DimmedBackground';
import WhiteModal from './WhiteModal';
import { IMG_URL } from '../../utils/apis';

interface IQuoteSummaryModal extends HTMLAttributes<HTMLDivElement> {}
interface IDetail {
  title: string;
  name: string;
  price: number;
}
export default function QuoteSummaryModal({ ...props }: IQuoteSummaryModal) {
  const { selectedItem, totalPrice } = useContext(ItemContext);
  const { visible, setVisible } = useContext(QuoteSummaryModalContext);
  const [imgMode, setImgMode] = useState<'innerColor' | 'outerColor'>('outerColor');
  const navigate = useNavigate();

  const handleOkButtonClick = () => {
    setVisible(false);
    navigate(PATH.result);
  };
  const handleCloseButtonClicke = () => {
    setVisible(false);
  };
  const toggle = () => {
    if (imgMode === 'innerColor') {
      setImgMode('outerColor');
    } else {
      setImgMode('innerColor');
    }
  };

  const optionNames = selectedItem.options.map((option) => {
    return option.name;
  });
  const optionPrice = selectedItem.options.reduce((acc, option) => acc + option.price, 0);
  const outerCarImgSrc =
    selectedItem.outerColor.carImgSrc === '' ? '' : IMG_URL + selectedItem.outerColor.carImgSrc;
  const innerCarImgSrc =
    selectedItem.outerColor.carImgSrc === '' ? '' : IMG_URL + selectedItem.innerColor.carImgSrc;

  return (
    <DimmedBackground $displayDimmed={visible} {...props}>
      <QuoteModal onClick={(e) => e.stopPropagation()}>
        <Header>
          <ModalTitle>견적요약</ModalTitle>
          <CloseButton aria-label="close-btn" onClick={handleCloseButtonClicke}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Body>
          <Row>
            <ImgSection>
              <CarImg
                loading="lazy"
                alt="차 이미지"
                src={imgMode === 'innerColor' ? innerCarImgSrc : outerCarImgSrc}
              ></CarImg>
              <ToggleButtons mode={imgMode} onClick={toggle} />
            </ImgSection>
            <DetailSection>
              <Detail title="모델" name="팰리세이드" price={0} />
              <Detail title="트림" name={selectedItem.trim.name} price={selectedItem.trim.price} />
              <Hr />
              <Detail
                title="파워트레인"
                name={selectedItem.modelType.powerTrain.name}
                price={selectedItem.modelType.powerTrain.price}
              />
              <Detail
                title="바디타입"
                name={selectedItem.modelType.bodyType.name}
                price={selectedItem.modelType.bodyType.price}
              />
              <Detail
                title="구동방식"
                name={selectedItem.modelType.operation.name}
                price={selectedItem.modelType.bodyType.price}
              />
              <Hr />
              <Detail
                title="외장색상"
                name={selectedItem.outerColor.name}
                price={selectedItem.outerColor.price}
              />
              <Detail
                title="내장색상"
                name={selectedItem.innerColor.name}
                price={selectedItem.innerColor.price}
              />
              <Hr />
              <Detail title="옵션" name={optionNames.join(', ')} price={optionPrice} />
            </DetailSection>
          </Row>
          <PriceSection>
            <PriceCaption>현재 총 가격</PriceCaption>
            <Price>{totalPrice.toLocaleString()} 원</Price>
          </PriceSection>
        </Body>
        <Footer>
          <OkButton type="popup" onClick={handleOkButtonClick}>
            견적 완료하기
          </OkButton>
        </Footer>
      </QuoteModal>
    </DimmedBackground>
  );
}

function Detail({ title, name, price }: IDetail) {
  return (
    <DetailWrapper>
      {title && <DetailTitle>{title}</DetailTitle>}
      {name && <DetailName>{name}</DetailName>}
      <DetailPrice>+ {price ? price.toLocaleString() : 0} 원</DetailPrice>
    </DetailWrapper>
  );
}

const QuoteModal = styled(WhiteModal)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 850px;
  height: 520px;
`;

const OkButton = styled(RectButton)``;

const Header = styled.div`
  ${flexCenterCss}
  height: 53px;
`;
const ModalTitle = styled.h1`
  ${HeadingKrMedium5}
`;
const CloseButton = styled.button`
  position: absolute;
  right: 10px;
`;
const Row = styled.div`
  ${flexCenterCss}
  gap: 32px;
  margin-bottom: 40px;
`;
const Body = styled.div`
  padding: 24px 36px;
`;
const ImgSection = styled.div`
  ${flexCenterCss}
  width: 50%;
  flex-direction: column;
  gap: 20px;
`;
const CarImg = styled.img`
  width: 330px;
  height: 200px;
  object-fit: cover;
`;
const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 8px;
`;

const DetailWrapper = styled.div`
  display: flex;
  ${BodyKrRegular3}
`;
const DetailTitle = styled.div`
  color: ${({ theme }) => theme.color.gray500};
  text-align: start;
  width: 100px;
`;
const DetailName = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.color.gray900};
  text-align: start;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  text-overflow: ellipsis;
`;
const DetailPrice = styled.div`
  color: ${({ theme }) => theme.color.gray900};
  text-align: end;
  margin-left: auto;
`;
const PriceSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const PriceCaption = styled.span`
  ${BodyKrRegular4}
  color: ${({ theme }) => theme.color.gray700};
`;
const Price = styled.span`
  ${HeadingKrMedium2}
  color: ${({ theme }) => theme.color.primaryColor};
  margin-left: 16px;
`;

const Footer = styled.div``;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray100};
  margin: 7px 0;
`;
