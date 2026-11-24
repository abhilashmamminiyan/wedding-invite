import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getWeddingDataBySlug } from '@/lib/server-wedding-store';
import { KeralaClassicalTemplate } from '@/components/kerala-classical/KeralaClassicalTemplate';
import { ModernRomanceTemplate } from '@/components/modern-romance/ModernRomanceTemplate';
import { PreviewBanner } from '@/components/common/PreviewBanner';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getWeddingDataBySlug(params.slug);
  if (!data) return { title: 'Invitation Not Found' };

  return {
    title: `[Draft Preview] ${data.couple.groom.name} & ${data.couple.bride.name} Wedding`,
    description: data.meta.ogDescription,
    robots: { index: false, follow: false }, // Prevent search engines from indexing draft previews
  };
}

export default async function PreviewPage({ params }: PageProps) {
  // Server-Side Data Fetch: zero Google Sheet credentials or respondent IDs leaked
  const data = await getWeddingDataBySlug(params.slug);

  if (!data) {
    notFound();
  }

  const coupleNames = `${data.couple.groom.name} & ${data.couple.bride.name}`;

  return (
    <>
      <PreviewBanner coupleNames={coupleNames} slug={data.slug} />
      {data.template === 'modern-romance' ? (
        <ModernRomanceTemplate data={data} isPreview={true} />
      ) : (
        <KeralaClassicalTemplate data={data} isPreview={true} />
      )}
    </>
  );
}
