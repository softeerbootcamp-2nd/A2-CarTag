import { useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { OPTION_API } from '../utils/apis';
import { useFetch } from '../hooks/useFetch';
import OptionBannerContainer from '../containers/OptionPage/OptionBannerContainer';
import OptionSelectContainer from '../containers/OptionPage/OptionSelectContainer/OptionSelectContainer';
import OptionFooterContainer from '../containers/OptionPage/OptionFooterContainer';
import { ISubOption, SubOptionContext } from '../context/SubOptionProvider';
import { DefaultOptionContext, IDefaultOption } from '../context/DefaultOptionProvider';

export default function OptionPage() {
  const { data: subOption, loading: subOptionLoading } = useFetch<ISubOption[]>(
    `${OPTION_API}/sublist?carid=${1}`
  );
  const { data: defaultOption, loading: defaultOptionLoading } = useFetch<IDefaultOption[]>(
    `${OPTION_API}/defaultlist?carid=${1}`
  );
  const { setSubOption, setSubOptionLoading } = useContext(SubOptionContext);
  const { setDefaultOption, setDefaultOptionLoading } = useContext(DefaultOptionContext);

  useEffect(() => {
    setSubOption(subOption);
    setSubOptionLoading(subOptionLoading);
    setDefaultOption(defaultOption);
    setDefaultOptionLoading(subOptionLoading);
  }, [
    subOption,
    subOptionLoading,
    setSubOption,
    setSubOptionLoading,
    defaultOption,
    defaultOptionLoading,
    setDefaultOption,
    setDefaultOptionLoading,
  ]);

  return (
    <>
      <Wrapper>
        <OptionBannerContainer />
        <OptionSelectContainer />
      </Wrapper>
      <OptionFooterContainer />
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-bottom: 120px;
`;
