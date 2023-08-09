import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, styled, useTheme } from 'styled-components';
import { PATH } from '../../utils/url';
import { BodyKrMedium3, BodyKrRegular3, HeadingKrMedium6 } from '../../styles/typefaces';
import { ArrowDown, CancelIcon } from '../common/icons/Icons';
import hyundaiLogo from '/images/logo.svg';

interface INavItem extends React.HTMLAttributes<HTMLLIElement> {
  active: boolean;
}
export default function NavBar() {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  const theme = useTheme();

  const handleNavItemClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return currentPath === path;
  };
  const handleCloseButtonClick = () => {
    console.log('종료 창 띄우기');
  };

  return (
    <Wrapper>
      <HyundaiLogo src={hyundaiLogo} alt="" />
      <Body>
        <CarSelect>
          <span>펠리세이드</span>
          <ArrowDown fill={theme.color.gray800} />
        </CarSelect>
        <NavList>
          <NavItem onClick={() => handleNavItemClick(PATH.trim)} active={isActive(PATH.trim)}>
            트림
          </NavItem>
          <NavItem
            onClick={() => handleNavItemClick(PATH.modelType)}
            active={isActive(PATH.modelType)}
          >
            타입
          </NavItem>
          <NavItem
            onClick={() => handleNavItemClick(PATH.exterior)}
            active={isActive(PATH.exterior)}
          >
            외장
          </NavItem>
          <NavItem
            onClick={() => handleNavItemClick(PATH.interior)}
            active={isActive(PATH.interior)}
          >
            내장
          </NavItem>
          <NavItem onClick={() => handleNavItemClick(PATH.option)} active={isActive(PATH.option)}>
            옵션
          </NavItem>
          <NavItem onClick={() => handleNavItemClick(PATH.result)} active={isActive(PATH.result)}>
            완료
          </NavItem>
        </NavList>
      </Body>

      <CancelButton>
        <Span onClick={handleCloseButtonClick}>종료</Span>
        <CancelIcon width={12} height={12} />
      </CancelButton>
    </Wrapper>
  );
}

function NavItem({ active, ...props }: INavItem) {
  const Highlight = active ? <Underline /> : <Underline style={{ visibility: 'hidden' }} />;
  return (
    <Item {...props} $active={active}>
      {props.children}
      {Highlight}
    </Item>
  );
}

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray200};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 8px;
`;

const NavList = styled.ul`
  display: flex;
  gap: 40px;
  align-items: flex-end;
  margin: -10px;
`;

const Item = styled.li<{ $active: boolean }>`
  ${HeadingKrMedium6}
  width: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  cursor: pointer;

  ${({ theme, $active }) => {
    if ($active === true) {
      return css`
        color: ${theme.color.primaryColor};
      `;
    } else {
      return css`
        color: ${theme.color.gray200};
      `;
    }
  }}
`;

const CarSelect = styled.div`
  ${BodyKrMedium3}
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  border-left: 1px solid ${({ theme }) => theme.color.gray200};
  cursor: pointer;
`;

const CancelButton = styled.button`
  ${BodyKrRegular3}
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9.5px;
`;
const Body = styled.div`
  position: relative;
  width: 1024px;
  display: flex;
  justify-content: center;
`;

const HyundaiLogo = styled.img`
  width: 39px;
  height: 22px;
  margin-right: 20px;
`;
const Underline = styled.div`
  width: 18px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.primaryColor};
`;

const Span = styled.span`
  ${BodyKrMedium3}
`;
