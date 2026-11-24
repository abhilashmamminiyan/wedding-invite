'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WeddingData } from '@/types/wedding';
import { buildGoogleCalendarUrl } from '@/lib/calendar';

interface Props {
  data: WeddingData;
  isPreview?: boolean;
}

export const KeralaClassicalTemplate: React.FC<Props> = ({ data, isPreview = false }) => {
  const { couple, overview, invitationNote, events, photos, audio } = data;
  const coupleNames = `${couple.groom.name} & ${couple.bride.name}`;

  // Navigation State
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Audio Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioHint, setAudioHint] = useState<string | null>('Tap anywhere for music');

  // Lightbox State
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });
  const [countdownStatus, setCountdownStatus] = useState<string>('');

  // Share Notification State
  const [shareFeedback, setShareFeedback] = useState<string>('');

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio setup & unlock on first gesture
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !audio?.enabled) return;

    el.volume = 0.5;

    const unlockAudio = () => {
      if (el.paused) {
        el.play()
          .then(() => {
            setIsPlaying(true);
            setAudioHint(null);
          })
          .catch(() => {
            // Browser blocked autoplay until click
          });
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      ['pointerdown', 'touchend', 'click', 'keydown'].forEach((ev) =>
        document.removeEventListener(ev, unlockAudio, true)
      );
    };

    ['pointerdown', 'touchend', 'click', 'keydown'].forEach((ev) =>
      document.addEventListener(ev, unlockAudio, { capture: true, passive: true })
    );

    return () => cleanupListeners();
  }, [audio]);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play()
        .then(() => {
          setIsPlaying(true);
          setAudioHint(null);
        })
        .catch(() => {
          setAudioHint('Music unavailable');
        });
    }
  };

  // Real-time Countdown calculation
  useEffect(() => {
    const target = new Date(events.ceremony.startIsoUtc).getTime();
    const ceremonyEnd = new Date(events.ceremony.endIsoUtc).getTime();

    const update = () => {
      const now = Date.now();
      if (now >= target) {
        if (now < ceremonyEnd) {
          setCountdownStatus('The muhurtham is taking place now. Thank you for your blessings.');
        } else {
          setCountdownStatus(`Married on ${events.ceremony.dateStr}. Thank you for sharing our happiness.`);
        }
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      const diff = Math.max(0, target - now);
      const totalSec = Math.floor(diff / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      setTimeLeft({ d, h, m, s });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [events.ceremony]);

  // Share action
  const handleShare = () => {
    if (isPreview) {
      setShareFeedback('⚠️ Guest sharing is disabled in Preview Mode. Unlock to enable.');
      setTimeout(() => setShareFeedback(''), 4000);
      return;
    }

    const shareData = {
      title: `${coupleNames} | Wedding Invitation`,
      text: `${coupleNames} — ${overview.weddingDateFormatted}. With the blessings of our families, you are invited!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => copyToClipboard());
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback('Invitation link copied! Paste into WhatsApp or messages.');
    setTimeout(() => setShareFeedback(''), 4000);
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso font-body antialiased selection:bg-gold selection:text-white">
      {/* 1. STICKY HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-ivory/95 backdrop-blur-md border-b border-borderTone shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-display text-2xl font-semibold tracking-wider text-espresso">
            {couple.groom.name.charAt(0)}
            <span className="text-gold mx-1">&amp;</span>
            {couple.bride.name.charAt(0)}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#home" className="hover:text-gold-ink transition-colors">Home</a>
            <a href="#families" className="hover:text-gold-ink transition-colors">Families</a>
            <a href="#wedding" className="hover:text-gold-ink transition-colors">Ceremony</a>
            {events.reception && <a href="#reception" className="hover:text-gold-ink transition-colors">Reception</a>}
            <a href="#gallery" className="hover:text-gold-ink transition-colors">Gallery</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-espresso focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6"><use href="#i-menu" /></svg>
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <nav className="md:hidden bg-ivory/98 border-b border-borderTone px-6 py-4 flex flex-col gap-4 text-center text-sm font-medium">
            <a href="#home" onClick={() => setMenuOpen(false)} className="py-2 border-b border-borderTone/40">Home</a>
            <a href="#families" onClick={() => setMenuOpen(false)} className="py-2 border-b border-borderTone/40">Our Families</a>
            <a href="#wedding" onClick={() => setMenuOpen(false)} className="py-2 border-b border-borderTone/40">Ceremony</a>
            {events.reception && <a href="#reception" onClick={() => setMenuOpen(false)} className="py-2 border-b border-borderTone/40">Reception</a>}
            <a href="#gallery" onClick={() => setMenuOpen(false)} className="py-2">Gallery</a>
          </nav>
        )}
      </header>

      <main id="main">
        {/* 2. HERO SECTION */}
        <section id="home" className="max-w-6xl mx-auto px-6 pt-8 pb-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-4">
            <svg className="w-44 h-16 text-sage"><use href="#sprig" /></svg>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink">
              {overview.eyebrow}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal leading-tight text-espresso">
              <span>{couple.groom.name}</span>
              <span className="font-light italic text-gold mx-3">&amp;</span>
              <span>{couple.bride.name}</span>
            </h1>
            <svg className="w-44 h-5 text-gold py-1"><use href="#divider" /></svg>
            <p className="font-display text-xl sm:text-2xl text-espresso-soft">
              {overview.weddingDateFormatted}
            </p>
            <p className="text-sm font-medium tracking-wide text-olive-ink">
              {overview.placesFormatted}
            </p>
            <a
              href="#families"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-espresso hover:text-gold-ink transition-colors pt-4"
            >
              <span>Open the invitation</span>
              <span className="w-8 h-[1px] bg-gold"></span>
            </a>
          </div>

          {/* Arch Framed Hero Image */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-t-[180px] rounded-b-2xl border-4 border-champagne shadow-card aspect-[3/4] bg-champagne-soft">
              <img
                src={photos.hero}
                alt={`${coupleNames} wedding portrait`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block pointer-events-none">
              <svg className="w-40 h-16 text-sage"><use href="#sprig" /></svg>
            </div>
          </div>
        </section>

        {/* 3. FAMILIES SECTION */}
        <section id="families" className="py-20 bg-champagne-soft/40 border-y border-borderTone/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink mb-2">
              Two families, one celebration
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mb-4">
              Our Families
            </h2>
            <svg className="w-44 h-5 text-gold mx-auto mb-12"><use href="#divider" /></svg>

            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* Groom Card */}
              <div className="bg-cream p-8 rounded-2xl border border-borderTone shadow-sm text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-gold-ink">The Groom</span>
                <h3 className="font-display text-3xl font-semibold text-espresso mt-2 mb-3">{couple.groom.name}</h3>
                <p className="text-sm text-espresso-soft font-medium mb-4">{couple.groom.parents}</p>
                <div className="w-12 h-[1px] bg-gold/50 mx-auto my-4"></div>
                <div className="text-xs text-espresso-soft leading-relaxed space-y-1">
                  {couple.groom.address.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Bride Card */}
              <div className="bg-cream p-8 rounded-2xl border border-borderTone shadow-sm text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-gold-ink">The Bride</span>
                <h3 className="font-display text-3xl font-semibold text-espresso mt-2 mb-3">{couple.bride.name}</h3>
                <p className="text-sm text-espresso-soft font-medium mb-4">{couple.bride.parents}</p>
                <div className="w-12 h-[1px] bg-gold/50 mx-auto my-4"></div>
                <div className="text-xs text-espresso-soft leading-relaxed space-y-1">
                  {couple.bride.address.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. INVITATION STORY / MESSAGE */}
        <section className="py-24 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden border border-borderTone shadow-card aspect-[4/5]">
              <img
                src={photos.invitation}
                alt="Couple moment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink">
              {invitationNote.eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso leading-tight">
              {invitationNote.heading}
            </h2>
            <p className="font-display text-lg sm:text-xl text-espresso leading-relaxed italic">
              {invitationNote.lead}
            </p>
            <p className="text-sm text-espresso-soft leading-relaxed">
              {invitationNote.closing}
            </p>
            <svg className="w-44 h-5 text-gold py-2 mx-auto md:mx-0"><use href="#divider" /></svg>
            <p className="font-display text-2xl text-espresso">
              {coupleNames}
            </p>
          </div>
        </section>

        {/* 5. CEREMONY & RECEPTION CARDS */}
        <section id="wedding" className="py-20 bg-champagne-soft/30 border-y border-borderTone/50">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            {/* Morning Ceremony */}
            <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-borderTone shadow-card text-center relative overflow-hidden">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta">
                {events.ceremony.eyebrow || 'Morning'}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mt-2 mb-6">
                {events.ceremony.title}
              </h2>

              <div className="inline-flex items-center gap-6 border-y border-gold/40 py-4 px-8 my-4">
                <span className="font-display text-xl sm:text-2xl text-espresso-soft">{events.ceremony.dateStr.split(',')[0]}</span>
                <span className="font-display text-4xl sm:text-5xl font-bold text-espresso">
                  {events.ceremony.dateStr.match(/\d+/)?.[0] || '13'}
                </span>
                <span className="font-display text-xl sm:text-2xl text-espresso-soft">
                  {events.ceremony.dateStr.split(' ').slice(-2).join(' ')}
                </span>
              </div>

              <div className="max-w-md mx-auto space-y-4 my-6 text-sm text-espresso">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-gold"><use href="#i-clock" /></svg>
                  <span>{events.ceremony.timeWindowStr}</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-gold"><use href="#i-pin" /></svg>
                  <span>
                    <strong>{events.ceremony.venueName}</strong>, {events.ceremony.venueLocation}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href={events.ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-espresso text-cream font-medium text-xs tracking-wider uppercase hover:bg-gold-ink transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4"><use href="#i-pin" /></svg>
                  View on Map
                </a>
                <a
                  href={buildGoogleCalendarUrl(events.ceremony, coupleNames)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full border border-espresso/40 text-espresso font-medium text-xs tracking-wider uppercase hover:bg-espresso/10 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4"><use href="#i-calendar" /></svg>
                  Add to Google Calendar
                </a>
              </div>
            </div>

            {/* Evening Reception (if provided) */}
            {events.reception && (
              <div id="reception" className="bg-cream rounded-3xl p-8 sm:p-12 border border-borderTone shadow-card text-center relative overflow-hidden">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-ink">
                  {events.reception.eyebrow || 'Evening'}
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mt-2 mb-6">
                  {events.reception.title}
                </h2>

                <div className="max-w-md mx-auto space-y-4 my-6 text-sm text-espresso">
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-gold"><use href="#i-calendar" /></svg>
                    <span>{events.reception.dateStr}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-gold"><use href="#i-clock" /></svg>
                    <span>{events.reception.timeWindowStr}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-gold"><use href="#i-pin" /></svg>
                    <span>
                      <strong>{events.reception.venueName}</strong>, {events.reception.venueLocation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <a
                    href={events.reception.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-espresso text-cream font-medium text-xs tracking-wider uppercase hover:bg-gold-ink transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4"><use href="#i-pin" /></svg>
                    View on Map
                  </a>
                  <a
                    href={buildGoogleCalendarUrl(events.reception, coupleNames)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full border border-espresso/40 text-espresso font-medium text-xs tracking-wider uppercase hover:bg-espresso/10 transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4"><use href="#i-calendar" /></svg>
                    Add to Google Calendar
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. COUNTDOWN TIMER */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink mb-2">
              Counting the days
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mb-8">
              {data.countdown.label}
            </h2>

            {countdownStatus ? (
              <p className="p-4 bg-champagne-soft/70 rounded-xl font-display text-xl text-espresso-soft">
                {countdownStatus}
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
                <div className="bg-cream border border-borderTone p-4 rounded-2xl shadow-sm">
                  <span className="block font-display text-3xl sm:text-5xl font-bold text-espresso">{timeLeft.d}</span>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-soft">Days</span>
                </div>
                <div className="bg-cream border border-borderTone p-4 rounded-2xl shadow-sm">
                  <span className="block font-display text-3xl sm:text-5xl font-bold text-espresso">{timeLeft.h}</span>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-soft">Hours</span>
                </div>
                <div className="bg-cream border border-borderTone p-4 rounded-2xl shadow-sm">
                  <span className="block font-display text-3xl sm:text-5xl font-bold text-espresso">{timeLeft.m}</span>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-soft">Mins</span>
                </div>
                <div className="bg-cream border border-borderTone p-4 rounded-2xl shadow-sm">
                  <span className="block font-display text-3xl sm:text-5xl font-bold text-espresso">{timeLeft.s}</span>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-soft">Secs</span>
                </div>
              </div>
            )}

            <div className="mt-8">
              <a
                href={`/api/ics/${data.slug}`}
                download={`${data.slug}-wedding.ics`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold text-gold-ink hover:bg-gold/10 transition-colors text-xs tracking-wider uppercase font-semibold"
              >
                <svg className="w-4 h-4"><use href="#i-calendar" /></svg>
                Save the Date (Apple / Outlook / Calendar file)
              </a>
            </div>
          </div>
        </section>

        {/* 7. PHOTO GALLERY */}
        <section id="gallery" className="py-20 bg-champagne-soft/30 border-y border-borderTone/50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-olive-ink mb-2">
              Moments
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso mb-4">
              Gallery
            </h2>
            <svg className="w-44 h-5 text-gold mx-auto mb-12"><use href="#divider" /></svg>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.gallery.slice(0, 5).map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border border-borderTone/60 shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                    idx === 0 ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. VISUAL PAUSE FULL BANNER */}
        <section className="relative h-[50vh] sm:h-[65vh] w-full overflow-hidden">
          <img
            src={photos.banner}
            alt="Scenic wedding banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-espresso/30 flex items-center justify-center">
            <p className="font-display text-3xl sm:text-5xl tracking-widest text-cream bg-espresso/60 px-8 py-3 rounded-full backdrop-blur-md border border-white/20">
              {overview.weddingDateFormatted}
            </p>
          </div>
        </section>

        {/* 9. CLOSING SECTION & SHARE */}
        <section className="py-24 max-w-3xl mx-auto px-6 text-center space-y-6">
          <svg className="w-44 h-16 text-sage mx-auto"><use href="#sprig" /></svg>
          <h2 className="font-display text-4xl sm:text-5xl font-normal text-espresso">
            Sharing Happiness
          </h2>
          <p className="font-display text-xl text-espresso-soft italic max-w-xl mx-auto">
            We look forward to celebrating this special day with you. Your presence and blessings will make our happiness complete.
          </p>
          <svg className="w-44 h-5 text-gold mx-auto"><use href="#divider" /></svg>
          <p className="font-display text-2xl text-espresso font-semibold">
            {coupleNames}
          </p>
          <p className="text-xs uppercase tracking-widest text-olive-ink">
            {overview.weddingDateFormatted}
          </p>

          <div className="pt-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold text-espresso font-semibold text-sm hover:bg-gold-ink hover:text-white transition-colors shadow-sm"
            >
              <svg className="w-4 h-4"><use href="#i-share" /></svg>
              Share this invitation
            </button>
            {shareFeedback && (
              <p className="text-xs text-terracotta mt-3 animate-fade-in font-medium">
                {shareFeedback}
              </p>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-borderTone py-8 text-center text-xs text-espresso-soft space-y-2 bg-cream">
        <p className="font-display text-base font-semibold text-espresso">{coupleNames}</p>
        <p>{overview.weddingDateFormatted} · {overview.placesFormatted}</p>
      </footer>

      {/* 10. BACKGROUND MUSIC DOCK */}
      {audio?.enabled && (
        <>
          <audio ref={audioRef} src={audio.src} loop preload="auto" />
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
            {audioHint && (
              <span className="hidden sm:inline-block px-3 py-1.5 bg-espresso text-cream text-[11px] rounded-full shadow-lg border border-gold/30">
                {audioHint}
              </span>
            )}
            <button
              onClick={toggleAudio}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-gold/40 transition-all ${
                isPlaying ? 'bg-gold text-espresso ring-4 ring-gold/20' : 'bg-cream text-espresso hover:bg-champagne'
              }`}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              <svg className="w-5 h-5"><use href={isPlaying ? '#i-pause' : '#i-play'} /></svg>
            </button>
          </div>
        </>
      )}

      {/* 11. LIGHTBOX MODAL */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-[150] bg-espresso/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActivePhotoIndex(null)}
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 text-cream/80 hover:text-cream text-2xl font-bold p-2"
            aria-label="Close photo"
          >
            <svg className="w-6 h-6"><use href="#i-close" /></svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((activePhotoIndex - 1 + photos.gallery.length) % photos.gallery.length);
            }}
            className="absolute left-4 sm:left-8 text-cream/80 hover:text-cream p-3"
            aria-label="Previous photo"
          >
            <svg className="w-8 h-8"><use href="#i-prev" /></svg>
          </button>

          <img
            src={photos.gallery[activePhotoIndex].url}
            alt={photos.gallery[activePhotoIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((activePhotoIndex + 1) % photos.gallery.length);
            }}
            className="absolute right-4 sm:right-8 text-cream/80 hover:text-cream p-3"
            aria-label="Next photo"
          >
            <svg className="w-8 h-8"><use href="#i-next" /></svg>
          </button>

          <p className="absolute bottom-6 text-xs text-cream/60">
            {activePhotoIndex + 1} / {photos.gallery.length}
          </p>
        </div>
      )}
    </div>
  );
};
