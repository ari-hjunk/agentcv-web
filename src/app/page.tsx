import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ConsultingRequestForm from '@/components/ConsultingRequestForm';

export const metadata: Metadata = {
  title: 'Agent Lab — AI 에이전트가 당신의 비즈니스를 24시간 운영합니다',
  description:
    'Intronode Korea의 AI 에이전트 구축/운영 컨설팅. 한국 중소기업 대표를 위해 고객응대, 영업, 운영, 리서치 자동화를 설계하고 실제로 운영합니다.',
  openGraph: {
    title: 'Agent Lab — AI 에이전트가 당신의 비즈니스를 24시간 운영합니다',
    description:
      'Intronode Korea의 AI 에이전트 구축/운영 컨설팅. 한국 중소기업 맞춤형 AI 에이전트 도입과 운영을 지원합니다.',
    url: 'https://agentcv.ai',
    siteName: 'Agent Lab',
    type: 'website',
    images: [{ url: 'https://agentcv.ai/og-default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Lab — AI 에이전트가 당신의 비즈니스를 24시간 운영합니다',
    description:
      '한국 중소기업을 위한 AI 에이전트 구축/운영 컨설팅. 반복 업무를 24시간 운영 체계로 전환합니다.',
    images: ['https://agentcv.ai/og-default.png'],
  },
};

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-sm text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Intronode Korea AI Agent Consulting
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-tight">
            Agent Lab
            <br />
            AI 에이전트가 당신의 비즈니스를 24시간 운영합니다
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
            Intronode Korea는 한국 중소기업 대표를 위해 고객응대, 영업, 운영, 리서치 같은 반복
            업무를 AI 에이전트 체계로 설계하고 실제 운영까지 맡습니다.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#consulting-inquiry"
              className="inline-flex h-12 items-center rounded-xl bg-accent px-8 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
            >
              컨설팅 문의하기
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center rounded-xl border border-border px-8 text-sm font-medium text-text-primary transition-all hover:bg-surface-elevated"
            >
              Agent Lab 소개
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    {
      title: '대표가 직접 챙기던 운영 업무를 자동화',
      description:
        '문의 응대, 일정 조율, 자료 정리, 리드 분류, 내부 보고 같은 반복 업무를 AI 에이전트가 24시간 처리합니다.',
    },
    {
      title: '한국 중소기업 현실에 맞는 도입',
      description:
        '복잡한 PoC보다 실제 현장에 맞는 자동화 흐름을 우선 설계합니다. 적은 인력으로도 바로 쓰는 운영 체계가 목표입니다.',
    },
    {
      title: '구축에서 운영까지 함께',
      description:
        '에이전트 설계로 끝내지 않습니다. 운영 규칙, 모니터링, 개선 루프까지 포함해 지속적으로 돌아가는 시스템을 만듭니다.',
    },
  ];

  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {props.map((prop) => (
            <div
              key={prop.title}
              className="rounded-xl border border-border bg-surface-elevated p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{prop.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const solutions = [
    {
      title: '고객응대 에이전트',
      description:
        '홈페이지, 카카오톡, 이메일로 들어오는 문의를 분류하고 답변 초안을 생성해 응답 속도를 높입니다.',
      metric: '응답 공백 최소화',
    },
    {
      title: '영업/리드 관리 에이전트',
      description:
        '잠재고객을 수집하고 우선순위를 매기며, 후속 연락과 제안서 준비를 자동으로 이어갑니다.',
      metric: '대표의 팔로업 부담 감소',
    },
    {
      title: '운영 지원 에이전트',
      description:
        '회의록 정리, 일정 리마인드, 문서 초안 작성, 리서치 보고까지 백오피스 업무를 상시 처리합니다.',
      metric: '반복 업무 시간 절감',
    },
  ];

  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              이런 업무부터 Agent Lab으로 전환합니다
            </h2>
            <p className="mt-2 text-text-secondary">
              가장 많이 문의받는 중소기업용 AI 에이전트 구축 영역입니다
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="rounded-xl border border-border bg-surface-elevated p-6 transition-all duration-200 hover:bg-surface-hover hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-text-primary">{solution.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {solution.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-border-subtle pt-4">
                <span className="text-xs text-text-tertiary">기대 효과</span>
                <p className="mt-1 text-sm font-medium text-text-primary">{solution.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: '업무 진단',
      description:
        '대표와 실무자가 반복적으로 붙잡히는 업무를 찾고, AI 에이전트가 대신할 수 있는 범위를 정의합니다.',
    },
    {
      step: '02',
      title: '에이전트 설계 및 구축',
      description:
        '업무 흐름, 데이터 연결, 응답 규칙, 승인 포인트를 설계해 바로 운영 가능한 형태로 구축합니다.',
    },
    {
      step: '03',
      title: '운영 안정화',
      description:
        '실사용 데이터로 품질을 점검하고, 모니터링과 개선 루프를 돌려 실제 비즈니스에 안착시킵니다.',
    },
  ];

  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Agent Lab 컨설팅 진행 방식
          </h2>
          <p className="mt-3 text-text-secondary">
            보여주기용 데모보다 실제 운영되는 자동화를 우선합니다
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-elevated text-xl font-bold text-accent">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="consulting-inquiry" className="border-t border-border py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
            대표님이 직접 돌보는 일을
            <br />
            AI 에이전트에게 넘길 시점입니다
          </h2>
          <p className="mt-4 max-w-xl text-text-secondary">
            어떤 업무를 자동화해야 할지 모르셔도 됩니다. 현재 운영 방식과 병목만 알려주시면 Agent
            Lab이 도입 우선순위와 실행 방안을 함께 정리합니다.
          </p>

          <div className="mt-8 space-y-4 text-sm text-text-secondary">
            <div className="rounded-xl border border-border bg-surface-elevated p-4">
              고객 응대, 영업 팔로업, 내부 운영 자동화 중 어디서 시작할지 함께 진단합니다.
            </div>
            <div className="rounded-xl border border-border bg-surface-elevated p-4">
              소규모 팀도 감당 가능한 범위로 설계해 복잡한 조직 변화 없이 도입합니다.
            </div>
            <div className="rounded-xl border border-border bg-surface-elevated p-4">
              구축 후 끝나지 않고 운영 기준과 개선 루프까지 포함해 안정화합니다.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">컨설팅 문의</h3>
            <p className="mt-2 text-sm text-text-secondary">
              간단한 상황만 남겨 주시면 확인 후 연락드리겠습니다.
            </p>
          </div>

          <ConsultingRequestForm
            endpoint="/api/contact-inquiry"
            budgetOptions={[
              { value: '<$500', label: '500달러 미만' },
              { value: '$500-2000', label: '500달러 - 2,000달러' },
              { value: '$2000-5000', label: '2,000달러 - 5,000달러' },
              { value: '$5000+', label: '5,000달러 이상' },
            ]}
            timelineOptions={[
              { value: 'ASAP', label: '가능한 한 빠르게' },
              { value: '1 week', label: '1주 이내' },
              { value: '2-4 weeks', label: '2-4주 이내' },
              { value: 'flexible', label: '유연하게 검토 중' },
            ]}
            labels={{
              name: '성함',
              email: '이메일',
              budget: '예산 범위',
              timeline: '희망 도입 시점',
              message: '어떤 도움이 필요하신가요?',
              submit: '문의 보내기',
              submitting: '보내는 중...',
              successTitle: '문의가 정상적으로 접수되었습니다',
              successDescription: '{email}로 회신드릴 예정입니다. 빠르게 검토 후 연락드리겠습니다.',
              genericError: '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
              unexpectedError: '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
            }}
            placeholders={{
              name: '홍길동',
              email: 'ceo@company.kr',
              message:
                '예: 고객 문의 응대 자동화, 영업 리드 정리, 사내 반복 업무 자동화 중 어떤 문제를 해결하고 싶은지 적어 주세요.',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ValueProps />
        <SolutionSection />
        <HowItWorks />
        <CTASection />
      </main>
    </>
  );
}
