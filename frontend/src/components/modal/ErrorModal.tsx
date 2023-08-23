import { HTMLAttributes } from 'react';
import { DimmedBackground } from './DimmedBackground';
import WhiteModal from './WhiteModal';
import { styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { HeadingEn2, HeadingKrBold2 } from '../../styles/typefaces';

interface IErrorModal extends HTMLAttributes<HTMLDivElement> {
  message: string;
}
export default function ErrorModal({ message, ...props }: IErrorModal) {
  return (
    <DimmedBackground $displayDimmed={true} {...props}>
      <Modal>
        <Text>서버 연결이 불안정 합니다.</Text>
        <Text>{message}</Text>
      </Modal>
    </DimmedBackground>
  );
}

const Modal = styled(WhiteModal)`
  ${flexCenterCss}
  flex-direction:column;
  ${HeadingEn2}
  width: 850px;
  height: 520px;
`;
const Text = styled.div`
  ${HeadingKrBold2}
`;
