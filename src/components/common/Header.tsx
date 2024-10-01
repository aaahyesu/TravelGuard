import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../../styles/image/logo.png";
import hamburgerIcon from "../../styles/image/menuBar.png";
import exitIcon from "../../styles/image/exitIcon.png";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px;
  padding: 0 60px;
  background-color: #0a0818;
  position: relative;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }
`;

const Logo = styled.img`
  width: 300px;

  @media (max-width: 768px) {
    width: 180px;
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  gap: 100px;
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li<{ isActive: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-size: 23px;
  font-weight: 400;
  color: #f0f0f0;
  text-align: center;
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  ${({ isActive }) =>
    isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 3px;
      border-bottom: 1px solid #7fa9ff;
    }
  `}

  &:hover {
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 3px;
      border-bottom: 1px solid #7fa9ff;
    }
  }
`;

const HamburgerMenu = styled.img`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 40px;
    cursor: pointer;
  }
`;

const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  background-color: rgba(11, 11, 30, 0.95);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  cursor: pointer;
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
  list-style: none;
  padding: 0;
`;

const MobileMenuItem = styled.li<{ isActive: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #f0f0f0;
  text-align: center;
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  ${({ isActive }) =>
    isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 3px;
      border-bottom: 1px solid #7fa9ff;
    }
  `}

  &:hover {
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 3px;
      border-bottom: 1px solid #7fa9ff;
    }
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [, setActiveIndex] = useState<number>(0);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (index: number) => {
    setActiveIndex(index);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { path: "/country-info", label: "국가별 정보" },
    { path: "/Permission-enter", label: "입국 허가요건 정보" },
    { path: "/embassy-info", label: "국가별 대사관 정보" },
  ];

  return (
    <NavBar>
      <Link to="/">
        <Logo src={logo} alt="Travel Guard Logo" />
      </Link>

      <MenuContainer>
        <Menu>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <MenuItem key={index} isActive={isActive}>
                <Link to={item.path} onClick={() => handleMenuItemClick(index)}>
                  {item.label}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </MenuContainer>

      <HamburgerMenu src={hamburgerIcon} alt="Menu" onClick={toggleMenu} />

      {isMenuOpen && (
        <MobileMenuContainer isOpen={isMenuOpen}>
          <CloseButton src={exitIcon} alt="Close" onClick={toggleMenu} />
          <MobileMenu>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <MobileMenuItem key={index} isActive={isActive}>
                  <Link
                    to={item.path}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    {item.label}
                  </Link>
                </MobileMenuItem>
              );
            })}
          </MobileMenu>
        </MobileMenuContainer>
      )}
    </NavBar>
  );
};

export default Header;
