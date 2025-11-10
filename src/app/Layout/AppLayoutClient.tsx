'use client';

import QueryProvider from '../providers/QueryProvider';
import { AuthProvider } from '@/context/AuthProvider';
import Loading from '@/components/Loading';
import { Suspense } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Menu from './Menu';

const Wrap = styled('div')({
  position: 'relative',
  height: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  minWidth: '340px',
});

const ContentArea = styled('main')({
  padding: '70px 20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width:1280px)': {
    padding: '120px 0 50px',
  },
});

const AppLayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrap>
      <Header />
      <AuthProvider>
        <QueryProvider>
          <ContentArea>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ContentArea>
        </QueryProvider>
      </AuthProvider>
      <Menu />
    </Wrap>
  );
};

export default AppLayoutClient;

