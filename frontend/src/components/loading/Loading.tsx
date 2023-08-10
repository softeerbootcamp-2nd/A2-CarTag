import { keyframes, styled } from 'styled-components';
import { BodyKrMedium3 } from '../../styles/typefaces';
import { LoadingIcon, LoadingIcon2, LoadingIcon3 } from '../common/icons/Icons';
import { flexCenterCss } from '../../utils/commonStyle';

export default function Loading() {
  return (
    <Wrapper>
      <Spinner>
        <AbsoluteCenter>
          <LoadingIcon />
        </AbsoluteCenter>
        <AbsoluteCenter>
          <LoadingIcon2 />
        </AbsoluteCenter>
        <AbsoluteCenter>
          <LoadingIcon3 />
        </AbsoluteCenter>
      </Spinner>
      <Text>데이터를 불러오는 중입니다.</Text>
    </Wrapper>
  );
}

const spin = keyframes`
  to{
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spinner = styled.div`
  position: relative;
  ${flexCenterCss}
  width: 54px;
  height: 54px;
  border: 3px solid ${({ theme }) => theme.color.gray200};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.color.activeBlue};
  animation: ${spin} 1.5s linear infinite;
`;

const Text = styled.div`
  ${BodyKrMedium3};
  width: 200px;
  text-align: center;
  margin-top: 16px;
`;

const AbsoluteCenter = styled.div`
  position: absolute;
  ${flexCenterCss}
`;
