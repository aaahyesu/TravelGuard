import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../../styles/image/logo.png";
import hamburgerIcon from "../../styles/image/menuBar.png";

// Styled components
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

const MenuItem = styled.li`
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #f0f0f0;
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
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

const MobileMenuContainer = styled(MenuContainer)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #0b0b1e;
    z-index: 1000;
  }
`;

// Header component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <NavBar>
      <Link to="/">
        <Logo src={logo} alt="Travel Guard Logo" />
      </Link>

      <MenuContainer>
        <Menu>
          <MenuItem>
            <Link to="/country-info">국가별 정보</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/Permission-enter">입국 허가요건 정보</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/embassy-info">국가별 대사관 정보</Link>
          </MenuItem>
        </Menu>
      </MenuContainer>

      <HamburgerMenu src={hamburgerIcon} alt="Menu" onClick={toggleMenu} />

      {isMenuOpen && (
        <MobileMenuContainer>
          <Menu>
            <MenuItem>
              <Link to="/country-info">국가별 정보</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Permission-enter">입국 허가요건 정보</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/embassy-info">국가별 대사관 정보</Link>
            </MenuItem>
          </Menu>
        </MobileMenuContainer>
      )}
    </NavBar>
  );
};

export default Header;
