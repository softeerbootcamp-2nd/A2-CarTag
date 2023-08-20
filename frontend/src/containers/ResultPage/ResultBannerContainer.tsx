import { useContext, useState } from 'react';
import { styled } from 'styled-components';
import Banner from '../../components/common/banner/Banner';
import ToggleButtons from '../../components/common/buttons/ToggleButtons';
import { ItemContext } from '../../context/ItemProvider';
import { IMG_URL } from '../../utils/apis';
import { HeadingKrBold1 } from '../../styles/typefaces';

type buttonType = 'outerColor' | 'innerColor';

export default function ResultBannerContainer() {
  const { selectedItem } = useContext(ItemContext);
  const [imgMode, setImgMode] = useState<buttonType>('outerColor');
  const innerCarSrc = IMG_URL + selectedItem.innerColor.carImgSrc;
  const outerCarSrc = IMG_URL + selectedItem.outerColor.carImgSrc;

  const toggle = () => {
    if (imgMode === 'outerColor') {
      setImgMode('innerColor');
    } else {
      setImgMode('outerColor');
    }
  };

  return (
    <>
      <ResultBanner>
        <Title>Le Blanc</Title>
        {imgMode === 'innerColor' ? (
          <CarImg src={innerCarSrc} alt="" />
        ) : (
          <CarImg src={outerCarSrc} alt="" />
        )}
        <ToggleButtonContainer mode={imgMode} onClick={toggle} />
      </ResultBanner>
    </>
  );
}

const ResultBanner = styled(Banner)`
  padding-bottom: 20px;
  box-shadow: none;
`;
const Title = styled.div`
  ${HeadingKrBold1}
  font-size: 146px;
  padding-top: 72px;
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const CarImg = styled.img`
  display: block;
  margin: 80px auto 30px auto;
  height: 300px;
  width: 700px;
  object-fit: cover;
`;

const ToggleButtonContainer = styled(ToggleButtons)`
  margin: 0 auto;
`;
