import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../../styles/image/logo.png";
import hamburgerIcon from "../../styles/image/menuBar.png";

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

  // active 상태에 따라 border 넣어서 표시하기
  ${({ isActive }) =>
    isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -5px; // border 위치 조정
      left: 0;
      right: 0;
      height: 3px; // border 높이
      border-bottom: 1px solid #7fa9ff;
    }
  `}
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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0); // 활성 메뉴 인덱스 추가

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (index: number) => {
    setActiveIndex(index); // 클릭된 인덱스 설정
    setIsMenuOpen(false); // 모바일 메뉴 클릭 시 닫기
  };

  return (
    <NavBar>
      <Link to="/">
        <Logo src={logo} alt="Travel Guard Logo" />
      </Link>

      <MenuContainer>
        <Menu>
          {[
            { path: "/country-info", label: "국가별 정보" },
            { path: "/Permission-enter", label: "입국 허가요건 정보" },
            { path: "/embassy-info", label: "국가별 대사관 정보" },
          ].map((item, index) => (
            <MenuItem
              key={index}
              isActive={activeIndex === index} // active 상태 전달
            >
              <Link to={item.path} onClick={() => handleMenuItemClick(index)}>
                {item.label}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </MenuContainer>

      <HamburgerMenu src={hamburgerIcon} alt="Menu" onClick={toggleMenu} />

      {isMenuOpen && (
        <MobileMenuContainer>
          <Menu>
            {[
              { path: "/country-info", label: "국가별 정보" },
              { path: "/Permission-enter", label: "입국 허가요건 정보" },
              { path: "/embassy-info", label: "국가별 대사관 정보" },
            ].map((item, index) => (
              <MenuItem
                key={index}
                isActive={activeIndex === index} // active 상태 전달
              >
                <Link to={item.path} onClick={() => handleMenuItemClick(index)}>
                  {item.label}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </MobileMenuContainer>
      )}
    </NavBar>
  );
};

export default Header;
