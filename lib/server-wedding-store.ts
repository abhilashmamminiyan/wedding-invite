import { WeddingData } from '@/types/wedding';
import { getDriveImageUrl } from './drive';

/**
 * DEFAULT DEMONSTRATION PRESETS
 * Royalty-free sample data for platform previews and testing.
 */
export const PRESET_CLASSICAL: WeddingData = {
  slug: 'aarav-meera',
  template: 'kerala-classical',
  themePreset: 'ivory-gold',
  monogram: 'A & M',
  hashtag: '#AaravWedsMeera',
  couple: {
    groom: {
      name: 'Aarav',
      parents: 'S/o Mr K. Raghavan & Mrs Lakshmi Raghavan',
      address: ['Sreeragam House', 'Civil Station PO', 'Kozhikode, Kerala'],
    },
    bride: {
      name: 'Meera',
      parents: 'D/o Mr M. Narayanan & Mrs Saraswathi Narayanan',
      address: ['Meera Nivas', 'Meenangadi PO', 'Wayanad, Kerala'],
    },
  },
  overview: {
    eyebrow: 'With the blessings of our families',
    weddingDateFormatted: 'Sunday, 13 December 2026',
    placesFormatted: 'Kozhikode · Wayanad',
  },
  invitationNote: {
    eyebrow: 'You are invited',
    heading: 'Together With Our Families',
    lead: 'With love and happiness, we invite you to join us as Aarav and Meera begin their beautiful journey together.',
    closing: 'With the blessings of our families, we invite you to join us as we celebrate a beautiful new beginning.',
  },
  events: {
    ceremony: {
      title: 'The Wedding Ceremony',
      eyebrow: 'Morning',
      dateStr: 'Sunday, 13 December 2026',
      timeWindowStr: '11:30 AM – 12:15 PM (Muhurtham)',
      venueName: 'Alakapuri Auditorium',
      venueLocation: 'Civil Station, Kozhikode',
      googleMapsUrl: 'https://maps.google.com/?q=Kozhikode+Kerala',
      startIsoUtc: '2026-12-13T06:00:00Z',
      endIsoUtc: '2026-12-13T06:45:00Z',
    },
    reception: {
      title: 'Wedding Reception',
      eyebrow: 'Evening',
      dateStr: 'Sunday, 13 December 2026',
      timeWindowStr: '6:00 PM – 10:00 PM',
      venueName: 'Royal Palace Convention Centre',
      venueLocation: 'Mavoor Road, Kozhikode',
      googleMapsUrl: 'https://maps.google.com/?q=Kozhikode+Kerala',
      startIsoUtc: '2026-12-13T12:30:00Z',
      endIsoUtc: '2026-12-13T16:30:00Z',
    },
  },
  countdown: {
    targetIsoUtc: '2026-12-13T06:00:00Z',
    venueTimezone: 'Asia/Kolkata',
    label: 'Until the Muhurtham',
  },
  photos: {
    hero: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    invitation: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    reception: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', alt: 'Wedding couple portrait' },
      { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', alt: 'Wedding rings detail' },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Joyful celebration moment' },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', alt: 'Ceremony rituals' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', alt: 'Floral wedding arch' },
    ],
  },
  audio: {
    enabled: true,
    title: 'Traditional Wedding Instrumental',
    src: 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-violin-1180.mp3',
  },
  meta: {
    ogTitle: 'Aarav & Meera | Wedding Invitation',
    ogDescription: 'Sunday, 13 December 2026 · Kozhikode & Wayanad. Sharing Happiness.',
    ogImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  },
};

