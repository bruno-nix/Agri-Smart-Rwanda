'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { UploadCloud } from 'lucide-react';
import type { CropType } from '@/lib/types';

const FormSchema = z.object({
  cropType: z.enum(['Tomato', 'Potato', 'Maize'], {
    required_error: 'Please select a crop type.',
  }),
  farmerLocation: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  photo: z.any().refine(file => file, 'Photo is required.'),
});

export type FormValues = z.infer<typeof FormSchema>;

interface CropScanFormProps {
  onSubmit: (values: FormValues, imageDataUri: string) => void;
}

export function CropScanForm({ onSubmit }: CropScanFormProps) {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  
  const onFormSubmit = (values: FormValues) => {
    if (!imageDataUri) {
      form.setError('photo', { type: 'manual', message: 'Photo is required.' });
      return;
    }
    setIsSubmitting(true);
    onSubmit(values, imageDataUri);
  };
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const changeEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(changeEvent);
    }
  }, []);


  const cropOptions: { value: CropType, label: string }[] = [
    { value: 'Tomato', label: t('scan.form.cropType.tomato') },
    { value: 'Potato', label: t('scan.form.cropType.potato') },
    { value: 'Maize', label: t('scan.form.cropType.maize') },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cropType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('scan.form.cropType')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('scan.form.cropType.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cropOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="farmerLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('scan.form.farmerLocation')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Nyamirambo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('scan.form.photo')}</FormLabel>
                  <FormControl>
                    <label 
                      className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors"
                      onDragOver={onDragOver}
                      onDrop={onDrop}
                    >
                      {imagePreview ? (
                        <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-lg p-2" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">{t('scan.form.photo.cta')}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{t('scan.form.photo.select')}</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg py-6" size="lg" disabled={isSubmitting}>
              {t('scan.form.submit')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
