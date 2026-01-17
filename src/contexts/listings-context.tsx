'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Listing } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const tomatoImage = PlaceHolderImages.find(img => img.id === 'tomato-1');
const potatoImage = PlaceHolderImages.find(img => img.id === 'potato-1');
const maizeImage = PlaceHolderImages.find(img => img.id === 'maize-1');
const tomato2Image = PlaceHolderImages.find(img => img.id === 'tomato-2');
const mangoImage = PlaceHolderImages.find(img => img.id === 'mango-1');
const pineappleImage = PlaceHolderImages.find(img => img.id === 'pineapple-1');
const bananaImage = PlaceHolderImages.find(img => img.id === 'banana-1');
const cassavaImage = PlaceHolderImages.find(img => img.id === 'cassava-1');
const beansImage = PlaceHolderImages.find(img => img.id === 'beans-1');
const cabbageImage = PlaceHolderImages.find(img => img.id === 'cabbage-1');
const carrotImage = PlaceHolderImages.find(img => img.id === 'carrot-1');
const onionImage = PlaceHolderImages.find(img => img.id === 'onion-1');
const avocadoImage = PlaceHolderImages.find(img => img.id === 'avocado-1');
const papayaImage = PlaceHolderImages.find(img => img.id === 'papaya-1');

const initialListings: Listing[] = [
  {
    id: '1',
    cropType: 'Tomato',
    qualityGrade: 'A',
    pricePerKg: 800,
    farmerLocation: 'Rulindo',
    image: tomatoImage?.imageUrl ?? '',
    imageHint: tomatoImage?.imageHint,
    contact: '+250 788 123 456',
    category: 'Vegetable',
  },
  {
    id: '2',
    cropType: 'Potato',
    qualityGrade: 'B',
    pricePerKg: 450,
    farmerLocation: 'Musanze',
    image: potatoImage?.imageUrl ?? '',
    imageHint: potatoImage?.imageHint,
    contact: 'farmer.potato@email.com',
    category: 'Vegetable',
  },
  {
    id: '3',
    cropType: 'Maize',
    qualityGrade: 'A',
    pricePerKg: 300,
    farmerLocation: 'Kayonza',
    image: maizeImage?.imageUrl ?? '',
    imageHint: maizeImage?.imageHint,
    contact: '+250 788 987 654',
    category: 'Vegetable',
  },
  {
    id: '4',
    cropType: 'Tomato',
    qualityGrade: 'B',
    pricePerKg: 650,
    farmerLocation: 'Gasabo',
    image: tomato2Image?.imageUrl ?? '',
    imageHint: tomato2Image?.imageHint,
    contact: 'gasabo.growers@email.com',
    category: 'Vegetable',
  },
  {
    id: '5',
    cropType: 'Mango',
    qualityGrade: 'A',
    pricePerKg: 1200,
    farmerLocation: 'Rusizi',
    image: mangoImage?.imageUrl ?? '',
    imageHint: mangoImage?.imageHint,
    contact: '+250 788 111 222',
    category: 'Fruit',
  },
  {
    id: '6',
    cropType: 'Pineapple',
    qualityGrade: 'A',
    pricePerKg: 700,
    farmerLocation: 'Ngoma',
    image: pineappleImage?.imageUrl ?? '',
    imageHint: pineappleImage?.imageHint,
    contact: 'pine.farmer@example.com',
    category: 'Fruit',
  },
  {
    id: '7',
    cropType: 'Banana',
    qualityGrade: 'B',
    pricePerKg: 400,
    farmerLocation: 'Huye',
    image: bananaImage?.imageUrl ?? '',
    imageHint: bananaImage?.imageHint,
    contact: '+250 788 333 444',
    category: 'Fruit',
  },
  {
    id: '8',
    cropType: 'Cassava',
    qualityGrade: 'C',
    pricePerKg: 250,
    farmerLocation: 'Kamonyi',
    image: cassavaImage?.imageUrl ?? '',
    imageHint: cassavaImage?.imageHint,
    contact: 'cassava.coop@email.com',
    category: 'Vegetable',
  },
  {
    id: '9',
    cropType: 'Beans',
    qualityGrade: 'A',
    pricePerKg: 900,
    farmerLocation: 'Gicumbi',
    image: beansImage?.imageUrl ?? '',
    imageHint: beansImage?.imageHint,
    contact: '+250 788 555 666',
    category: 'Vegetable',
  },
  {
    id: '10',
    cropType: 'Cabbage',
    qualityGrade: 'A',
    pricePerKg: 350,
    farmerLocation: 'Nyabihu',
    image: cabbageImage?.imageUrl ?? '',
    imageHint: cabbageImage?.imageHint,
    contact: '+250 788 444 555',
    category: 'Vegetable',
  },
  {
    id: '11',
    cropType: 'Carrot',
    qualityGrade: 'A',
    pricePerKg: 600,
    farmerLocation: 'Gisagara',
    image: carrotImage?.imageUrl ?? '',
    imageHint: carrotImage?.imageHint,
    contact: 'carrot.farm@example.com',
    category: 'Vegetable',
  },
  {
    id: '12',
    cropType: 'Avocado',
    qualityGrade: 'B',
    pricePerKg: 1500,
    farmerLocation: 'Nyamagabe',
    image: avocadoImage?.imageUrl ?? '',
    imageHint: avocadoImage?.imageHint,
    contact: '+250 788 777 888',
    category: 'Fruit',
  },
  {
    id: '13',
    cropType: 'Onion',
    qualityGrade: 'B',
    pricePerKg: 700,
    farmerLocation: 'Rubavu',
    image: onionImage?.imageUrl ?? '',
    imageHint: onionImage?.imageHint,
    contact: 'onion.grower@example.com',
    category: 'Vegetable',
  },
  {
    id: '14',
    cropType: 'Papaya',
    qualityGrade: 'A',
    pricePerKg: 800,
    farmerLocation: 'Bugesera',
    image: papayaImage?.imageUrl ?? '',
    imageHint: papayaImage?.imageHint,
    contact: '+250 788 999 000',
    category: 'Fruit',
  },
];


interface ListingsContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, 'id'>) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  const addListing = (listing: Omit<Listing, 'id'>) => {
    const newListing = { ...listing, id: new Date().toISOString() };
    setListings((prev) => [newListing, ...prev]);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};
