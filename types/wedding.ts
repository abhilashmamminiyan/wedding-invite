export type WeddingTemplateId = 'kerala-classical' | 'modern-romance';

export interface FamilyMemberInfo {
  name: string;
  parents: string;
  address: string[];
}

export interface WeddingEventDetails {
  title: string;
  eyebrow?: string;
  dateStr: string;
  timeWindowStr: string;
  venueName: string;
  venueLocation: string;
  googleMapsUrl: string;
  startIsoUtc: string; // ISO 8601 UTC string for calendar & countdown
  endIsoUtc: string;
}

export interface GalleryPhoto {
  url: string;
  alt: string;
  caption?: string;
}

export interface WeddingData {
  slug: string;
  template: WeddingTemplateId;
  themePreset?: 'ivory-gold' | 'royal-emerald' | 'rose-champagne' | 'terracotta-sunset';
  monogram: string;
  hashtag?: string;
  couple: {
    groom: FamilyMemberInfo;
    bride: FamilyMemberInfo;
  };
  overview: {
    eyebrow: string;
    weddingDateFormatted: string;
    placesFormatted: string;
  };
  invitationNote: {
    eyebrow: string;
    heading: string;
    lead: string;
    closing: string;
  };
  events: {
    ceremony: WeddingEventDetails;
    reception?: WeddingEventDetails;
  };
  countdown: {
    targetIsoUtc: string;
    venueTimezone: string; // e.g. "Asia/Kolkata"
    label: string;
  };
  photos: {
    hero: string;
    invitation: string;
    reception?: string;
    banner: string;
    gallery: GalleryPhoto[];
  };
  audio?: {
    enabled: boolean;
    title: string;
    src: string;
  };
  meta: {
    ogTitle: string;
    ogDescription: string;
    ogImage?: string;
  };
}
