'use client';

import { ListingCard } from '@/components/marketplace/listing-card';
import { useLanguage } from '@/contexts/language-context';
import { useListings } from '@/contexts/listings-context';
import { Leaf } from 'lucide-react';

export default function MarketplacePage() {
  const { listings } = useListings();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {t('marketplace.title')}
        </h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
          {t('marketplace.description')}
        </p>
      </div>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Leaf className="mx-auto h-12 w-12 text-foreground/30" />
          <h3 className="mt-4 text-lg font-medium text-foreground/80">{t('marketplace.empty')}</h3>
        </div>
      )}
    </div>
  );
}
