import { HTMLAttributes } from 'react';
import { DimmedBackground } from './DimmedBackground';
import WhiteModal from './WhiteModal';
import { styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { HeadingEn2 } from '../../styles/typefaces';

interface IErrorModal extends HTMLAttributes<HTMLDivElement> {
  message: string;
}
export default function ErrorModal({ message, ...props }: IErrorModal) {
  return (
    <DimmedBackground $displayDimmed={true} {...props}>
      <Modal>{message}</Modal>
    </DimmedBackground>
  );
}

const Modal = styled(WhiteModal)`
  ${flexCenterCss}
  ${HeadingEn2}
  width: 850px;
  height: 520px;
`;
