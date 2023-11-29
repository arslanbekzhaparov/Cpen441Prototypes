// Button.tsx
import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Define the styled component
const StyledButton = styled.button`
  width: 284px;
  height: 61px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #ECEDF0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
//   background: linear-gradient(90deg, #279D50 20.95%, rgba(9, 35, 18, 0.69) 81.87%);
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   margin-top: auto; /* Push the button to the bottom */
  color: linear-gradient(90deg, #279D50 20.95%, rgba(9, 35, 18, 0.69) 81.87%);
`;

// Define the props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Button component
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;