import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { PATH } from '../../../utils/url';
import { BodyKrMedium3, BodyKrRegular3, HeadingKrMedium6 } from '../../../styles/typefaces';
import { CancelIcon } from '../../icons/Icons';

interface INavItem extends React.HTMLAttributes<HTMLLIElement> {
  active: 'true' | 'false';
}
export default function NavBar() {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  const handleNavItemClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return currentPath === '/' + path ? 'true' : 'false';
  };

  return (
    <Wrapper>
      <HyundaiLogo src="/images/logo.png" alt="" />
      <Body>
        <CarSelect>펠리세이드</CarSelect>
        <NavList>
          <NavItem onClick={() => handleNavItemClick(PATH.trim)} active={isActive(PATH.trim)}>
            트림
          </NavItem>
          <NavItem onClick={() => handleNavItemClick(PATH.type)} active={isActive(PATH.type)}>
            타입
          </NavItem>
          <NavItem onClick={() => handleNavItemClick(PATH.outside)} active={isActive(PATH.outside)}>
            외장
          </NavItem>
          <NavItem onClick={() => handleNavItemClick(PATH.inside)} active={isActive(PATH.inside)}>
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
        <span>종료</span>
        <CancelIcon width={12} height={12} />
      </CancelButton>
    </Wrapper>
  );
}

function NavItem({ active, ...props }: INavItem) {
  const Highlight =
    active === 'true' ? <Underline /> : <Underline style={{ visibility: 'hidden' }} />;
  return (
    <Item {...props} $active={active}>
      {props.children}
      {Highlight}
    </Item>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
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

const Item = styled.li<{ $active: string }>`
  ${HeadingKrMedium6}
  width: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  cursor: pointer;

  ${({ theme, $active }) => {
    if ($active === 'true') {
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
