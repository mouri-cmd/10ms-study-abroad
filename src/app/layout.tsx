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
          // Applied before first paint so there is no theme flash.
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                var t = localStorage.getItem('theme');
                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', t);
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