export const PRESET_MODERN: WeddingData = {
  slug: 'arjun-diya',
  template: 'modern-romance',
  themePreset: 'rose-champagne',
  monogram: 'A & D',
  hashtag: '#ArjunWedsDiya',
  couple: {
    groom: {
      name: 'Arjun',
      parents: 'S/o Mr Rajesh Sharma & Mrs Sunita Sharma',
      address: ['Ananda Nilayam', 'Panampilly Nagar', 'Kochi, Kerala'],
    },
    bride: {
      name: 'Diya',
      parents: 'D/o Mr Vivek Verma & Mrs Anita Verma',
      address: ['Green Meadows', 'Kumarakom PO', 'Kottayam, Kerala'],
    },
  },
  overview: {
    eyebrow: 'Together with our families',
    weddingDateFormatted: 'Friday, 18 December 2026',
    placesFormatted: 'Kochi · Kumarakom',
  },
  invitationNote: {
    eyebrow: 'Cordially Invited',
    heading: 'A Celebration of Love',
    lead: 'We invite you to share in our joy and celebrate the beginning of our new chapter together.',
    closing: 'Your presence and blessings will make our celebration complete.',
  },
  events: {
    ceremony: {
      title: 'The Wedding Ceremony',
      eyebrow: 'Auspicious Muhurtham',
      dateStr: 'Friday, 18 December 2026',
      timeWindowStr: '10:00 AM – 11:15 AM',
      venueName: 'The Grand Heritage Banquet',
      venueLocation: 'Marine Drive, Kochi',
      googleMapsUrl: 'https://maps.google.com/?q=Kochi+Kerala',
      startIsoUtc: '2026-12-18T04:30:00Z',
      endIsoUtc: '2026-12-18T05:45:00Z',
    },
    reception: {
      title: 'Evening Celebration',
      eyebrow: 'Dinner & Music',
      dateStr: 'Saturday, 19 December 2026',
      timeWindowStr: '6:30 PM – 9:30 PM',
      venueName: 'Waterfront Lake Resort',
      venueLocation: 'Kumarakom, Kottayam',
      googleMapsUrl: 'https://maps.google.com/?q=Kumarakom+Kerala',
      startIsoUtc: '2026-12-19T13:00:00Z',
      endIsoUtc: '2026-12-19T16:00:00Z',
    },
  },
  countdown: {
    targetIsoUtc: '2026-12-18T04:30:00Z',
    venueTimezone: 'Asia/Kolkata',
    label: 'Countdown to the Muhurtham',
  },
  photos: {
    hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    invitation: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    reception: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Wedding couple candid' },
      { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', alt: 'Ceremony rings' },
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', alt: 'Reception moment' },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', alt: 'Joyful celebration' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', alt: 'Floral venue decor' },
    ],
  },
  audio: {
    enabled: true,
    title: 'Acoustic Wedding Celebration',
    src: 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-violin-1180.mp3',
  },
  meta: {
    ogTitle: 'Arjun & Diya | Wedding Invitation',
    ogDescription: 'Friday, 18 December 2026 · Kochi & Kumarakom. Join our celebration.',
    ogImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
};

/**
 * SECURE SERVER-SIDE FETCHER
 * Reads from Google Sheets securely without exposing Sheet IDs or client details.
 */
export async function getWeddingDataBySlug(slug: string): Promise<WeddingData | null> {
  const normalized = (slug || '').toLowerCase().trim();

  // 1. Direct Presets Match (Generic sample demos)
  if (normalized === 'aarav-meera' || normalized === 'demo-classical' || normalized === 'classical') {
    return PRESET_CLASSICAL;
  }
  if (normalized === 'arjun-diya' || normalized === 'demo-modern' || normalized === 'modern') {
    return PRESET_MODERN;
  }

  // 2. Fetch from Google Sheet CSV
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetCsvUrl = process.env.GOOGLE_SHEET_CSV_URL;

  if (sheetCsvUrl || sheetId) {
    try {
      const url = sheetCsvUrl || `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      console.log(`[Store] Fetching Google Sheet responses from: ${url.replace(sheetId || '', '[REDACTED_SHEET_ID]')}`);
      
      const response = await fetch(url, { next: { revalidate: 15 } }); // Cache for 15s

      if (!response.ok) {
        console.error(
          `[Store Error] Google Sheet returned HTTP ${response.status}. ` +
          `Make sure the Google Sheet sharing setting is 'Anyone with the link can view' (Viewer)!`
        );
      } else {
        const csvText = await response.text();
        const parsed = parseGoogleFormCsv(csvText, normalized);
        if (parsed) {
          console.log(`[Store Success] Successfully resolved invitation for slug: ${normalized}`);
          return parsed;
        } else {
          console.warn(`[Store Warning] Slug '${normalized}' not found in Google Sheet rows.`);
        }
      }
    } catch (err: any) {
      console.error('[Store Error] Failed to fetch Google Sheet CSV:', err.message);
    }
  } else {
    console.warn('[Store Warning] Neither GOOGLE_SHEET_ID nor GOOGLE_SHEET_CSV_URL is set in Vercel Environment Variables.');
  }

  // Fallback demo for generic tests
  if (normalized === 'demo' || normalized === '') {
    return PRESET_CLASSICAL;
  }

  return null;
}

/**
 * Helper to find field value across multiple possible column name patterns
 */
function findVal(rowObj: Record<string, string>, patterns: string[]): string {
  for (const pattern of patterns) {
    const key = Object.keys(rowObj).find((k) => k.toLowerCase().includes(pattern.toLowerCase()));
    if (key && rowObj[key]) {
      return rowObj[key].trim();
    }
  }
  return '';
}

/**
 * Parse Google Form CSV responses securely on the server
 */
function parseGoogleFormCsv(csv: string, targetSlug: string): WeddingData | null {
  const rows = csv.split('\n').map((row) => parseCsvRow(row));
  if (rows.length < 2) return null;

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const foundSlugs: string[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 3) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowObj[header] = row[index] || '';
    });

    const groomName = findVal(rowObj, ['groom full name', 'groom name', 'groom']) || 'Groom';
    const brideName = findVal(rowObj, ['bride full name', 'bride name', 'bride']) || 'Bride';
    const customSlug = findVal(rowObj, ['custom link slug', 'slug', 'custom url']);

    const autoSlug1 = `${groomName}-${brideName}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const autoSlug2 = `${groomName}weds${brideName}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const cleanCustomSlug = customSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    foundSlugs.push(cleanCustomSlug || autoSlug1);

    // Flexible slug matching: matches custom slug, auto slug (e.g. abhilash-athulya), or direct concatenation
    const isMatch =
      (cleanCustomSlug && targetSlug === cleanCustomSlug) ||
      targetSlug === autoSlug1 ||
      targetSlug.replace(/-/g, '') === autoSlug2 ||
      targetSlug === autoSlug2;

    if (isMatch) {
      const templateChoice = findVal(rowObj, ['template', 'choose your wedding']);
      const templateVal = templateChoice.toLowerCase().includes('modern')
        ? 'modern-romance'
        : 'kerala-classical';

      const heroDrive = getDriveImageUrl(findVal(rowObj, ['hero photo', 'photo 1', 'drive link']));
      const inviteDrive = getDriveImageUrl(findVal(rowObj, ['invitation photo', 'photo 2']));
      const bannerDrive = getDriveImageUrl(findVal(rowObj, ['scenic banner', 'banner photo', 'photo 3']));
      const galleryVal = findVal(rowObj, ['gallery photos', 'gallery']);
      const galleryLinks = galleryVal
        ? galleryVal
            .split(',')
            .map((u) => u.trim())
            .filter(Boolean)
            .map((u, idx) => ({ url: getDriveImageUrl(u), alt: `Wedding Moment ${idx + 1}` }))
        : [];

      const ceremonyDate = findVal(rowObj, ['ceremony date', 'wedding date']) || 'Wedding Day';
      const muhurthamTiming = findVal(rowObj, ['muhurtham timing', 'timing window', 'muhurtham']) || '11:00 AM';
      const venueName = findVal(rowObj, ['ceremony venue name', 'venue name']) || 'Auditorium';
      const venueLocation = findVal(rowObj, ['ceremony venue location', 'venue location', 'city']) || '';
      const googleMapsUrl = findVal(rowObj, ['ceremony google maps', 'maps link', 'map']) || `https://maps.google.com/?q=${encodeURIComponent(venueName + ' ' + venueLocation)}`;

      const groomParents = findVal(rowObj, ["groom's parents", 'groom parents']) || 'Parents';
      const brideParents = findVal(rowObj, ["bride's parents", 'bride parents']) || 'Parents';
      const groomAddress = (findVal(rowObj, ["groom's family address", 'groom address']) || '').split('\n').map((s) => s.trim()).filter(Boolean);
      const brideAddress = (findVal(rowObj, ["bride's family address", 'bride address']) || '').split('\n').map((s) => s.trim()).filter(Boolean);

      const receptionDate = findVal(rowObj, ['reception date']);
      const receptionTiming = findVal(rowObj, ['reception timing']);
      const receptionVenue = findVal(rowObj, ['reception venue name']);
      const receptionLocation = findVal(rowObj, ['reception venue location']);
      const receptionMap = findVal(rowObj, ['reception google maps']);

      const hasReception = Boolean(receptionVenue || receptionDate);

      const musicUrl = findVal(rowObj, ['background music', 'mp3', 'music link']);

      // Target UTC calculation for countdown
      let targetIso = new Date().toISOString();
      try {
        // Handle DD/MM/YYYY or YYYY-MM-DD
        const dateParts = ceremonyDate.split('/');
        if (dateParts.length === 3) {
          const d = parseInt(dateParts[0], 10);
          const m = parseInt(dateParts[1], 10) - 1;
          const y = parseInt(dateParts[2], 10);
          targetIso = new Date(Date.UTC(y, m, d, 6, 0, 0)).toISOString(); // 11:30 AM IST = 06:00 UTC
        } else {
          targetIso = new Date(ceremonyDate).toISOString();
        }
      } catch {
        targetIso = new Date().toISOString();
      }

      return {
        slug: targetSlug,
        template: templateVal,
        monogram: `${groomName.charAt(0).toUpperCase()} & ${brideName.charAt(0).toUpperCase()}`,
        hashtag: `#${groomName.replace(/\s+/g, '')}Weds${brideName.replace(/\s+/g, '')}`,
        couple: {
          groom: {
            name: groomName,
            parents: groomParents,
            address: groomAddress.length > 0 ? groomAddress : ['Home Address'],
          },
          bride: {
            name: brideName,
            parents: brideParents,
            address: brideAddress.length > 0 ? brideAddress : ['Home Address'],
          },
        },
        overview: {
          eyebrow: findVal(rowObj, ['top message']) || 'With the blessings of our families',
          weddingDateFormatted: ceremonyDate,
          placesFormatted: venueLocation || 'Kerala',
        },
        invitationNote: {
          eyebrow: 'You are invited',
          heading: 'Together With Our Families',
          lead: findVal(rowObj, ['invitation lead message', 'lead text']) || `With love and happiness, we invite you to join us as ${groomName} and ${brideName} begin their beautiful journey together.`,
          closing: 'Your presence and blessings will make our happiness complete.',
        },
        events: {
          ceremony: {
            title: 'The Wedding Ceremony',
            eyebrow: 'Auspicious Muhurtham',
            dateStr: ceremonyDate,
            timeWindowStr: muhurthamTiming,
            venueName: venueName,
            venueLocation: venueLocation,
            googleMapsUrl: googleMapsUrl,
            startIsoUtc: targetIso,
            endIsoUtc: new Date(new Date(targetIso).getTime() + 45 * 60 * 1000).toISOString(),
          },
          reception: hasReception
            ? {
                title: 'Wedding Reception',
                eyebrow: 'Evening Celebration',
                dateStr: receptionDate || ceremonyDate,
                timeWindowStr: receptionTiming || '6:00 PM – 10:00 PM',
                venueName: receptionVenue || 'Reception Hall',
                venueLocation: receptionLocation || venueLocation,
                googleMapsUrl: receptionMap || googleMapsUrl,
                startIsoUtc: targetIso,
                endIsoUtc: new Date(new Date(targetIso).getTime() + 4 * 3600 * 1000).toISOString(),
              }
            : undefined,
        },
        countdown: {
          targetIsoUtc: targetIso,
          venueTimezone: 'Asia/Kolkata',
          label: 'Until the Muhurtham',
        },
        photos: {
          hero: heroDrive || PRESET_CLASSICAL.photos.hero,
          invitation: inviteDrive || PRESET_CLASSICAL.photos.invitation,
          banner: bannerDrive || PRESET_CLASSICAL.photos.banner,
          gallery: galleryLinks.length > 0 ? galleryLinks : PRESET_CLASSICAL.photos.gallery,
        },
        audio: {
          enabled: Boolean(musicUrl),
          title: 'Wedding Music',
          src: musicUrl || PRESET_CLASSICAL.audio?.src || '',
        },
        meta: {
          ogTitle: `${groomName} & ${brideName} | Wedding Invitation`,
          ogDescription: `Wedding invitation for ${groomName} & ${brideName}. Join our celebration on ${ceremonyDate}.`,
          ogImage: heroDrive || PRESET_CLASSICAL.photos.hero,
        },
      };
    }
  }

  console.log('[Store Warning] Checked slugs in Google Sheet:', foundSlugs, 'Target was:', targetSlug);
  return null;
}

function parseCsvRow(row: string): string[] {
  const result: string[] = [];
  let insideQuote = false;
  let entry = '';

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === ',' && !insideQuote) {
      result.push(entry.trim());
      entry = '';
    } else {
      entry += char;
    }
  }
  result.push(entry.trim());
  return result;
}
