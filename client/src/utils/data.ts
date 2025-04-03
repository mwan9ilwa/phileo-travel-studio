import {
  Homepage,
  About,
  Contact,
  Destination,
  Tour,
  Activity,
  Accommodation,
  Review,
  Category,
  Slug
} from '../types';

// Import JSON data
import homepageData from '../../../data/homepage.json';
import aboutData from '../../../data/about.json';
import contactData from '../../../data/contact.json';
import destinationsData from '../../../data/destinations.json';
import toursData from '../../../data/tours.json';
import activitiesData from '../../../data/activities.json';
import accommodationsData from '../../../data/accommodations.json';
import reviewsData from '../../../data/reviews.json';
import categoriesData from '../../../data/categories.json';

// Typed data with proper interfaces
export const homepage: Homepage = homepageData as Homepage;
export const about: About = aboutData as About;
export const contact: Contact = contactData as Contact;
export const destinations: Destination[] = destinationsData as Destination[];
export const tours: Tour[] = toursData as Tour[];
export const activities: Activity[] = activitiesData as Activity[];
export const accommodations: Accommodation[] = accommodationsData as Accommodation[];
export const reviews: Review[] = reviewsData as Review[];
export const categories: Category[] = categoriesData as Category[];

// Helper functions to get data by slug
export function getDestinationBySlug(slug: Slug): Destination | undefined {
  return destinations.find(destination => destination.slug === slug);
}

export function getTourBySlug(slug: Slug): Tour | undefined {
  return tours.find(tour => tour.slug === slug);
}

export function getActivityBySlug(slug: Slug): Activity | undefined {
  return activities.find(activity => activity.slug === slug);
}

export function getAccommodationBySlug(slug: Slug): Accommodation | undefined {
  return accommodations.find(accommodation => accommodation.slug === slug);
}

export function getCategoryBySlug(slug: Slug): Category | undefined {
  return categories.find(category => category.slug === slug);
}

export function getReviewsByTourSlug(tourSlug: Slug): Review[] {
  return reviews.filter(review => review.tour === tourSlug && review.isApproved);
}

export function getFeaturedDestinations(): Destination[] {
  const featuredSlugs = homepage.featuredDestinations;
  return destinations.filter(dest => featuredSlugs.includes(dest.slug));
}

export function getFeaturedTours(): Tour[] {
  const featuredSlugs = homepage.featuredTours;
  return tours.filter(tour => featuredSlugs.includes(tour.slug));
}

// Function to get activities by destination
export function getActivitiesByDestination(destinationSlug: Slug): Activity[] {
  const destination = getDestinationBySlug(destinationSlug);
  if (!destination) return [];
  
  return activities.filter(activity => 
    destination.activities.includes(activity.slug)
  );
}

// Function to get tours by destination
export function getToursByDestination(destinationSlug: Slug): Tour[] {
  return tours.filter(tour => tour.destination === destinationSlug);
}
