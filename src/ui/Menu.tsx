import { styled, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const DropdownMenu = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 16px 4px #53585F4D;
  border-radius: 4px;
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 220px;
  z-index: 101;
`;

const menuItemStyles = css`
  display: block;
  padding: 20px;
  font-size: 16px;
  
  &:hover {
    background: #f5f5f7;
  }
`;

export const MenuItemLink = styled(Link)`
  ${menuItemStyles}
  text-decoration: none;
  color: #333333;
`;

export const MenuItemButton = styled.button`
  ${menuItemStyles}
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

export const MenuWrapper = styled.div`
  position: relative;
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: #DDDDDD;
  margin: 0 20px;
`;
