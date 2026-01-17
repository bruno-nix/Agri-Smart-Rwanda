'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Listing } from '@/lib/types';
import { MapPin, Copy } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleContactClick = () => {
    navigator.clipboard.writeText(listing.contact);
    toast({
      description: t('listing.contact.copied'),
    });
  };

  const cropTypeTranslations: Record<string, string> = {
    Tomato: t('scan.form.cropType.tomato'),
    Potato: t('scan.form.cropType.potato'),
    Maize: t('scan.form.cropType.maize'),
    Mango: t('scan.form.cropType.mango'),
    Pineapple: t('scan.form.cropType.pineapple'),
    Banana: t('scan.form.cropType.banana'),
    Cassava: t('scan.form.cropType.cassava'),
    Beans: t('scan.form.cropType.beans'),
  };

  const translatedCropType = cropTypeTranslations[listing.cropType] || listing.cropType;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.cropType}
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint={listing.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-bold font-headline">{translatedCropType}</CardTitle>
          <Badge variant={listing.qualityGrade === 'A' ? 'default' : 'secondary'} className={
            cn({
              'bg-green-600 text-white': listing.qualityGrade === 'A',
              'bg-yellow-500 text-black': listing.qualityGrade === 'B',
              'bg-orange-600 text-white': listing.qualityGrade === 'C',
            }, 'text-sm')}>
            {t('listing.grade')} {listing.qualityGrade}
          </Badge>
        </div>
        <div className="text-primary font-semibold text-lg mt-1">
          {listing.pricePerKg.toLocaleString()} {t('listing.price_per_kg')}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
          <MapPin className="h-4 w-4" />
          <span>{listing.farmerLocation}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleContactClick} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Copy className="mr-2 h-4 w-4" />
          {t('listing.contact')}
        </Button>
      </CardFooter>
    </Card>
  );
}
