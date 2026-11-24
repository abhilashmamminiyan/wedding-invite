import Link from 'next/link';
import { Sparkles, ShieldCheck, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory text-espresso font-body antialiased">
      {/* Top Banner */}
      <div className="bg-espresso text-cream text-xs text-center py-2 px-4 border-b border-gold/30">
        ✨ Customizable Digital Wedding Invitations with Automated Preview &amp; Payment Gating
      </div>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
        <svg className="w-36 h-12 text-sage mx-auto"><use href="#sprig" /></svg>
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink">
          Handcrafted Wedding Experiences
        </span>
        <h1 className="font-display text-5xl sm:text-7xl font-normal leading-tight text-espresso max-w-3xl mx-auto">
          Create Your Dream Wedding Website
        </h1>
        <svg className="w-44 h-5 text-gold mx-auto"><use href="#divider" /></svg>
        <p className="font-display text-xl sm:text-2xl text-espresso-soft max-w-2xl mx-auto italic">
          Couples fill your custom Google Form, receive a temporary private preview in their email, and unlock their live invitation after payment.
        </p>
      </header>

      {/* TEMPLATE SHOWCASE */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta">Select A Style</span>
          <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mt-2">
            Available Wedding Templates
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Template 1: Kerala Classical */}
          <div className="bg-cream rounded-3xl border border-borderTone overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/10] bg-champagne overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
                alt="Classical Wedding Template"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-espresso/90 text-cream px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                Template 1 · Classical Ivory
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display text-3xl font-semibold text-espresso">Kerala Classical Ivory</h3>
                <p className="text-sm text-espresso-soft mt-2 leading-relaxed">
                  Inspired by traditional classical elegance. Features arched portrait frames, Cormorant Garamond typography, hand-drawn floral sprigs, Muhurtham live countdown, Google Calendar integration, and ambient audio dock.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-gold-ink">Ivory &amp; Gold</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-gold-ink">Arch Hero</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-gold-ink">Audio Dock</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-gold-ink">ICS Calendar</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/preview/aarav-meera"
                  className="flex-1 py-3 px-4 rounded-xl bg-espresso text-cream font-semibold text-xs uppercase tracking-wider text-center hover:bg-gold-ink transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  View Draft Preview
                </Link>
                <Link
                  href="/invite/aarav-meera"
                  className="flex-1 py-3 px-4 rounded-xl border border-espresso/40 text-espresso font-semibold text-xs uppercase tracking-wider text-center hover:bg-espresso/5 transition-colors"
                >
                  View Live Invite
                </Link>
              </div>
            </div>
          </div>

          {/* Template 2: Modern Romance */}
          <div className="bg-cream rounded-3xl border border-borderTone overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/10] bg-[#FAF4ED] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Romance Wedding Template"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#A66360] text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                Template 2 · Modern Romance
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display text-3xl font-semibold text-espresso">Modern Floral Romance</h3>
                <p className="text-sm text-espresso-soft mt-2 leading-relaxed">
                  Clean, modern romantic aesthetic. Features soft rose and champagne hues, contemporary clean card layouts, floating interactive music, dual event cards with direct maps, and mobile-friendly gallery.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-[#A66360]">Rose Champagne</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-[#A66360]">Modern Minimal</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-[#A66360]">Google Maps</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-ivory rounded-md border border-borderTone text-[#A66360]">Photo Modal</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/preview/arjun-diya"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#A66360] text-white font-semibold text-xs uppercase tracking-wider text-center hover:bg-[#8A4F4C] transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  View Draft Preview
                </Link>
                <Link
                  href="/invite/arjun-diya"
                  className="flex-1 py-3 px-4 rounded-xl border border-espresso/40 text-espresso font-semibold text-xs uppercase tracking-wider text-center hover:bg-espresso/5 transition-colors"
                >
                  View Live Invite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOMATION FLOW */}
      <section className="py-20 bg-champagne-soft/40 border-y border-borderTone/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink">Automated Process</span>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mt-2">
              How the Client Flow Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-cream p-6 rounded-2xl border border-borderTone shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-ink font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h4 className="font-display text-xl font-semibold">Google Form</h4>
              <p className="text-xs text-espresso-soft leading-relaxed">
                You share the Google Form link. The couple fills names, venue, dates, Google Drive photo link, and email.
              </p>
            </div>

            <div className="bg-cream p-6 rounded-2xl border border-borderTone shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-ink font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h4 className="font-display text-xl font-semibold">Instant Preview</h4>
              <p className="text-xs text-espresso-soft leading-relaxed">
                Nodemailer triggers an automated email with their private <code>/preview/[slug]</code> draft link.
              </p>
            </div>

            <div className="bg-cream p-6 rounded-2xl border border-borderTone shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-ink font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h4 className="font-display text-xl font-semibold">Review &amp; Pay</h4>
              <p className="text-xs text-espresso-soft leading-relaxed">
                The couple reviews their website on mobile or desktop and completes their activation payment.
              </p>
            </div>

            <div className="bg-cream p-6 rounded-2xl border border-borderTone shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-ink font-bold flex items-center justify-center mx-auto text-sm">
                4
              </div>
              <h4 className="font-display text-xl font-semibold">Live Invite</h4>
              <p className="text-xs text-espresso-soft leading-relaxed">
                Once confirmed, the final unwatermarked link <code>/invite/[slug]</code> is sent with WhatsApp sharing ready!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY CALLOUT */}
      <section className="py-16 max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-gold-ink">
          <ShieldCheck className="w-6 h-6" />
          <span className="font-bold text-sm tracking-wide">Server-Side Security &amp; Privacy Guaranteed</span>
        </div>
        <p className="text-sm text-espresso-soft max-w-2xl mx-auto leading-relaxed">
          Google Sheet IDs, service account keys, and client contact details are never exposed to the client bundle or network tab. Next.js server components render the sanitized invitation directly from the server.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-borderTone py-8 text-center text-xs text-espresso-soft bg-cream">
        <p className="font-display text-base font-semibold text-espresso">Wedding Invitation Platform</p>
        <p className="mt-1">Deployable to Vercel via GitHub with zero configuration</p>
      </footer>
    </div>
  );
}
