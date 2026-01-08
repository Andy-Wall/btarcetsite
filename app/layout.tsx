import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BTARCET Architecture Team Site',
  description: 'Bosch Building Technologies Architecture Engineering Team site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
