import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { OPTION_API } from '../utils/apis';
import { useFetch } from '../hooks/useFetch';
import OptionBannerContainer from '../containers/OptionPage/OptionBannerContainer';
import OptionSelectContainer from '../containers/OptionPage/OptionSelectContainer/OptionSelectContainer';
import OptionFooterContainer from '../containers/OptionPage/OptionFooterContainer';
import { ISubOption, SubOptionContext } from '../context/SubOptionProvider';
import { DefaultOptionContext, IDefaultOption } from '../context/DefaultOptionProvider';
import ErrorModal from '../components/modal/ErrorModal';

interface IOptionDetail {
  categoryName: string;
  optionName: string;
  optionDescription: string;
  optionImage: string;
  hmgData: IHmgData | null;
  subOptionList: ISubOptionList[] | null;
  package: boolean;
}
interface IHmgData {
  optionBoughtCount: number;
  optionUsedCount: number;
  overHalf: boolean;
}

export interface ISubOptionList {
  categoryName: string;
  hmgData: IHmgData | null;
  optionDescription: string;
  optionImage: string;
  optionName: string;
  package: false;
  subOptionList: null;
}

export default function OptionPage() {
  const defaultOptionContext = useContext(DefaultOptionContext);
  const subOptionContext = useContext(SubOptionContext);
  const [isDefault, setIsDefault] = useState(false);
  const handleTabItemClick = (isDefault: boolean) => {
    setIsDefault(isDefault);
  };
  const { currentOptionIdx } = isDefault ? defaultOptionContext : subOptionContext;

  const {
    data: subOption,
    loading: subOptionLoading,
    error: subOptionError,
  } = useFetch<ISubOption[]>(`${OPTION_API}/sublist?carid=${1}`);
  const {
    data: defaultOption,
    loading: defaultOptionLoading,
    error: defaultOptionError,
  } = useFetch<IDefaultOption[]>(`${OPTION_API}/defaultlist?carid=${1}`);
  const { setSubOption, setSubOptionLoading } = useContext(SubOptionContext);
  const { setDefaultOption, setDefaultOptionLoading } = useContext(DefaultOptionContext);
  const optionType = isDefault ? 'default' : 'sub';

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

  const { data: optionDetail, loading: optionDetailLoading } = useFetch<IOptionDetail>(
    `${OPTION_API}/${optionType}/detail/?carid=${1}&optionid=${currentOptionIdx}`
  );

  if (subOptionError) {
    return <ErrorModal message={subOptionError.message} />;
  } else if (defaultOptionError) {
    return <ErrorModal message={defaultOptionError.message} />;
  }
  return (
    <>
      {optionDetail && !optionDetailLoading && (
        <>
          <Wrapper>
            <OptionBannerContainer
              optionDetail={optionDetail}
              optionDetailLoading={optionDetailLoading}
            />
            <OptionSelectContainer isDefault={isDefault} handleTabItemClick={handleTabItemClick} />
          </Wrapper>
          <OptionFooterContainer />
        </>
      )}
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-bottom: 120px;
`;
