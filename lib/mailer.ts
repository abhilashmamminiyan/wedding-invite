import nodemailer from 'nodemailer';

// Server-only Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: (process.env.SMTP_PORT || '465') === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface SendPreviewEmailParams {
  recipientEmail: string;
  clientName: string;
  coupleNames: string;
  previewUrl: string;
  expiresInDays?: number;
}

export interface SendActivationEmailParams {
  recipientEmail: string;
  clientName: string;
  coupleNames: string;
  liveInviteUrl: string;
}

/**
 * Sends a Temporary Preview email to the client after Google Form submission
 */
export async function sendPreviewEmail({
  recipientEmail,
  clientName,
  coupleNames,
  previewUrl,
  expiresInDays = 3,
}: SendPreviewEmailParams) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Mailer Notice] SMTP not configured. Preview URL generated:', previewUrl);
    return { success: true, simulated: true };
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F3EA; color: #49372D; margin: 0; padding: 30px 15px; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #D9C9B2; padding: 36px 28px; box-shadow: 0 10px 25px rgba(73, 55, 45, 0.08); text-align: center; }
    .monogram { font-size: 28px; font-weight: bold; color: #B99A60; letter-spacing: 2px; margin-bottom: 8px; }
    h1 { font-size: 24px; color: #49372D; margin-top: 0; }
    p { font-size: 16px; line-height: 1.6; color: #6A5546; margin: 12px 0; }
    .btn { display: inline-block; background: #49372D; color: #FFFCF7 !important; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 24px 0; }
    .badge { display: inline-block; background: #F2E8D8; color: #85683A; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px; }
    .footer { font-size: 13px; color: #A5A88A; margin-top: 30px; border-top: 1px solid #EDE0CA; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="monogram">✦ WEDDING INVITATIONS ✦</div>
    <div class="badge">Draft Preview Ready</div>
    <h1>Hello ${clientName},</h1>
    <p>Your custom wedding invitation website draft for <strong>${coupleNames}</strong> has been generated!</p>
    <p>Please review the design, photos, venue details, and background music below:</p>
    <a href="${previewUrl}" class="btn" target="_blank">Review Your Wedding Website Draft →</a>
    <p style="font-size: 14px; color: #85683A;">
      ⏳ <em>Note: This is a temporary private preview link valid for ${expiresInDays} days. Once you confirm and complete payment, your permanent shareable invitation will be instantly unlocked for WhatsApp & guests!</em>
    </p>
    <div class="footer">
      If you did not submit this request or need adjustments, simply reply to this email.
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Wedding Invitations" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `Your Wedding Invitation Draft is Ready! 💍 (${coupleNames})`,
      html,
    });
    console.log('[Nodemailer Success] Sent email to', recipientEmail, 'MessageId:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (err: any) {
    console.error('[Nodemailer Error] Failed to send email to', recipientEmail, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Sends Official Activated Invite Link upon payment confirmation
 */
export async function sendActivationEmail({
  recipientEmail,
  clientName,
  coupleNames,
  liveInviteUrl,
}: SendActivationEmailParams) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Mailer Notice] SMTP not configured. Live URL:', liveInviteUrl);
    return { success: true, simulated: true };
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F3EA; color: #49372D; margin: 0; padding: 30px 15px; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #D9C9B2; padding: 36px 28px; box-shadow: 0 10px 25px rgba(73, 55, 45, 0.08); text-align: center; }
    .monogram { font-size: 28px; font-weight: bold; color: #B99A60; letter-spacing: 2px; margin-bottom: 8px; }
    h1 { font-size: 24px; color: #49372D; margin-top: 0; }
    p { font-size: 16px; line-height: 1.6; color: #6A5546; margin: 12px 0; }
    .btn { display: inline-block; background: #B99A60; color: #FFFCF7 !important; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 24px 0; }
    .share-box { background: #F8F3EA; border-radius: 8px; padding: 16px; text-align: left; font-size: 14px; color: #49372D; margin-top: 20px; }
    .footer { font-size: 13px; color: #A5A88A; margin-top: 30px; border-top: 1px solid #EDE0CA; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="monogram">✨ CONGRATULATIONS ✨</div>
    <h1>Your Wedding Invitation is Officially Live!</h1>
    <p>Dear ${clientName},</p>
    <p>Your payment has been received and verified. The official wedding website for <strong>${coupleNames}</strong> is now live with all guest sharing features, calendar downloads, and full high-res photo gallery unlocked!</p>
    <a href="${liveInviteUrl}" class="btn" target="_blank">Open Live Wedding Website →</a>
    
    <div class="share-box">
      <strong>📱 Quick WhatsApp Share Message:</strong><br><br>
      <em>"With the blessings of our families, we invite you to celebrate our wedding. Please join us and view our invitation details here: ${liveInviteUrl}"</em>
    </div>

    <div class="footer">
      Wishing you a lifetime of joy and happiness!
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Wedding Invitations" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `Your Wedding Website is LIVE! 🎉 (${coupleNames})`,
      html,
    });
    console.log('[Nodemailer Success] Sent activation email to', recipientEmail, 'MessageId:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (err: any) {
    console.error('[Nodemailer Error] Failed to send activation email to', recipientEmail, err.message);
    return { success: false, error: err.message };
  }
}
