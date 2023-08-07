import { styled } from 'styled-components';
import { flexCenterCss } from '../../utils/commonStyle';
import { BodyKrRegular5 } from '../../styles/typefaces';

export const PriceBar = styled.input.attrs<{ $percent: number; $isover: boolean }>((props) => ({
  type: props.type,
  min: props.min,
  max: props.max,
  value: props.value,
  onChange: props.onChange,
  step: props.step,
}))`
  &,
  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background: ${(props) =>
    props.$isover ? props.theme.color.gray800 : props.theme.color.primaryColor800};
  outline: none;
  &::-webkit-slider-runnable-track {
    cursor: pointer;
    background: linear-gradient(
      to right,
      #fff 0%,
      #fff ${(props) => `${props.$percent}%`},
      ${(props) => (props.$isover ? props.theme.color.gray800 : props.theme.color.primaryColor800)}
        ${(props) => `${props.$percent}%`},
      ${(props) => props.theme.color.primaryColor800} 100%
    );
    width: 100%;
    height: 6px;
    border-radius: 4px;
  }

  &::-webkit-slider-thumb {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: ${(props) =>
      props.$isover ? props.theme.color.sand : props.theme.color.primaryColor400};
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #fff;
    margin-top: -6px;
  }
`;

export const PriceInfo = styled.div`
  ${flexCenterCss};
  justify-content: space-between;
  span {
    padding-top: 4px;
    ${BodyKrRegular5}
    color: ${(props) => props.theme.color.primaryColor200};
  }
`;
