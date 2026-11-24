import type { Metadata } from 'next';
import { Cormorant_Garamond, Lato } from 'next/font/google';
import './globals.css';
import { SvgSprites } from '@/components/common/SvgSprites';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Custom Wedding Invitations',
  description: 'Handcrafted luxury digital wedding invitations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="font-body">
        <SvgSprites />
        {children}
      </body>
    </html>
  );
}
