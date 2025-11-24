import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { styled, css } from 'styled-components';
import { useQuery } from '@apollo/client';
import { ProfilePage } from './pages/ProfilePage';
import { ReservationsPage } from './pages/ReservationsPage';
import { GET_CUSTOMER } from './graphql/customer';
import { CUSTOMER_ID } from './config';
import { DropdownMenu, MenuDivider, MenuItemButton, MenuItemLink, MenuWrapper } from './ui/Menu';
import { usePhotoUrl } from "./hooks/usePhotoUrl";

export const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { data } = useQuery(GET_CUSTOMER, {
    variables: { id: CUSTOMER_ID },
  });

  const customer = data?.getCustomer;

  return (
    <AppContent>
      <TopNav>
        <TopNavContent>
          <Logo>
            <LogoImage src="/logo.svg" alt="MYFOX" />
            <LogoText>REZERVAČNÍ SYSTÉM</LogoText>
          </Logo>
          <MenuWrapper>
            <MenuButton
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon>☰</MenuIcon>
            </MenuButton>
            {menuOpen && (
              <DropdownMenu>
                <UserInfo>
                  <UserAvatar>
                    {customer?.name?.[0]?.toUpperCase()}
                    {customer?.surname?.[0]?.toUpperCase()}
                  </UserAvatar>
                  <UserDetails>
                    <UserName>
                      {customer?.name} {customer?.surname}
                    </UserName>
                    <UserEmail>{customer?.email || 'petr@gmail.com'}</UserEmail>
                  </UserDetails>
                </UserInfo>
                <MenuDivider />
                <MenuItemLink to="/reservations" onClick={() => setMenuOpen(false)}>
                  Moje rezervace
                </MenuItemLink>
                <MenuItemLink to="/profile" onClick={() => setMenuOpen(false)}>
                  Osobní údaje
                </MenuItemLink>
                <MenuItemButton onClick={() => setMenuOpen(false)}>
                  Odhlásit
                </MenuItemButton>
              </DropdownMenu>
            )}
          </MenuWrapper>
        </TopNavContent>
      </TopNav>
      <MainContent>
        <Routes>
          <Route path="/" element={<Navigate to="/reservations" replace />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainContent>
    </AppContent>
  );
};

// Layout

const AppContent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 16px 16px 32px;
  width: 100%;
`;

// Top bar styles

const TopNav = styled.header`
  background: #F2F7FA;
  border-bottom: 3px solid #17A619;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TopNavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  max-width: 632px;
  margin: 0 auto;
`;

// Logo styles

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
`;

const LogoImage = styled.img`
  height: 22px;

  @media (max-width: 480px) {
    height: 18px;
  }
`;

const LogoText = styled.span`
  font-size: 16px;
  color: #555555;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Menu styles

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuIcon = styled.span`
  font-size: 24px;
`;

// User info styles

const UserInfo = styled.div`
  display: flex;
  gap: 14px;
  padding: 20px;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #BBBBBB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  line-height: 1.2;
`;

const userStyles = css`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserName = styled.div`
  ${userStyles}
  font-weight: 600;
`;

const UserEmail = styled.div`
  ${userStyles}
`;
  