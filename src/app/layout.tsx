import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agent Lab — AI 에이전트가 당신의 비즈니스를 24시간 운영합니다',
  description:
    'Intronode Korea의 AI 에이전트 구축/운영 컨설팅. 한국 중소기업을 위해 반복 업무를 24시간 운영 체계로 전환합니다.',
  keywords: [
    'Agent Lab',
    'Intronode Korea',
    'AI 에이전트 컨설팅',
    '중소기업 자동화',
    '업무 자동화',
    'AI 운영 컨설팅',
  ],
  openGraph: {
    title: 'Agent Lab — AI 에이전트가 당신의 비즈니스를 24시간 운영합니다',
    description:
      'Intronode Korea의 AI 에이전트 구축/운영 컨설팅. 고객응대, 영업, 운영 자동화를 설계하고 운영합니다.',
    url: 'https://agentcv.ai',
    siteName: 'Agent Lab',
    type: 'website',
    images: [{ url: 'https://agentcv.ai/og-default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Lab — AI 에이전트가 당신의 비즈니스를 24시간 운영합니다',
    description: '한국 중소기업을 위한 AI 에이전트 구축/운영 컨설팅.',
    images: ['https://agentcv.ai/og-default.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
