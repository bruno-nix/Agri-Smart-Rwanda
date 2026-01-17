'use server';
/**
 * @fileOverview An AI agent that determines the quality grade and fair market price for a crop based on an image.
 *
 * - getCropQualityAndPrice - A function that handles the crop quality and price estimation process.
 * - GetCropQualityAndPriceInput - The input type for the getCropQualityAndPrice function.
 * - GetCropQualityAndPriceOutput - The return type for the getCropQualityAndPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetCropQualityAndPriceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  cropType: z.enum(['Tomato', 'Potato', 'Maize', 'Mango', 'Pineapple', 'Banana', 'Cassava', 'Beans', 'Cabbage', 'Carrot', 'Onion', 'Eggplant', 'Cucumber', 'Bell Pepper', 'Spinach', 'Avocado', 'Papaya', 'Watermelon', 'Orange', 'Lemon']).describe('The type of crop.'),
  farmerLocation: z.string().describe('The location of the farmer.'),
});
export type GetCropQualityAndPriceInput = z.infer<typeof GetCropQualityAndPriceInputSchema>;

const GetCropQualityAndPriceOutputSchema = z.object({
  qualityGrade: z.enum(['A', 'B', 'C']).describe('The quality grade of the crop.'),
  pricePerKg: z.number().describe('The fair market price per kilogram in RWF.'),
  category: z.enum(['Fruit', 'Vegetable']).describe('The category of the crop (Fruit or Vegetable).'),
});
export type GetCropQualityAndPriceOutput = z.infer<typeof GetCropQualityAndPriceOutputSchema>;

export async function getCropQualityAndPrice(input: GetCropQualityAndPriceInput): Promise<GetCropQualityAndPriceOutput> {
  return getCropQualityAndPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCropQualityAndPricePrompt',
  input: {schema: GetCropQualityAndPriceInputSchema},
  output: {schema: GetCropQualityAndPriceOutputSchema},
  prompt: `You are an AI assistant that helps farmers determine the quality grade and fair market price for their crops.

  Analyze the photo of the crop and consider its type and the farmer's location to estimate the quality and suggest a fair market price.

  Respond with the quality grade (A, B, or C), the price per kilogram in RWF, and the category (Fruit or Vegetable).

  Crop Type: {{{cropType}}}
  Farmer Location: {{{farmerLocation}}}
  Photo: {{media url=photoDataUri}}

  The qualityGrade, pricePerKg, and category output fields should be set appropriately.
`,
});

const getCropQualityAndPriceFlow = ai.defineFlow(
  {
    name: 'getCropQualityAndPriceFlow',
    inputSchema: GetCropQualityAndPriceInputSchema,
    outputSchema: GetCropQualityAndPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
