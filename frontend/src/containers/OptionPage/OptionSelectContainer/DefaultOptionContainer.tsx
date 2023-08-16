import { styled } from 'styled-components';
import { useContext } from 'react';
import RoundButton from '../../../components/common/buttons/RoundButton';
import OptionCard from '../../../components/cards/OptionCard';
import { DefaultOptionContext } from '../../../context/DefaultOptionProvider';

export default function DefaultOptionContainer() {
  const { defaultOption, selectedOptionIdx, setCurrentOptionIdx } =
    useContext(DefaultOptionContext);

  const displayData = defaultOption?.map((option, idx) => (
    <OptionCard
      type="default"
      active={selectedOptionIdx === idx}
      title={option.optionName}
      price={option.optionPrice}
      imgPath={option.optionImage}
      onClick={() => setCurrentOptionIdx(option.defaultOptionId)}
    ></OptionCard>
  ));
  return (
    <>
      {defaultOption && (
        <>
          <CategoryWrapper>
            <RoundButton type="option">전체</RoundButton>
            <RoundButton type="option" inactive={true}>
              상세품목
            </RoundButton>
            <RoundButton type="option" inactive={true}>
              악세서리
            </RoundButton>
            <RoundButton type="option" inactive={true}>
              휠
            </RoundButton>
          </CategoryWrapper>
          <OptionSection>
            <OptionWrapper>{displayData}</OptionWrapper>
          </OptionSection>
        </>
      )}
    </>
  );
}

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const OptionSection = styled.div`
  margin: 16px 0px;
`;
const OptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
