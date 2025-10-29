'use client';

import { Card, Container } from '@mui/material';
import LoginButton from './component/LoginButton';
import styled from 'styled-components';
import Image from 'next/image';

const LoginContainer = styled(Container)(() => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledCard = styled(Card)(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  textAlign: 'center',
  gap: 8,
  padding: 24,
  paddingBottom: 100,
}));
const LogoImage = styled(Image)({
  width: '200px',
  height: 'auto',
  marginBottom: '1rem',
});
const TextLogoImage = styled(Image)({
  width: '240px',
  height: 'auto',
  marginBottom: '1.8rem',
});
const LoginPage = () => {
  return (
    <LoginContainer maxWidth="sm" disableGutters>
      <StyledCard elevation={3}>
        <LogoImage alt="미루고치" src={eggLogo} />
        <TextLogoImage alt="미루고치" src={logo} />
        <LoginButton />
      </StyledCard>
    </LoginContainer>
  );
};

export default LoginPage;
