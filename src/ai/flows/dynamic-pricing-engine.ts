'use server';

/**
 * @fileOverview This file defines the dynamic pricing engine flow, which suggests a fair market price for crops based on quality, crop type, and location.
 *
 * - dynamicPricingEngine - A function that suggests a fair price for a crop.
 * - DynamicPricingEngineInput - The input type for the dynamicPricingEngine function.
 * - DynamicPricingEngineOutput - The return type for the dynamicPricingEngine function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPricingEngineInputSchema = z.object({
  cropType: z.enum(['Tomato', 'Potato', 'Maize']).describe('The type of crop.'),
  qualityGrade: z.enum(['A', 'B', 'C']).describe('The quality grade of the crop.'),
  farmerLocation: z.string().describe('The location of the farmer.'),
});
export type DynamicPricingEngineInput = z.infer<typeof DynamicPricingEngineInputSchema>;

const DynamicPricingEngineOutputSchema = z.object({
  suggestedPricePerKg: z.number().describe('The suggested price per kg in RWF.'),
});
export type DynamicPricingEngineOutput = z.infer<typeof DynamicPricingEngineOutputSchema>;

export async function dynamicPricingEngine(input: DynamicPricingEngineInput): Promise<DynamicPricingEngineOutput> {
  return dynamicPricingEngineFlow(input);
}

const pricingPrompt = ai.definePrompt({
  name: 'pricingPrompt',
  input: {schema: DynamicPricingEngineInputSchema},
  output: {schema: DynamicPricingEngineOutputSchema},
  prompt: `You are an AI assistant that suggests a fair market price per kilogram (RWF) for crops based on their type, quality, and the farmer's location. Consider the following factors when determining the price:\n\n- Crop Type: {{{cropType}}}\n- Quality Grade: {{{qualityGrade}}}\n- Farmer Location: {{{farmerLocation}}}\n\nProvide the suggested price per kg in RWF as a number.
\nGiven the details, what is a fair price?`,
});

const dynamicPricingEngineFlow = ai.defineFlow(
  {
    name: 'dynamicPricingEngineFlow',
    inputSchema: DynamicPricingEngineInputSchema,
    outputSchema: DynamicPricingEngineOutputSchema,
  },
  async input => {
    const {output} = await pricingPrompt(input);
    return output!;
  }
);
