'use server';

import { getCropQualityAndPrice, type GetCropQualityAndPriceInput } from '@/ai/flows/get-crop-quality-and-price';

export async function analyzeCrop(data: GetCropQualityAndPriceInput) {
  try {
    const result = await getCropQualityAndPrice(data);
    return { success: true, data: result };
  } catch (error) {
    console.error('AI analysis failed:', error);
    return { success: false, error: 'Failed to analyze crop. Please try again.' };
  }
}
