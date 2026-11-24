'use client';

import React, { useState } from 'react';
import { ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface PreviewBannerProps {
  coupleNames: string;
  slug: string;
}

export const PreviewBanner: React.FC<PreviewBannerProps> = ({ coupleNames, slug }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div className="sticky top-0 z-[100] bg-espresso text-cream border-b border-gold/40 px-4 py-2.5 shadow-lg backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <p className="text-champagne font-medium">
              <strong className="text-gold uppercase tracking-wider text-[11px] mr-1.5 font-bold">Draft Preview Mode</strong>
              Viewing invitation for <span className="text-white font-semibold">{coupleNames}</span>. Guest sharing is currently locked.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-full border border-champagne/30 text-champagne hover:bg-white/10 transition-colors text-xs"
            >
              {copied ? 'Link Copied!' : 'Copy Preview Link'}
            </button>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-1.5 rounded-full bg-gold text-espresso font-semibold hover:bg-gold-ink hover:text-white transition-colors flex items-center gap-1.5 shadow-sm text-xs sm:text-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Confirm & Unlock Live Invite
            </button>
          </div>
        </div>
      </div>

      {/* Payment / Activation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[200] bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream border border-gold/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-espresso">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-espresso/60 hover:text-espresso text-xl font-bold p-1"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold-ink flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-espresso">
                Unlock Official Invitation
              </h3>
              <p className="text-espresso/70 text-sm mt-1">
                Website draft for <strong>{coupleNames}</strong>
              </p>
            </div>

            <div className="bg-ivory border border-borderTone rounded-xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between border-b border-borderTone/50 pb-2">
                <span className="text-espresso/70">Custom Wedding Website:</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="flex justify-between border-b border-borderTone/50 pb-2">
                <span className="text-espresso/70">Google Calendar & .ICS Save the Date:</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="flex justify-between border-b border-borderTone/50 pb-2">
                <span className="text-espresso/70">Ambient Audio & Full Gallery:</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="flex justify-between border-b border-borderTone/50 pb-2">
                <span className="text-espresso/70">Instant WhatsApp Guest Sharing:</span>
                <span className="font-medium">Unlocked</span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-base">
                <span>One-time Activation:</span>
                <span className="text-gold-ink">₹999 / $15</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-champagne-soft/50 rounded-xl border border-borderTone">
                <p className="text-xs text-espresso/80 mb-2">Scan UPI QR or Pay to activate instantly:</p>
                <div className="w-36 h-36 bg-white border border-borderTone rounded-lg mx-auto flex items-center justify-center text-xs text-espresso/50 shadow-inner">
                  [ UPI QR CODE ]
                </div>
                <p className="text-xs font-mono font-medium text-espresso mt-2">UPI ID: your-upi-id@okbank</p>
              </div>

              <a
                href={`https://wa.me/?text=Hi%2C%20I%20have%20reviewed%20my%20wedding%20invitation%20draft%20for%20${encodeURIComponent(
                  coupleNames
                )}%20(${slug})%20and%20completed%20the%20payment.%20Please%20activate%20my%20official%20link!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-3 px-4 rounded-xl bg-gold text-espresso font-semibold hover:bg-gold-ink hover:text-white transition-colors"
              >
                Send Payment Confirmation via WhatsApp →
              </a>

              <p className="text-[11px] text-center text-espresso/60 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Your official link with WhatsApp sharing will be delivered to your email instantly.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
