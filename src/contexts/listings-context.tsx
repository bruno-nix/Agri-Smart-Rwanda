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
