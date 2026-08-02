import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: '10 Minute School | Study Abroad',
  description: 'Explore universities, compare countries, and get free guidance — trusted by Bangladeshi students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Dark mode is temporarily disabled site-wide — always light,
          // regardless of any previously stored preference or OS setting.
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                document.documentElement.setAttribute('data-theme', 'light');
              } catch (e) {}
            })()`,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <FloatingActions />
        <Footer />
      </body>
    </html>
  );
}
