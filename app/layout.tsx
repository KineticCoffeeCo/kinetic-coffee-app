import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kinetic Coffee Co. — Veteran-Owned Small-Batch Coffee',
  description:
    'Kinetic Coffee Co. is a veteran-owned coffee company serving small-batch bagged coffee, lattes, drip coffee, and Lotus Energy refreshers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="construction-banner">
          🚧 Site is under construction and not open for ordering yet — come back soon!
        </div>
        {children}
      </body>
    </html>
  );
}
