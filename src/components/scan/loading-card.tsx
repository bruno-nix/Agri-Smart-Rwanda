'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { Loader2 } from 'lucide-react';

export function LoadingCard() {
  const { t } = useLanguage();
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle className="text-center">{t('scan.loading')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-muted-foreground max-w-sm">{t('scan.loading.description')}</p>
      </CardContent>
    </Card>
  );
}
