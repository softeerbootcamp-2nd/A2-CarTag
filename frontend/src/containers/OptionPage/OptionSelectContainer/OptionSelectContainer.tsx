import { css, styled } from 'styled-components';
import CenterWrapper from '../../../components/common/layout/CenterWrapper';
import { BodyKrMedium1 } from '../../../styles/typefaces';
import SearchBar from '../../../components/searchBar/SearchBar';
import DefaultOptionContainer from './DefaultOptionContainer';
import SubOptionContainer from './SubOptionContainer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IMG_URL } from '../../../utils/apis';
import { SubOptionContext } from '../../../context/PageProviders/SubOptionProvider';
import Loading from '../../../components/loading/Loading';
import { DefaultOptionContext } from '../../../context/PageProviders/DefaultOptionProvider';

interface INavItem extends React.HTMLAttributes<HTMLLIElement> {
  active: boolean;
}

interface IOptionSelectContainer {
  isDefault: boolean;
  handleTabItemClick: (isDefault: boolean) => void;
}

export default function OptionSelectContainer({
  isDefault,
  handleTabItemClick,
}: IOptionSelectContainer) {
  const [imgLoading, setImgLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const handleInputChange = (query: string) => {
    setQuery(query);
  };
  const [imgBlobUrl, setImgBlobUrl] = useState<{ [key: string]: string }>({});
  const { subOption, subOptionLoading } = useContext(SubOptionContext);
  const { defaultOption, defaultOptionLoading } = useContext(DefaultOptionContext);

  const isLoaded = useCallback(
    (urls: string[]) => {
      for (const url of urls) {
        if (!imgBlobUrl[url]) {
          return false;
        }
      }
      return true;
    },
    [imgBlobUrl]
  );

  const downloadAndSaveImages = useCallback(
    async (urls: string[], abortController: AbortController) => {
      if (isLoaded(urls)) {
        setImgLoading(false);
        return;
      }
      setImgLoading(true);
      const newImgBlobUrl: { [key: string]: string } = {};
      await Promise.all(
        urls.map(async (url, idx) => {
          const fetchImgUrl = IMG_URL + url + `?${idx}`;

          const res = await fetch(fetchImgUrl, {
            signal: abortController.signal,
          });
          const imgBlob = await res.blob();
          const key = url;
          newImgBlobUrl[key] = URL.createObjectURL(imgBlob);

          return imgBlob;
        })
      );
      setImgBlobUrl((cur) => {
        return { ...cur, ...newImgBlobUrl };
      });
      setImgLoading(false);
    },

    [isLoaded]
  );

  useEffect(() => {
    const options = isDefault ? defaultOption : subOption;
    if (!options) return;
    const optionImages = options.map((option) => option.optionImage);
    const abortController = new AbortController();

    downloadAndSaveImages(optionImages, abortController);
    return () => {
      abortController.abort();
    };
  }, [
    subOption,
    defaultOption,
    subOptionLoading,
    defaultOptionLoading,
    downloadAndSaveImages,
    isDefault,
  ]);

  useEffect(() => {}, [imgLoading]);

  const displayDataList = () => {
    if (imgLoading) return;
    return (
      <>
        {isDefault ? (
          <DefaultOptionContainer
            query={query}
            setQuery={setQuery}
            setResult={setResult}
            imgBlobUrl={imgBlobUrl}
          />
        ) : (
          <SubOptionContainer
            query={query}
            setQuery={setQuery}
            setResult={setResult}
            imgBlobUrl={imgBlobUrl}
          />
        )}
      </>
    );
  };

  return (
    <Wrapper>
      <Header>
        <CategoryList>
          <CategoryItem onClick={() => handleTabItemClick(false)} active={!isDefault}>
            추가옵션
          </CategoryItem>
          <CategoryItem onClick={() => handleTabItemClick(true)} active={isDefault}>
            기본옵션
          </CategoryItem>
        </CategoryList>

        <SearchBar
          value={query}
          result={result}
          setQuery={setQuery}
          setResult={setResult}
          onChange={(e) => {
            handleInputChange(e.currentTarget.value);
          }}
          placeholder={isDefault ? '옵션명으로 검색해보세요.' : '옵션명, 해시태그로 검색해보세요.'}
        />
      </Header>

      {imgLoading ? <Loading /> : displayDataList()}
    </Wrapper>
  );
  2;
}

function CategoryItem({ active, ...props }: INavItem) {
  const Highlight = active ? <Underline /> : <Underline style={{ visibility: 'hidden' }} />;
  return (
    <Item {...props} $active={active}>
      {props.children}
      {Highlight}
    </Item>
  );
}

const CategoryList = styled.ul`
  display: flex;
  gap: 24px;
`;
const Item = styled.li<{ $active: boolean }>`
  ${BodyKrMedium1}
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 28px;
  gap: 2px;
  cursor: pointer;

  ${({ theme, $active }) => {
    if ($active) {
      return css`
        color: ${theme.color.gray900};
      `;
    } else {
      return css`
        color: ${theme.color.gray200};
      `;
    }
  }}
`;

const Underline = styled.div`
  width: 18px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.primaryColor};
`;

const Wrapper = styled(CenterWrapper)``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;
`;
