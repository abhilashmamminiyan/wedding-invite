import { WeddingEventDetails } from '@/types/wedding';

function formatUtcForCalendar(isoUtcString: string): string {
  try {
    const d = new Date(isoUtcString);
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  } catch {
    return '';
  }
}

/**
 * Builds direct Google Calendar "Add to Calendar" URL
 */
export function buildGoogleCalendarUrl(event: WeddingEventDetails, coupleNames: string): string {
  const start = formatUtcForCalendar(event.startIsoUtc);
  const end = formatUtcForCalendar(event.endIsoUtc);
  const title = encodeURIComponent(`${event.title} - ${coupleNames}`);
  const location = encodeURIComponent(`${event.venueName}, ${event.venueLocation}`);
  const details = encodeURIComponent(`Timing: ${event.timeWindowStr}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}%2F${end}&ctz=Asia/Kolkata&location=${location}&details=${details}`;
}

/**
 * Builds RFC 5545 compliant .ics file content
 */
export function buildIcsFile(
  ceremony: WeddingEventDetails,
  reception: WeddingEventDetails | undefined,
  coupleNames: string,
  slug: string
): string {
  const nowStamp = formatUtcForCalendar(new Date().toISOString());

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${coupleNames}//Wedding Invitation//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    // Ceremony Event
    'BEGIN:VEVENT',
    `UID:${slug}-ceremony-${formatUtcForCalendar(ceremony.startIsoUtc)}@wedding`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART:${formatUtcForCalendar(ceremony.startIsoUtc)}`,
    `DTEND:${formatUtcForCalendar(ceremony.endIsoUtc)}`,
    `SUMMARY:${ceremony.title} - ${coupleNames}`,
    `DESCRIPTION:${ceremony.title} (${ceremony.timeWindowStr})`,
    `LOCATION:${ceremony.venueName}, ${ceremony.venueLocation}`,
    'END:VEVENT',
  ];

  if (reception) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${slug}-reception-${formatUtcForCalendar(reception.startIsoUtc)}@wedding`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${formatUtcForCalendar(reception.startIsoUtc)}`,
      `DTEND:${formatUtcForCalendar(reception.endIsoUtc)}`,
      `SUMMARY:${reception.title} - ${coupleNames}`,
      `DESCRIPTION:${reception.title} (${reception.timeWindowStr})`,
      `LOCATION:${reception.venueName}, ${reception.venueLocation}`,
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}
