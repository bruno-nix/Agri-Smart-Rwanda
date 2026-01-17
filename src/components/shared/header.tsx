'use client';

import Link from 'next/link';
import { Leaf, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react';

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const navLinks = [
    { href: '/scan', label: t('nav.scan') },
    { href: '/marketplace', label: t('nav.marketplace') },
  ];

  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="ghost"
          className={cn(
            'text-foreground/80 hover:text-foreground',
            pathname === link.href && 'font-bold text-primary hover:text-primary',
            isMobile && 'w-full justify-start text-lg py-6'
          )}
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2"  onClick={() => setIsSheetOpen(false)}>
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg font-headline text-primary">{t('app.title')}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-4">
          <NavLinkItems />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={toggleLanguage}
            className="w-20 font-bold border-2"
          >
            {language === 'en' ? t('lang.kin') : t('lang.en')}
          </Button>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <NavLinkItems isMobile={true} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
