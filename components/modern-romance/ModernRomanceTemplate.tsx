'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WeddingData } from '@/types/wedding';
import { buildGoogleCalendarUrl } from '@/lib/calendar';
import { Heart, Calendar, Clock, MapPin, Share2, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface Props {
  data: WeddingData;
  isPreview?: boolean;
}

export const ModernRomanceTemplate: React.FC<Props> = ({ data, isPreview = false }) => {
  const { couple, overview, invitationNote, events, photos, audio } = data;
  const coupleNames = `${couple.groom.name} & ${couple.bride.name}`;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(events.ceremony.startIsoUtc).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const totalSec = Math.floor(diff / 1000);
      setTimeLeft({
        d: Math.floor(totalSec / 86400),
        h: Math.floor((totalSec % 86400) / 3600),
        m: Math.floor((totalSec % 3600) / 60),
        s: totalSec % 60,
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [events.ceremony]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleShare = () => {
    if (isPreview) {
      setShareFeedback('⚠️ Guest sharing is disabled in Preview Mode. Unlock to enable.');
      setTimeout(() => setShareFeedback(''), 4000);
      return;
    }
    const shareData = {
      title: `${coupleNames} Wedding Invitation`,
      text: `${coupleNames} invite you to their wedding on ${overview.weddingDateFormatted}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => copyLink());
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback('Link copied to clipboard!');
    setTimeout(() => setShareFeedback(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] font-body selection:bg-[#DDA7A5] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4ED] via-[#FDFBF7] to-[#FDFBF7] opacity-80 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E7E4] text-[#A66360] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {overview.eyebrow}
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-light text-[#2D2A26] tracking-tight">
            <span>{couple.groom.name}</span>
            <span className="text-[#A66360] italic font-serif mx-3">&amp;</span>
            <span>{couple.bride.name}</span>
          </h1>

          <p className="font-display text-xl sm:text-2xl text-[#6E675F] tracking-wide">
            {overview.weddingDateFormatted} · {overview.placesFormatted}
          </p>

          <div className="w-full max-w-md mx-auto pt-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-[#F3E7E4]">
              <img
                src={photos.hero}
                alt={coupleNames}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAMILIES SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A66360] font-bold">With the blessings of</span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-[#2D2A26] mt-2">Our Families</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#EBE4DC] shadow-sm text-center">
            <span className="text-xs font-bold tracking-widest text-[#A66360] uppercase">Groom</span>
            <h3 className="font-display text-3xl font-medium mt-2 mb-2">{couple.groom.name}</h3>
            <p className="text-sm text-[#6E675F] font-medium">{couple.groom.parents}</p>
            <div className="w-12 h-0.5 bg-[#F3E7E4] mx-auto my-4" />
            <div className="text-xs text-[#8A8279] space-y-1">
              {couple.groom.address.map((a, i) => <p key={i}>{a}</p>)}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EBE4DC] shadow-sm text-center">
            <span className="text-xs font-bold tracking-widest text-[#A66360] uppercase">Bride</span>
            <h3 className="font-display text-3xl font-medium mt-2 mb-2">{couple.bride.name}</h3>
            <p className="text-sm text-[#6E675F] font-medium">{couple.bride.parents}</p>
            <div className="w-12 h-0.5 bg-[#F3E7E4] mx-auto my-4" />
            <div className="text-xs text-[#8A8279] space-y-1">
              {couple.bride.address.map((a, i) => <p key={i}>{a}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS (CEREMONY & RECEPTION) */}
      <section className="py-20 bg-[#FAF4ED] px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl sm:text-5xl font-light">Events &amp; Celebrations</h2>
          </div>

          {/* Ceremony */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EBE4DC] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#F3E7E4] text-[#A66360] text-xs font-bold uppercase tracking-wider">
                {events.ceremony.title}
              </span>
              <h3 className="font-display text-3xl font-medium text-[#2D2A26]">{events.ceremony.dateStr}</h3>
              <p className="text-sm text-[#6E675F] flex items-center justify-center md:justify-start gap-2">
                <Clock className="w-4 h-4 text-[#A66360]" />
                {events.ceremony.timeWindowStr}
              </p>
              <p className="text-sm text-[#6E675F] flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-[#A66360]" />
                <strong>{events.ceremony.venueName}</strong>, {events.ceremony.venueLocation}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={events.ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#2D2A26] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#A66360] transition-colors text-center"
              >
                View Map
              </a>
              <a
                href={buildGoogleCalendarUrl(events.ceremony, coupleNames)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-[#2D2A26]/30 text-[#2D2A26] text-xs font-semibold uppercase tracking-wider hover:bg-[#2D2A26]/5 transition-colors text-center"
              >
                Calendar
              </a>
            </div>
          </div>

          {/* Reception */}
          {events.reception && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EBE4DC] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#F3E7E4] text-[#A66360] text-xs font-bold uppercase tracking-wider">
                  {events.reception.title}
                </span>
                <h3 className="font-display text-3xl font-medium text-[#2D2A26]">{events.reception.dateStr}</h3>
                <p className="text-sm text-[#6E675F] flex items-center justify-center md:justify-start gap-2">
                  <Clock className="w-4 h-4 text-[#A66360]" />
                  {events.reception.timeWindowStr}
                </p>
                <p className="text-sm text-[#6E675F] flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4 text-[#A66360]" />
                  <strong>{events.reception.venueName}</strong>, {events.reception.venueLocation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href={events.reception.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#2D2A26] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#A66360] transition-colors text-center"
                >
                  View Map
                </a>
                <a
                  href={buildGoogleCalendarUrl(events.reception, coupleNames)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-[#2D2A26]/30 text-[#2D2A26] text-xs font-semibold uppercase tracking-wider hover:bg-[#2D2A26]/5 transition-colors text-center"
                >
                  Calendar
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 text-center px-6">
        <h2 className="font-display text-4xl sm:text-5xl font-light mb-8">Counting Down</h2>
        <div className="flex justify-center gap-4 sm:gap-6 max-w-md mx-auto">
          <div className="bg-white border border-[#EBE4DC] p-4 rounded-2xl flex-1 shadow-sm">
            <span className="font-display text-3xl sm:text-4xl font-bold">{timeLeft.d}</span>
            <span className="block text-[11px] uppercase tracking-wider text-[#8A8279]">Days</span>
          </div>
          <div className="bg-white border border-[#EBE4DC] p-4 rounded-2xl flex-1 shadow-sm">
            <span className="font-display text-3xl sm:text-4xl font-bold">{timeLeft.h}</span>
            <span className="block text-[11px] uppercase tracking-wider text-[#8A8279]">Hours</span>
          </div>
          <div className="bg-white border border-[#EBE4DC] p-4 rounded-2xl flex-1 shadow-sm">
            <span className="font-display text-3xl sm:text-4xl font-bold">{timeLeft.m}</span>
            <span className="block text-[11px] uppercase tracking-wider text-[#8A8279]">Mins</span>
          </div>
          <div className="bg-white border border-[#EBE4DC] p-4 rounded-2xl flex-1 shadow-sm">
            <span className="font-display text-3xl sm:text-4xl font-bold">{timeLeft.s}</span>
            <span className="block text-[11px] uppercase tracking-wider text-[#8A8279]">Secs</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-light">Photo Memories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.gallery.slice(0, 5).map((p, i) => (
            <div
              key={i}
              onClick={() => setActivePhotoIndex(i)}
              className={`cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] transition-transform ${
                i === 0 ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square'
              }`}
            >
              <img src={p.url} alt={p.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING SHARE */}
      <section className="py-24 text-center px-6 bg-[#FAF4ED]">
        <Heart className="w-8 h-8 text-[#A66360] mx-auto mb-4" />
        <h2 className="font-display text-4xl sm:text-5xl font-light mb-4">We Look Forward to Seeing You</h2>
        <p className="font-display text-xl text-[#6E675F] max-w-md mx-auto mb-8">
          Your presence will make our celebration truly unforgettable.
        </p>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#A66360] text-white font-semibold text-sm hover:bg-[#8A4F4C] transition-colors shadow-md"
        >
          <Share2 className="w-4 h-4" />
          Share Invitation
        </button>
        {shareFeedback && <p className="text-xs text-[#A66360] mt-3">{shareFeedback}</p>}
      </section>

      {/* AUDIO */}
      {audio?.enabled && (
        <>
          <audio ref={audioRef} src={audio.src} loop />
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white text-[#2D2A26] border border-[#EBE4DC] shadow-xl flex items-center justify-center hover:bg-[#FAF4ED] transition-all"
          >
            {isPlaying ? <Volume2 className="w-5 h-5 text-[#A66360]" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </>
      )}

      {/* LIGHTBOX */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActivePhotoIndex(null)}
        >
          <img
            src={photos.gallery[activePhotoIndex].url}
            alt="Enlarged gallery photo"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};
