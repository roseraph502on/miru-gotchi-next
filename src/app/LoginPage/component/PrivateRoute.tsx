'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // 또는 로딩 스피너
  }

  return <>{children}</>;
};

export default PrivateRoute;
