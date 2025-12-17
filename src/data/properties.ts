export interface Property {
  id: number;
  title: string;
  location: string;
  images: string[];
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
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
     "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    ],
    price: 6500,
    nights: 27,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    rating: 4.6,
    reviewCount: 78
  }
];