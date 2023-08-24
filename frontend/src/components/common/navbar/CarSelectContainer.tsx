import { styled } from 'styled-components';
import CenterWrapper from '../layout/CenterWrapper';
import { useFetch } from '../../../hooks/useFetch';
import { CAR_LIST_API, IMG_URL } from '../../../utils/apis';
import { Dispatch, useContext, useState } from 'react';
import { flexCenterCss } from '../../../utils/commonStyle';
import { BodyKrMedium3, BodyKrMedium4 } from '../../../styles/typefaces';
import DefaultCardStyle from '../card/DefaultCardStyle';
import { DimmedBackground } from '../../modal/DimmedBackground';
import { ItemContext } from '../../../context/ItemProvider';

interface ICar {
  carTypeId: number;
  carTypeImage: string;
  carTypeName: string;
}

interface ICarSelectContainer {
  visible: boolean;
  setMenuVisible: Dispatch<React.SetStateAction<boolean>>;
}

export default function CarSelectContainer({ visible, setMenuVisible }: ICarSelectContainer) {
  const { data } = useFetch<ICar[]>(CAR_LIST_API);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const [active, setActive] = useState(3); // 3: SUV
  const categoryList = ['수소/전기차', 'N', '승용', 'SUV', 'MVP', '소형트럭/택시', '트럭', '버스'];

  const handleCarClick = (car: ICar) => {
    setSelectedItem({
      type: 'SET_CAR',
      value: { id: car.carTypeId, name: car.carTypeName, price: 0 },
    });
  };
  const handleCategoryClick = (idx: number) => {
    setActive(idx);
  };
  const handleDimmedClick = () => {
    setMenuVisible((cur) => !cur);
  };
  const isActive = (idx: number) => idx === active;
  const categoryItemComponents = categoryList?.map((category, idx) => {
    return (
      <CategoryItem $active={isActive(idx)} onClick={() => handleCategoryClick(idx)} key={idx}>
        <CategoryName>{category}</CategoryName>
      </CategoryItem>
    );
  });

  const carItemComponents = data?.map((car, idx) => (
    <CarItem
      active={selectedItem.cartype.id === car.carTypeId}
      onClick={() => handleCarClick(car)}
      key={idx}
    >
      <CarImg src={IMG_URL + car.carTypeImage} />
      <CarName>{car.carTypeName}</CarName>
    </CarItem>
  ));

  return (
    <>
      <Wrapper $visible={visible}>
        <CetnerWrapper>
          <CategoryWrapper>{categoryItemComponents}</CategoryWrapper>
          <CarListWrapper>{carItemComponents}</CarListWrapper>
        </CetnerWrapper>
      </Wrapper>
      <CarSelectDimmedBackground $displayDimmed={visible} onClick={handleDimmedClick} />
    </>
  );
}
const Wrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 60px;
  z-index: 99999999;
  height: ${({ $visible }) => ($visible ? '220px' : '0')};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  display: block;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  overflow: hidden;
  transition: height 0.5s ease;
`;

const CetnerWrapper = styled(CenterWrapper)``;
const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
  height: 38px;
  background-color: ${({ theme }) => theme.color.gray200};
`;

const CategoryItem = styled.div<{ $active: boolean }>`
  ${flexCenterCss}
  height: 100%;
  width: 100%;
  ${BodyKrMedium4}
  color: ${({ $active, theme }) => ($active ? theme.color.white : theme.color.primaryColor)};
  background-color: ${({ $active, theme }) => $active && theme.color.primaryColor};
  cursor: pointer;
`;
const CategoryName = styled.span``;

const CarListWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  overflow: scroll;
  gap: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CarItem = styled(DefaultCardStyle)`
  ${flexCenterCss}
  flex-direction: column;
  padding: 5px 8px;
  border: 1px solid transparent;
`;
const CarImg = styled.img`
  width: 160px;
`;
const CarName = styled.div`
  margin-top: 10px;
  ${BodyKrMedium3}
`;
const CarSelectDimmedBackground = styled(DimmedBackground)`
  z-index: 10000000;
`;
