import { useContext, useEffect } from 'react';
import InnerColorBannerContainer from '../containers/InnerColorPage/InnerColorBannerContainer';
import InnerColorSelectContainer from '../containers/InnerColorPage/InnerColorSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { INNER_COLOR_API } from '../utils/apis';
import { IInnerColor, InnerColorContext } from '../context/PageProviders/InnerColorProvider';
import ErrorModal from '../components/modal/ErrorModal';
import InnerColorFooterContainer from '../containers/InnerColorPage/InnerColorFooterContainer';
import { styled } from 'styled-components';

export default function InnerColorPage() {
  const { data: innerColorData, error } = useFetch<IInnerColor[]>(`${INNER_COLOR_API}?carid=${1}`);
  const { setData } = useContext(InnerColorContext);

  useEffect(() => {
    setData(innerColorData);
  }, [innerColorData, setData]);

  if (error) {
    return <ErrorModal message={error.message} />;
  }

  return (
    <>
      <Wrapper>
        <InnerColorBannerContainer />
        <InnerColorSelectContainer />
      </Wrapper>
      <InnerColorFooterContainer />
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-bottom: 120px;
`;
