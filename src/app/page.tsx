'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { Camera } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tight">
          {t('home.title')}
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
        <div className="mt-8 md:mt-12">
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/scan">
              <Camera className="mr-3 h-6 w-6" />
              {t('home.cta')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
