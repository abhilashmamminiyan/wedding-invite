import { WeddingData } from '@/types/wedding';
import { getDriveImageUrl } from './drive';

/**
 * DEFAULT PRESETS
 * Fallback / Demonstration presets matching reverse-engineered live invitations.
 */
export const PRESET_VISHNU_NAVYA: WeddingData = {
  slug: 'vishnu-navya',
  template: 'kerala-classical',
  themePreset: 'ivory-gold',
  monogram: 'V & N',
  hashtag: '#VishnuWedsNavya',
  couple: {
    groom: {
      name: 'Vishnu',
      parents: 'S/o Mr Haridas K & Mrs Bindhu Haridas',
      address: ['Kayyanthala House', 'Peravoor PO', 'Peravoor Theru'],
    },
    bride: {
      name: 'Navya',
      parents: 'D/o Mr Suresh M And Prameela Suresh',
      address: ['Navya Nivas', 'Kannadiparamba PO', 'Kannadiparamba', 'Kannur'],
    },
  },
  overview: {
    eyebrow: 'With the blessings of our families',
    weddingDateFormatted: 'Sunday, 13 December 2026',
    placesFormatted: 'Kannadiparamba · Peravoor',
  },
  invitationNote: {
    eyebrow: 'You are invited',
    heading: 'Together With Our Families',
    lead: 'With love and happiness, we invite you to join us as Vishnu and Navya begin their beautiful journey together.',
    closing: 'With the blessings of our families, we invite you to join us as we celebrate a beautiful new beginning.',
  },
  events: {
    ceremony: {
      title: 'The Wedding Ceremony',
      eyebrow: 'Morning',
      dateStr: 'Sunday, 13 December 2026',
      timeWindowStr: '11:30 AM – 12:15 PM (Muhurtham)',
      venueName: 'Alokan Auditorium',
      venueLocation: 'Kannadiparamba, Kannur',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Alokan%20Auditorium%2C%20Kannadiparamba%2C%20Kannur',
      startIsoUtc: '2026-12-13T06:00:00Z',
      endIsoUtc: '2026-12-13T06:45:00Z',
    },
    reception: {
      title: 'Wedding Reception',
      eyebrow: 'Evening',
      dateStr: 'Sunday, 13 December 2026',
      timeWindowStr: '6:00 PM – 10:00 PM',
      venueName: 'Udaya Auditorium',
      venueLocation: 'Thundiyil, Peravoor',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Udaya%20Auditorium%2C%20Thundiyil%2C%20Peravoor',
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
    hero: 'https://vishnuwedsnavya.com/assets/images/wedding-02-1200.jpg',
    invitation: 'https://vishnuwedsnavya.com/assets/images/wedding-03-1200.jpg',
    reception: 'https://vishnuwedsnavya.com/assets/images/wedding-05-1200.jpg',
    banner: 'https://vishnuwedsnavya.com/assets/images/wedding-01-1200.jpg',
    gallery: [
      { url: 'https://vishnuwedsnavya.com/assets/images/wedding-04-1200.jpg', alt: 'Vishnu and Navya holding rings' },
      { url: 'https://vishnuwedsnavya.com/assets/images/wedding-03-1200.jpg', alt: 'Foreheads touching with rings' },
      { url: 'https://vishnuwedsnavya.com/assets/images/wedding-01-1200.jpg', alt: 'Playful couple pose' },
      { url: 'https://vishnuwedsnavya.com/assets/images/wedding-05-1200.jpg', alt: 'Standing against warm wall' },
      { url: 'https://vishnuwedsnavya.com/assets/images/wedding-02-1200.jpg', alt: 'Couple seated on stage sofa' },
    ],
  },
  audio: {
    enabled: true,
    title: 'Walk of the Bride',
    src: 'https://vishnuwedsnavya.com/assets/audio/walk-of-the-bride-agam-v2.mp3',
  },
  meta: {
    ogTitle: 'Vishnu & Navya | Wedding Invitation',
    ogDescription: 'Sunday, 13 December 2026 · Alokan Auditorium, Kannadiparamba. Sharing Happiness.',
    ogImage: 'https://vishnuwedsnavya.com/assets/images/og-image.jpg',
  },
};

export const PRESET_ATHIRA_JITHIN: WeddingData = {
  slug: 'athira-jithin',
  template: 'modern-romance',
  themePreset: 'rose-champagne',
  monogram: 'A & J',
  hashtag: '#AthiraWedsJithin',
  couple: {
    groom: {
      name: 'Jithin',
      parents: 'S/o Mr K. Balakrishnan & Mrs Radha Balakrishnan',
      address: ['Sreevalsam House', 'Kozhikode PO', 'Calicut'],
    },
    bride: {
      name: 'Athira',
      parents: 'D/o Mr P. Ramachandran & Mrs Sobhana Ramachandran',
      address: ['Anugraha', 'Meenangadi PO', 'Wayanad'],
    },
  },
  overview: {
    eyebrow: 'Together with our families',
    weddingDateFormatted: 'Friday, 18 December 2026',
    placesFormatted: 'Wayanad · Calicut',
  },
  invitationNote: {
    eyebrow: 'Cordially Invited',
    heading: 'A Celebration of Love',
    lead: 'We invite you to share in our joy and celebrate the beginning of our new chapter together.',
    closing: 'Your presence and prayers will make our celebration complete.',
  },
  events: {
    ceremony: {
      title: 'The Wedding Ceremony',
      eyebrow: 'Auspicious Muhurtham',
      dateStr: 'Friday, 18 December 2026',
      timeWindowStr: '10:00 AM – 11:15 AM',
      venueName: 'Green Meadows Convention Centre',
      venueLocation: 'Meenangadi, Wayanad',
      googleMapsUrl: 'https://maps.google.com/?q=Meenangadi+Wayanad',
      startIsoUtc: '2026-12-18T04:30:00Z',
      endIsoUtc: '2026-12-18T05:45:00Z',
    },
    reception: {
      title: 'Evening Celebration',
      eyebrow: 'Dinner & Music',
      dateStr: 'Saturday, 19 December 2026',
      timeWindowStr: '6:30 PM – 9:30 PM',
      venueName: 'The Grand Calicut Hall',
      venueLocation: 'Mavoor Road, Kozhikode',
      googleMapsUrl: 'https://maps.google.com/?q=Kozhikode+Kerala',
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
    hero: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    invitation: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    reception: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', alt: 'Wedding portrait' },
      { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', alt: 'Ceremony rings' },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Reception moment' },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', alt: 'Celebration' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', alt: 'Bouquet & decor' },
    ],
  },
  audio: {
    enabled: true,
    title: 'Acoustic Celebration',
    src: 'https://vishnuwedsnavya.com/assets/audio/walk-of-the-bride-agam-v2.mp3',
  },
  meta: {
    ogTitle: 'Athira & Jithin | Wedding Invitation',
    ogDescription: 'Friday, 18 December 2026 · Wayanad & Calicut. Join our celebration.',
  },
};

