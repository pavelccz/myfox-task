import { styled, css } from 'styled-components';

const baseButtonStyles = css`
  margin: 8px 0;
  border-radius: 6px;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background: #00A800;
  color: white;
  font-weight: 600;
  
  &:hover {
    background: #16a34a;
  }
`;

export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background: #CCCCCC;
  color: black;
  
  &:hover {
    background: #b3b3b3;
  }
`;
