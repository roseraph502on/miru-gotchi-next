'use client';

import Loading from '@/components/Loading';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);
  //확인 중
  if (user === undefined) return <Loading />;
  //로그인 되어 있으면 로그인 페이지로 이동
  if (user !== null) return null;
  //로그인 안되어 있으면 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default LoginRoute;
