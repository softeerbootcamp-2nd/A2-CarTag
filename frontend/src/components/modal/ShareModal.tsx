import { HTMLAttributes, useContext, useState } from 'react';
import { DimmedBackground } from './DimmedBackground';
import WhiteModal from './WhiteModal';
import { styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import {
  BodyKrRegular2,
  BodyKrRegular3,
  HeadingEn2,
  HeadingKrMedium5,
} from '../../styles/typefaces';
import { ShareModalContext } from '../../context/ShareModalProvider';
import { CloseIcon, CopyIcon } from '../common/icons/Icons';
import { ItemContext } from '../../context/ItemProvider';
import { PATH } from '../../utils/constants';

interface IShareModal extends HTMLAttributes<HTMLDivElement> {}
export default function ShareModal({ ...props }: IShareModal) {
  const { visible, setVisible } = useContext(ShareModalContext);
  const { selectedItem } = useContext(ItemContext);
  const [copyAlertVisible, setCopyAlertVisible] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyAlertVisible(true);
      setTimeout(() => {
        setCopyAlertVisible(false);
      }, 1000);
    } catch (e) {
      alert(e);
    }
  };
  const handleCloseButton = () => {
    setVisible(false);
  };
  const createShareParams = () => {
    const { powerTrain, bodyType, operation } = selectedItem.modelType;
    const { id: trimId } = selectedItem.trim;
    const { id: powerTrainId } = powerTrain;
    const { id: bodyTypeId } = bodyType;
    const { id: operationId } = operation;
    const { id: outerColorId } = selectedItem.outerColor;
    const { id: innerColorId } = selectedItem.innerColor;
    const optionIds = selectedItem.options.map((option) => {
      return { optionId: option.id };
    });
    const parmasObj = {
      trimId,
      powerTrainId,
      bodyTypeId,
      operationId,
      outerColorId,
      innerColorId,
      optionList: optionIds,
    };
    return parmasObj;
  };
  const createShareUrl = () => {
    const paramsObj = createShareParams();
    const {
      trimId,
      powerTrainId,
      bodyTypeId,
      operationId,
      outerColorId,
      innerColorId,
      optionList,
    } = paramsObj;

    const optionIds = optionList
      .reduce((acc, option) => acc + ',' + option.optionId, '')
      .substring(1);

    const queryString = objectToQueryString({
      trimId,
      powerTrainId,
      bodyTypeId,
      operationId,
      outerColorId,
      innerColorId,
      optionIds,
    });
    const shareUrl = window.location.origin + PATH.result + '?' + queryString;
    return shareUrl;
  };

  const objectToQueryString = (obj: { [key: string]: number | string }) => {
    const queryParams = [];
    for (const key in obj) {
      const value = obj[key];
      if (value) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    return queryParams.join('&');
  };

  const shareUrl = createShareUrl();
  return (
    <DimmedBackground $displayDimmed={visible} {...props}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={handleCloseButton}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <div>
          <Title>링크공유</Title>
          <Desc>내 견적서 링크를 복사해 견적을 다시 확인해보세요.</Desc>
        </div>
        <LinkWrapper>
          <ButtonContainer>
            <CopyButton onClick={handleCopyClick}>
              <Alert $visible={copyAlertVisible}>copied!</Alert>
              <CopyIcon />
            </CopyButton>
          </ButtonContainer>

          <UrlText>{shareUrl}</UrlText>
        </LinkWrapper>
      </Modal>
    </DimmedBackground>
  );
}

const Modal = styled(WhiteModal)`
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: space-between;
  ${HeadingEn2}
  width: 400px;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
`;
const Title = styled.h1`
  ${HeadingKrMedium5}
`;
const Desc = styled.div`
  ${BodyKrRegular3}
  color:${({ theme }) => theme.color.gray600};
`;
const LinkWrapper = styled.div`
  ${BodyKrRegular2}
  width: 100%;

  /* ${flexCenterCss}

  justify-content: space-between;
  */
  padding: 10px 20px;
  margin-top: 30px;

  background-color: ${({ theme }) => theme.color.gray100};
`;

const CopyButton = styled.button`
  position: relative;
`;

const Alert = styled.div<{ $visible: boolean }>`
  ${BodyKrRegular3}
  position: absolute;
  top: -30px;
  left: 50%;
  width: 60px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.white};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translate(-50%);
  transition: all 0.15s;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray400};
  color: ${({ theme }) => theme.color.gray800};
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 0;
    height: 0;
    border: solid transparent;
    border-top-color: ${({ theme }) => theme.color.gray400};
    border-width: 5px;
    transform: translate(-50%);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CloseButton = styled.button``;
const UrlText = styled.p`
  width: 100%;
  word-wrap: break-word;
`;
