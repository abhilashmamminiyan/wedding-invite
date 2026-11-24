import { NextRequest, NextResponse } from 'next/server';
import { sendPreviewEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Security check: optional webhook secret token
    const authHeader = req.headers.get('authorization');
    const secret = process.env.WEBHOOK_SECRET;
    if (secret && authHeader !== `Bearer ${secret}`) {
      console.warn('[Webhook Warning] Unauthorized attempt or secret mismatch');
      return NextResponse.json({ error: 'Unauthorized webhook request. Check WEBHOOK_SECRET.' }, { status: 401 });
    }

    const {
      groomName,
      brideName,
      recipientEmail,
      clientName = groomName || brideName || 'Valued Client',
      slug,
      template = 'kerala-classical',
    } = body;

    if (!recipientEmail || (!groomName && !brideName)) {
      console.warn('[Webhook Warning] Missing required fields:', { recipientEmail, groomName, brideName });
      return NextResponse.json(
        { error: 'Missing required fields (recipientEmail and groom/bride name)' },
        { status: 400 }
      );
    }

    const coupleNames = `${groomName || 'Groom'} & ${brideName || 'Bride'}`;
    const generatedSlug = (slug || `${groomName}-${brideName}`)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');

    const baseUrl = process.env.APP_BASE_URL || 'https://eazyinvite.vercel.app';
    const previewUrl = `${baseUrl}/preview/${generatedSlug}`;

    console.log('[Webhook] Processing draft for:', coupleNames, '-> Email:', recipientEmail);

    // Dispatch automated Nodemailer notification
    const emailResult = await sendPreviewEmail({
      recipientEmail,
      clientName,
      coupleNames,
      previewUrl,
      expiresInDays: 3,
    });

    console.log('[Webhook Success] Dispatched preview email:', emailResult);

    return NextResponse.json({
      success: true,
      message: 'Draft created and preview email dispatched',
      slug: generatedSlug,
      previewUrl,
      emailResult,
    });
  } catch (error: any) {
    console.error('[Webhook Error]', error);
    return NextResponse.json({ error: 'Failed to process form submission: ' + error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Helpful status check when opening in browser or testing
  const url = new URL(req.url);
  const groomName = url.searchParams.get('groomName');
  const brideName = url.searchParams.get('brideName');
  const recipientEmail = url.searchParams.get('recipientEmail');
  const slug = url.searchParams.get('slug');

  // If someone passed parameters via GET fallback
  if (recipientEmail && (groomName || brideName)) {
    const coupleNames = `${groomName || 'Groom'} & ${brideName || 'Bride'}`;
    const generatedSlug = (slug || `${groomName}-${brideName}`)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');

    const baseUrl = process.env.APP_BASE_URL || 'https://eazyinvite.vercel.app';
    const previewUrl = `${baseUrl}/preview/${generatedSlug}`;

    const emailResult = await sendPreviewEmail({
      recipientEmail,
      clientName: groomName || brideName || 'Valued Client',
      coupleNames,
      previewUrl,
      expiresInDays: 3,
    });

    return NextResponse.json({
      success: true,
      message: 'Draft created via GET fallback and preview email dispatched',
      slug: generatedSlug,
      previewUrl,
      emailResult,
    });
  }

  return NextResponse.json({
    status: 'online',
    endpoint: '/api/webhook/form-submit',
    message: 'Webhook is active and ready to receive form submissions.',
  });
}
