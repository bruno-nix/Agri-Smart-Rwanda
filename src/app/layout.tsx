import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/shared/header';
import { ListingsProvider } from '@/contexts/listings-context';

export const metadata: Metadata = {
  title: 'Agri-Smart Rwanda',
  description: 'Fair Prices for Every Farmer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <LanguageProvider>
          <ListingsProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Toaster />
          </ListingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
