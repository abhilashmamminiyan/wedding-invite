# Luxury Wedding Invitation Platform (Next.js + Google Form + Vercel)

A customizable, privacy-first digital wedding invitation platform featuring automated draft preview delivery, multi-template styling, and payment activation gating.

---

## 🌟 Key Features

1. **Multiple Curated Templates**:
   - **Template 1: Kerala Classical Ivory** (Arch-framed hero, Cormorant Garamond, gold sprigs, Muhurtham live countdown, Google Calendar, ambient audio dock).
   - **Template 2: Modern Floral Romance** (Soft blush & champagne hues, modern card layout, interactive audio, photo memories).
2. **Server-Side Security & Privacy**:
   - Google Sheet IDs, respondent email addresses, and backend credentials are strictly confined to the server (`process.env`).
   - Zero sensitive information or raw spreadsheets are exposed in the browser bundle, console, or Network tab.
3. **Automated Client Workflow**:
   - **Step 1**: Client fills out your Google Form.
   - **Step 2**: An automated **Temporary Draft Preview** (`/preview/[slug]`) is generated and emailed to the client via Nodemailer.
   - **Step 3**: The client reviews their draft on mobile or desktop (with preview watermark and payment CTA).
   - **Step 4**: Upon payment confirmation, the unwatermarked official link (`/invite/[slug]`) is unlocked with WhatsApp guest sharing enabled.
4. **Interactive Features**:
   - Real-time countdown to exact Muhurtham (UTC with timezone precision).
   - Dynamic Apple / Outlook `.ics` Calendar file generator.
   - Direct Google Maps routing.
   - Ambient background audio with browser policy autoplay unlock on first gesture.
   - High-resolution Google Drive image streaming.

---

## 🚀 Deployment to Vercel via GitHub

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: privacy cleanup and royalty-free demo presets"
git push origin main
```

### 2. Import into Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository (`wedding-invite`).
3. In **Environment Variables**, add the following:

| Variable | Description |
| :--- | :--- |
| `APP_BASE_URL` | Your Vercel production URL (e.g. `https://your-wedding-app.vercel.app`) |
| `WEBHOOK_SECRET` | A secure random string used to verify Google Apps Script calls |
| `GOOGLE_SHEET_ID` | (Optional) Your private Google Sheet ID from the URL |
| `GOOGLE_SHEET_CSV_URL` | (Optional) Private published CSV URL of responses |
| `SMTP_HOST` | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | `465` (SSL) or `587` (TLS) |
| `SMTP_USER` | Your email address (e.g. `you@gmail.com`) |
| `SMTP_PASS` | Gmail App Password (16 characters from Google Account Security) |
| `EMAIL_FROM` | `"Wedding Invitations" <you@gmail.com>` |

4. Click **Deploy**.

---

## 📋 Google Form & Google Apps Script Setup

1. Open [google-form-setup-automation.js](./google-form-setup-automation.js).
2. Follow the 1-click script instructions in [script.google.com](https://script.google.com/) to automatically generate your Google Form and linked Google Sheet.
3. Share the generated Google Form link with your couples.

---

## 💻 Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the template gallery, draft previews, and live invitation demos.
