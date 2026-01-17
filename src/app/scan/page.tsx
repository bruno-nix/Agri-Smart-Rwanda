'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { useListings } from '@/contexts/listings-context';
import { useToast } from '@/hooks/use-toast';
import type { GetCropQualityAndPriceOutput } from '@/ai/flows/get-crop-quality-and-price';
import type { CropType } from '@/lib/types';
import { analyzeCrop } from '@/app/actions';

import { CropScanForm, type FormValues } from '@/components/scan/crop-scan-form';
import { LoadingCard } from '@/components/scan/loading-card';
import { AnalysisResultCard } from '@/components/scan/analysis-result-card';

type ScanState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'result'; data: GetCropQualityAndPriceOutput, image: string, cropType: CropType, location: string };

export default function ScanPage() {
  const { t } = useLanguage();
  const { addListing } = useListings();
  const { toast } = useToast();
  const router = useRouter();

  const [scanState, setScanState] = useState<ScanState>({ status: 'idle' });

  const handleFormSubmit = async (values: FormValues, imageDataUri: string) => {
    setScanState({ status: 'loading' });
    const result = await analyzeCrop({
      photoDataUri: imageDataUri,
      cropType: values.cropType,
      farmerLocation: values.farmerLocation,
    });

    if (result.success && result.data) {
      setScanState({
        status: 'result',
        data: result.data,
        image: imageDataUri,
        cropType: values.cropType,
        location: values.farmerLocation,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('error.ai'),
      });
      setScanState({ status: 'idle' });
    }
  };

  const handleAddToMarketplace = (contact: string) => {
    if (scanState.status === 'result') {
      addListing({
        cropType: scanState.cropType,
        qualityGrade: scanState.data.qualityGrade,
        pricePerKg: scanState.data.pricePerKg,
        farmerLocation: scanState.location,
        image: scanState.image,
        contact: contact,
      });
      router.push('/marketplace');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            {t('scan.title')}
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            {t('scan.description')}
          </p>
        </div>

        {scanState.status === 'idle' && (
          <CropScanForm onSubmit={handleFormSubmit} />
        )}
        
        {scanState.status === 'loading' && <LoadingCard />}

        {scanState.status === 'result' && (
          <AnalysisResultCard 
            result={scanState.data} 
            image={scanState.image}
            onAddToMarketplace={handleAddToMarketplace}
          />
        )}
      </div>
    </div>
  );
}
