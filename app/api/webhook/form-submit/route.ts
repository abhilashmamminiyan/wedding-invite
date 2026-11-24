import { NextRequest, NextResponse } from 'next/server';
import { sendPreviewEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Security check: optional webhook secret token
    const authHeader = req.headers.get('authorization');
    const secret = process.env.WEBHOOK_SECRET;
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 });
    }

    const {
      groomName,
      brideName,
      recipientEmail,
      clientName = groomName || 'Valued Client',
      slug,
      template = 'kerala-classical',
    } = body;

    if (!recipientEmail || (!groomName && !brideName)) {
      return NextResponse.json(
        { error: 'Missing required fields (recipientEmail and groom/bride name)' },
        { status: 400 }
      );
    }

    const coupleNames = `${groomName || 'Groom'} & ${brideName || 'Bride'}`;
    const generatedSlug = (slug || `${groomName}-${brideName}`)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');

    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
    const previewUrl = `${baseUrl}/preview/${generatedSlug}`;

    // Dispatch automated Nodemailer notification
    const emailResult = await sendPreviewEmail({
      recipientEmail,
      clientName,
      coupleNames,
      previewUrl,
      expiresInDays: 3,
    });

    return NextResponse.json({
      success: true,
      message: 'Draft created and preview email dispatched',
      slug: generatedSlug,
      previewUrl,
      emailResult,
    });
  } catch (error: any) {
    console.error('[Webhook Error]', error);
    return NextResponse.json({ error: 'Failed to process form submission' }, { status: 500 });
  }
}