/**
 * SECURE SERVER-SIDE FETCHER
 * Never passes private credentials, sheet IDs, or respondent personal metadata to the client.
 */
export async function getWeddingDataBySlug(slug: string): Promise<WeddingData | null> {
  const normalized = (slug || '').toLowerCase().trim();

  // 1. Direct Presets Match
  if (normalized === 'vishnu-navya' || normalized === 'vishnu-weds-navya') {
    return PRESET_VISHNU_NAVYA;
  }
  if (normalized === 'athira-jithin' || normalized === 'athira-weds-jithin' || normalized === 'jithin-athira') {
    return PRESET_ATHIRA_JITHIN;
  }

  // 2. Fetch from private Server Environment (Google Sheet or CSV)
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetCsvUrl = process.env.GOOGLE_SHEET_CSV_URL;

  if (sheetCsvUrl || sheetId) {
    try {
      const url = sheetCsvUrl || `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      const response = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds (ISR)
      
      if (response.ok) {
        const csvText = await response.text();
        const parsed = parseGoogleFormCsv(csvText, normalized);
        if (parsed) return parsed;
      }
    } catch {
      // In case of error, silently fallback without leaking server error details to client
    }
  }

  // Fallback to default sample if slug is "demo" or unknown
  if (normalized === 'demo' || normalized === '') {
    return PRESET_VISHNU_NAVYA;
  }

  return null;
}

/**
 * Parse Google Form CSV responses securely on the server
 */
function parseGoogleFormCsv(csv: string, targetSlug: string): WeddingData | null {
  const rows = csv.split('\n').map((row) => parseCsvRow(row));
  if (rows.length < 2) return null;

  // Header row gives column index
  // Typical Google Form fields:
  // [Timestamp, Groom Name, Bride Name, Slug, Template, Date, Muhurtham Time, Venue Name, Venue Address, Map Link, Photo Drive Link, ...]
  const headers = rows[0].map((h) => h.toLowerCase().trim());

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 3) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowObj[header] = row[index] || '';
    });

    const groomName = rowObj['groom name'] || rowObj['groom'] || 'Groom';
    const brideName = rowObj['bride name'] || rowObj['bride'] || 'Bride';
    const rowSlug = (rowObj['custom link slug'] || rowObj['slug'] || `${groomName}-${brideName}`)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');

    if (rowSlug === targetSlug) {
      const templateVal = (rowObj['template'] || '').toLowerCase().includes('modern')
        ? 'modern-romance'
        : 'kerala-classical';

      const heroDrive = getDriveImageUrl(rowObj['hero photo'] || rowObj['photo 1'] || rowObj['drive link'] || '');
      const inviteDrive = getDriveImageUrl(rowObj['invitation photo'] || rowObj['photo 2'] || '');
      const bannerDrive = getDriveImageUrl(rowObj['banner photo'] || rowObj['photo 3'] || '');
      const galleryLinks = (rowObj['gallery photos'] || '')
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean)
        .map((u, idx) => ({ url: getDriveImageUrl(u), alt: `Moment ${idx + 1}` }));

      return {
        slug: targetSlug,
        template: templateVal,
        monogram: `${groomName.charAt(0).toUpperCase()} & ${brideName.charAt(0).toUpperCase()}`,
        hashtag: rowObj['wedding hashtag'] || `#${groomName}Weds${brideName}`,
        couple: {
          groom: {
            name: groomName,
            parents: rowObj["groom's parents"] || 'Parents',
            address: (rowObj["groom's address"] || '').split('\n').map((s) => s.trim()).filter(Boolean),
          },
          bride: {
            name: brideName,
            parents: rowObj["bride's parents"] || 'Parents',
            address: (rowObj["bride's address"] || '').split('\n').map((s) => s.trim()).filter(Boolean),
          },
        },
        overview: {
          eyebrow: rowObj['top message'] || 'With the blessings of our families',
          weddingDateFormatted: rowObj['wedding date formatted'] || 'Wedding Day',
          placesFormatted: rowObj['places / locations'] || '',
        },
        invitationNote: {
          eyebrow: 'You are invited',
          heading: rowObj['invitation heading'] || 'Together With Our Families',
          lead: rowObj['invitation lead text'] || `We invite you to celebrate with us.`,
          closing: rowObj['invitation closing'] || 'Your presence and blessings will make our happiness complete.',
        },
        events: {
          ceremony: {
            title: rowObj['ceremony title'] || 'The Wedding Ceremony',
            eyebrow: 'Ceremony',
            dateStr: rowObj['ceremony date'] || rowObj['wedding date formatted'] || '',
            timeWindowStr: rowObj['muhurtham timing'] || '11:00 AM',
            venueName: rowObj['ceremony venue name'] || 'Auditorium',
            venueLocation: rowObj['ceremony venue address'] || '',
            googleMapsUrl: rowObj['google maps link'] || '',
            startIsoUtc: rowObj['ceremony start iso'] || new Date().toISOString(),
            endIsoUtc: rowObj['ceremony end iso'] || new Date().toISOString(),
          },
        },
        countdown: {
          targetIsoUtc: rowObj['ceremony start iso'] || new Date().toISOString(),
          venueTimezone: 'Asia/Kolkata',
          label: 'Until the Muhurtham',
        },
        photos: {
          hero: heroDrive || PRESET_VISHNU_NAVYA.photos.hero,
          invitation: inviteDrive || PRESET_VISHNU_NAVYA.photos.invitation,
          banner: bannerDrive || PRESET_VISHNU_NAVYA.photos.banner,
          gallery: galleryLinks.length > 0 ? galleryLinks : PRESET_VISHNU_NAVYA.photos.gallery,
        },
        meta: {
          ogTitle: `${groomName} & ${brideName} | Wedding Invitation`,
          ogDescription: `Wedding of ${groomName} & ${brideName}. Join our celebration.`,
        },
      };
    }
  }

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
