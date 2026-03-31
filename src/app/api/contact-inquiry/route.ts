import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';

const VALID_BUDGET_RANGES = ['<$500', '$500-2000', '$2000-5000', '$5000+'];
const VALID_TIMELINES = ['ASAP', '1 week', '2-4 weeks', 'flexible'];

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/"/g, '\\"');
}

function execAsync(command: string): Promise<void> {
  return new Promise((resolve) => {
    exec(command, (err) => {
      if (err) {
        console.error('[contact-inquiry] email exec error:', err.message);
      }
      resolve();
    });
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: '잘못된 요청 본문입니다.' }, { status: 400 });
  }

  const {
    name: requesterName,
    email: requesterEmail,
    message,
    budget_range: budgetRange,
    timeline,
  } = body as Record<string, unknown>;

  if (!requesterName || typeof requesterName !== 'string' || requesterName.trim().length === 0) {
    return NextResponse.json({ error: '이름을 입력해 주세요.' }, { status: 400 });
  }

  if (!requesterEmail || typeof requesterEmail !== 'string' || !requesterEmail.includes('@')) {
    return NextResponse.json({ error: '유효한 이메일을 입력해 주세요.' }, { status: 400 });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: '문의 내용을 입력해 주세요.' }, { status: 400 });
  }

  if (budgetRange !== undefined && !VALID_BUDGET_RANGES.includes(budgetRange as string)) {
    return NextResponse.json({ error: '잘못된 예산 범위입니다.' }, { status: 400 });
  }

  if (timeline !== undefined && !VALID_TIMELINES.includes(timeline as string)) {
    return NextResponse.json({ error: '잘못된 도입 일정입니다.' }, { status: 400 });
  }

  const inquiryEmail =
    process.env.AGENT_LAB_INQUIRY_EMAIL ??
    process.env.INTRONODE_KOREA_INQUIRY_EMAIL ??
    'agentlab@intronode.ai';

  const subject = `[Agent Lab] 신규 컨설팅 문의 - ${sanitize(requesterName)}`;
  const budgetInfo = budgetRange ? `예산 범위: ${sanitize(budgetRange as string)}` : '';
  const timelineInfo = timeline ? `희망 일정: ${sanitize(timeline as string)}` : '';

  const emailBody = [
    'Agent Lab 랜딩 페이지에서 신규 컨설팅 문의가 접수되었습니다.',
    '',
    `이름: ${sanitize(requesterName)}`,
    `이메일: ${sanitize(requesterEmail)}`,
    budgetInfo,
    timelineInfo,
    '',
    '문의 내용:',
    sanitize(message),
  ]
    .filter(Boolean)
    .join('\\n');

  const cmd = `node /Users/aribot/.openclaw/workspace/scripts/send-email.js "${sanitize(inquiryEmail)}" "${subject}" "${emailBody}"`;

  await execAsync(cmd);

  return NextResponse.json({ success: true }, { status: 201 });
}
