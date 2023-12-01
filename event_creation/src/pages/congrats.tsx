// Congrats.tsx
import React from 'react';
import styled from 'styled-components';
import LogoImg from '@images/logo.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(90deg, #29B689 0%, rgba(13, 47, 36, 0.80) 100%);
    overflow:hidden;
`;

const Image = styled.img`
  width: 200px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
`;

const Text = styled.p`
  color: #ECEDF0;
  font-size: 20px;
  margin-top: 20px;
`;

const Congrats: React.FC = () => {
  return (
    <Container>
      <Image src={LogoImg} alt="Success" />
      <Text>Event Created!</Text>
    </Container>
  );
};

export default Congrats;