import type { Metadata } from 'next';
import AppLayoutClient from './main/AppLayoutClient';

export const metadata: Metadata = {
  title: '미루고치',
  description: '습관 형성을 돕는 가상 반려동물 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  );
}
