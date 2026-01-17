'use client';

import { ListingCard } from '@/components/marketplace/listing-card';
import { useLanguage } from '@/contexts/language-context';
import { useListings } from '@/contexts/listings-context';
import { Leaf } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function MarketplacePage() {
  const { listings } = useListings();
  const { t } = useLanguage();

  const fruits = listings.filter((listing) => listing.category === 'Fruit');
  const vegetables = listings.filter((listing) => listing.category === 'Vegetable');

  const renderEmptyState = (messageKey: 'marketplace.no_fruits' | 'marketplace.no_vegetables') => (
    <div className="text-center py-10 border-2 border-dashed rounded-lg col-span-full">
      <Leaf className="mx-auto h-10 w-10 text-foreground/30" />
      <h3 className="mt-4 text-md font-medium text-foreground/80">{t(messageKey)}</h3>
    </div>
  );

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

      {listings.length === 0 ? (
         <div className="text-center py-16 border-2 border-dashed rounded-lg">
           <Leaf className="mx-auto h-12 w-12 text-foreground/30" />
           <h3 className="mt-4 text-lg font-medium text-foreground/80">{t('marketplace.empty')}</h3>
         </div>
      ) : (
        <div className="space-y-12">
          {/* Fruits Section */}
          <section>
            <h2 className="text-3xl font-bold font-headline text-primary/90 mb-6">{t('marketplace.fruits')}</h2>
            {fruits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fruits.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : renderEmptyState('marketplace.no_fruits')}
          </section>

          <Separator />
          
          {/* Vegetables Section */}
          <section>
            <h2 className="text-3xl font-bold font-headline text-primary/90 mb-6">{t('marketplace.vegetables')}</h2>
             {vegetables.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {vegetables.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : renderEmptyState('marketplace.no_vegetables')}
          </section>
        </div>
      )}
    </div>
  );
}
