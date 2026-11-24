import React from 'react';

export const SvgSprites: React.FC = () => {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Floral sprig: cream blossoms on a sage stem, echoing the white rose arch */}
        <symbol id="sprig" viewBox="0 0 240 90">
          <path d="M8 70 C60 60 110 64 150 44 S214 18 232 12" fill="none" stroke="#8E9272" strokeWidth="1.4" strokeLinecap="round" />
          <g fill="#A5A88A">
            <path d="M44 63 c-6 -14 4 -24 16 -24 c-2 12 -6 20 -16 24z" />
            <path d="M70 61 c8 10 22 12 30 6 c-10 -8 -20 -10 -30 -6z" opacity=".85" />
            <path d="M112 54 c-4 -14 6 -24 18 -22 c-2 12 -8 19 -18 22z" />
            <path d="M140 47 c10 8 24 8 30 0 c-10 -6 -21 -7 -30 0z" opacity=".85" />
            <path d="M188 29 c-2 -12 8 -20 18 -17 c-3 10 -9 15 -18 17z" />
          </g>
          <g stroke="#C9B48A" strokeWidth=".8">
            <g transform="translate(24 66)">
              <circle r="7" fill="#FFFCF7" />
              <circle r="4.2" fill="#F3EADB" />
              <circle r="1.8" fill="#D9C9B2" />
            </g>
            <g transform="translate(96 58)">
              <circle r="9.5" fill="#FFFCF7" />
              <circle r="6" fill="#F3EADB" />
              <circle r="2.6" fill="#D9C9B2" />
            </g>
            <g transform="translate(164 38)">
              <circle r="7.5" fill="#FFFCF7" />
              <circle r="4.6" fill="#F3EADB" />
              <circle r="2.5" fill="#D9C9B2" />
            </g>
            <g transform="translate(222 15)">
              <circle r="5" fill="#FFFCF7" />
              <circle r="2.8" fill="#F3EADB" />
            </g>
          </g>
        </symbol>

        {/* Divider: two hairlines meeting at a lozenge */}
        <symbol id="divider" viewBox="0 0 220 20">
          <path d="M0 10 H92 M128 10 H220" stroke="currentColor" strokeWidth="1" />
          <path d="M110 2 L118 10 L110 18 L102 10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="110" cy="10" r="2" fill="currentColor" />
          <circle cx="96" cy="10" r="1.3" fill="currentColor" />
          <circle cx="124" cy="10" r="1.3" fill="currentColor" />
        </symbol>

        {/* Icons */}
        <symbol id="i-calendar" viewBox="0 0 24 24">
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-play" viewBox="0 0 24 24">
          <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
        </symbol>
        <symbol id="i-pause" viewBox="0 0 24 24">
          <path d="M7.5 5h3v14h-3zM13.5 5h3v14h-3z" fill="currentColor" />
        </symbol>
        <symbol id="i-share" viewBox="0 0 24 24">
          <circle cx="17.5" cy="5.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6.5" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.5" cy="18.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.7 10.8l6.6-4M8.7 13.2l6.6 4" stroke="currentColor" strokeWidth="1.5" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="i-prev" viewBox="0 0 24 24">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-next" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
      </defs>
    </svg>
  );
};
