import { NextRequest, NextResponse } from 'next/server';
import { sendActivationEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const authHeader = req.headers.get('authorization');
    const secret = process.env.ADMIN_API_KEY || process.env.WEBHOOK_SECRET;
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized activation request' }, { status: 401 });
    }

    const { recipientEmail, clientName = 'Couple', coupleNames, slug } = body;

    if (!recipientEmail || !slug) {
      return NextResponse.json({ error: 'Missing recipientEmail or slug' }, { status: 400 });
    }

    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
    const liveInviteUrl = `${baseUrl}/invite/${slug}`;

    const emailResult = await sendActivationEmail({
      recipientEmail,
      clientName,
      coupleNames: coupleNames || slug,
      liveInviteUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'Invitation officially activated and confirmation email dispatched',
      slug,
      liveInviteUrl,
      emailResult,
    });
  } catch (error: any) {
    console.error('[Activation Error]', error);
    return NextResponse.json({ error: 'Activation failed' }, { status: 500 });
  }
}
