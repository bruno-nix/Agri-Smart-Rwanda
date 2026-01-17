'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/language-context';
import type { GetCropQualityAndPriceOutput } from '@/ai/flows/get-crop-quality-and-price';
import { cn } from '@/lib/utils';

interface AnalysisResultCardProps {
  result: GetCropQualityAndPriceOutput;
  image: string;
  onAddToMarketplace: (contact: string) => void;
}

const ContactFormSchema = z.object({
  contact: z.string().min(5, { message: 'Please enter valid contact info.' }),
});

export function AnalysisResultCard({ result, image, onAddToMarketplace }: AnalysisResultCardProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { contact: '' },
  });

  const handleFormSubmit = (values: z.infer<typeof ContactFormSchema>) => {
    setIsSubmitting(true);
    onAddToMarketplace(values.contact);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">{t('scan.result.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full aspect-video relative rounded-lg overflow-hidden border">
          <Image src={image} alt="Analyzed crop" fill className="object-contain" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="text-sm font-medium text-muted-foreground">{t('scan.result.quality')}</h3>
            <p className="text-4xl font-bold text-primary flex items-center justify-center gap-2 mt-1">
              <Badge variant={result.qualityGrade === 'A' ? 'default' : 'secondary'} className={
                cn({
                  'bg-green-600 text-white': result.qualityGrade === 'A',
                  'bg-yellow-500 text-black': result.qualityGrade === 'B',
                  'bg-orange-600 text-white': result.qualityGrade === 'C',
                }, 'text-2xl h-10 w-10 flex items-center justify-center')}>
                {result.qualityGrade}
              </Badge>
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="text-sm font-medium text-muted-foreground">{t('scan.result.price')}</h3>
            <p className="text-4xl font-bold text-primary mt-1">{result.pricePerKg.toLocaleString()}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold text-center">{t('scan.result.add_to_marketplace.title')}</h3>
          <p className="text-muted-foreground text-center mt-1">{t('scan.result.add_to_marketplace.description')}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="mt-4 space-y-4 max-w-sm mx-auto">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">{t('scan.result.form.contact')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('scan.result.form.contact')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isSubmitting}>
                {t('scan.result.form.submit')}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
