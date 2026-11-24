import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getWeddingDataBySlug } from '@/lib/server-wedding-store';
import { KeralaClassicalTemplate } from '@/components/kerala-classical/KeralaClassicalTemplate';
import { ModernRomanceTemplate } from '@/components/modern-romance/ModernRomanceTemplate';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getWeddingDataBySlug(params.slug);
  if (!data) return { title: 'Invitation Not Found' };

  const coupleNames = `${data.couple.groom.name} & ${data.couple.bride.name}`;

  return {
    title: `${coupleNames} | Wedding Invitation`,
    description: data.meta.ogDescription,
    openGraph: {
      title: `${coupleNames} | Wedding Invitation`,
      description: data.meta.ogDescription,
      images: [
        {
          url: data.photos.hero,
          width: 1200,
          height: 630,
          alt: `${coupleNames} Wedding Invitation`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${coupleNames} | Wedding Invitation`,
      description: data.meta.ogDescription,
      images: [data.photos.hero],
    },
  };
}

export default async function LiveInvitePage({ params }: PageProps) {
  // Server-Side Fetch: zero sheet ID or client contact details leaked in network
  const data = await getWeddingDataBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {data.template === 'modern-romance' ? (
        <ModernRomanceTemplate data={data} isPreview={false} />
      ) : (
        <KeralaClassicalTemplate data={data} isPreview={false} />
      )}
    </>
  );
}
