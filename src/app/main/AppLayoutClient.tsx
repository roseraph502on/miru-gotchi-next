'use client';

import QueryProvider from '../providers/QueryProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import PrivateRoute from '../login/component/PrivateRoute';

const Wrap = styled.div`
  position: relative;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-width: 340px;
`;

const ContentArea = styled.main`
  padding: 70px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1280px) {
    padding: 120px 0 50px;
  }
`;

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <QueryProvider>
          <PrivateRoute>
            <Wrap>
              <Header />
              <ContentArea>{children}</ContentArea>
              <Menu />
            </Wrap>
          </PrivateRoute>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
