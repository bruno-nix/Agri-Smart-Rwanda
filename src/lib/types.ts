export type CropType = 'Tomato' | 'Potato' | 'Maize' | 'Mango' | 'Pineapple' | 'Banana' | 'Cassava' | 'Beans';
export type QualityGrade = 'A' | 'B' | 'C';

export type Listing = {
  id: string;
  cropType: CropType;
  qualityGrade: QualityGrade;
  pricePerKg: number;
  farmerLocation: string;
  image: string; // URL or data URI
  contact: string;
  imageHint?: string;
};
