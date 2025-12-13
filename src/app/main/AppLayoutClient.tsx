'use client';

import QueryProvider from '../providers/QueryProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import PrivateRoute from '../login/component/PrivateRoute';
import { usePathname } from 'next/navigation';

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  min-width: 340px;
`;

const ContentArea = styled.main<{ $isLogin?: boolean }>`
  padding: ${props => props.$isLogin ? '0' : '70px 20px 50px 20px'};
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (min-width: 1280px) {
    padding: ${props => props.$isLogin ? '0' : '120px 0 0px'};
  }
`;

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginRoute = pathname?.startsWith('/login');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <QueryProvider>
          {isLoginRoute ? (
            <ContentArea $isLogin={true}>{children}</ContentArea>
          ) : (
            <PrivateRoute>
              <Wrap>
                <Header />
                <ContentArea $isLogin={false}>{children}</ContentArea>
                <Menu />
              </Wrap>
            </PrivateRoute>
          )}
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
