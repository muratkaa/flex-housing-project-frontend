export interface Property {
  id: number;
  title: string;
  location: string;
  image: string;
  price: number;
  nights: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Modern Apt in Shoreditch",
    location: "Shoreditch, London",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    price: 4417,
    nights: 27,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 2,
    title: "Cozy Studio in Soho",
    location: "Soho, London",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop",
    price: 3079,
    nights: 27,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    rating: 4.2,
    reviewCount: 85
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    location: "City of London",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    price: 8500,
    nights: 27,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 4,
    title: "Riverside View Apartment",
    location: "Southbank, London",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800&auto=format&fit=crop",
    price: 5200,
    nights: 27,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    rating: 4.7,
    reviewCount: 96
  },
  {
    id: 5,
    title: "Kensington Garden Flat",
    location: "Kensington, London",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
    price: 4800,
    nights: 27,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    rating: 4.5,
    reviewCount: 63
  },
  {
    id: 6,
    title: "Notting Hill Townhouse",
    location: "Notting Hill, London",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    price: 6500,
    nights: 27,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    rating: 4.6,
    reviewCount: 78
  }
];