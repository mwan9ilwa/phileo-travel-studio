// Type definitions for the application

// User type (matches schema.ts)
export interface User {
  id: number;
  username: string;
  password: string;
}

// Destination type (matches schema.ts)
export interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  tourCount: number;
  continent: string;
  isFeatured: number;
}

// Tour type (matches schema.ts)
export interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  gallery: string[];
  destinationId: number;
  destinationName: string;
  departureDates: string[];
  itinerary: {
    [key: string]: string;
  };
  highlights: string[];
  included: string[];
  excluded: string[];
  difficulty: string;
  groupSize: number;
  rating: number;
  reviewCount: number;
  isFeatured: number;
  tag: string;
}

// Activity type (matches schema.ts)
export interface Activity {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  destinationId: number;
  destinationName: string;
  isFeatured: number;
}

// Accommodation type (matches schema.ts)
export interface Accommodation {
  id: number;
  name: string;
  description: string;
  image: string;
  address: string;
  amenities: string[];
  rating: number;
  price: number;
  destinationId: number;
  destinationName: string;
  type: string;
  isFeatured: number;
}

// Review type (matches schema.ts)
export interface Review {
  id: number;
  author: string;
  authorImage: string;
  rating: number;
  comment: string;
  tourId: number;
  tourTitle: string;
}

// Search parameters interface
export interface SearchParams {
  destination?: string;
  date?: string;
  travelers?: string;
  difficulty?: string;
  minPrice?: string;
  maxPrice?: string;
  duration?: string;
  continent?: string;
}
