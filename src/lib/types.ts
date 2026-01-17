export type CropType = 'Tomato' | 'Potato' | 'Maize' | 'Mango' | 'Pineapple' | 'Banana' | 'Cassava' | 'Beans' | 'Cabbage' | 'Carrot' | 'Onion' | 'Eggplant' | 'Cucumber' | 'Bell Pepper' | 'Spinach' | 'Avocado' | 'Papaya' | 'Watermelon' | 'Orange' | 'Lemon';
export type QualityGrade = 'A' | 'B' | 'C';
export type CropCategory = 'Fruit' | 'Vegetable';

export type Listing = {
  id: string;
  cropType: CropType;
  qualityGrade: QualityGrade;
  pricePerKg: number;
  farmerLocation: string;
  image: string; // URL or data URI
  contact: string;
  imageHint?: string;
  category: CropCategory;
};
