'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading'; // 로딩 컴포넌트 임의로 추가

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // user가 null일 때만 리디렉션 (undefined는 "확인 중" 상태)
    if (user === null) {
      router.replace('/login');
    }
  }, [user, router]);

  // 아직 Firebase 인증 상태 확인 중이면 로딩 표시
  if (user === undefined) return <Loading />;

  // 로그인 안 됨: useEffect가 redirect 중일 것이므로 아무것도 표시하지 않음
  if (user === null) return null;

  // 로그인 완료 시 children 렌더링
  return <>{children}</>;
};

export default PrivateRoute;
