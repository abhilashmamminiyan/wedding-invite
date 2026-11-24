import { NextRequest, NextResponse } from 'next/server';
import { getWeddingDataBySlug } from '@/lib/server-wedding-store';
import { buildIcsFile } from '@/lib/calendar';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await getWeddingDataBySlug(params.slug);
  if (!data) {
    return new NextResponse('Invitation not found', { status: 404 });
  }

  const coupleNames = `${data.couple.groom.name} & ${data.couple.bride.name}`;
  const icsContent = buildIcsFile(data.events.ceremony, data.events.reception, coupleNames, data.slug);

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${data.slug}-wedding.ics"`,
    },
  });
}
