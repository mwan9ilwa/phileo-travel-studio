// Shared types
export type ImagePath = string;
export type Slug = string;

// Homepage Types
export interface HomepageSection {
  __component: string;
}

export interface HeroSection extends HomepageSection {
  __component: "homepage.section-hero";
  title: string;
  description: string;
  image: ImagePath;
  callToActionText: string;
  callToActionLink: string;
}

export interface FeaturedDestinationsSection extends HomepageSection {
  __component: "homepage.section-featured-destinations";
  title: string;
  destinations: Slug[];
}

export interface Testimonial {
  author: string;
  comment: string;
  rating: number;
  avatar?: ImagePath;
}

export interface TestimonialsSection extends HomepageSection {
  __component: "homepage.section-testimonials";
  title: string;
  testimonials: Testimonial[];
}

export interface Homepage {
  heroTitle: string;
  heroDescription: string;
  heroImage: ImagePath;
  featuredDestinations: Slug[];
  featuredTours: Slug[];
  sections: (HeroSection | FeaturedDestinationsSection | TestimonialsSection)[];
}

// About Page Types
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  image: ImagePath;
  bio: string;
  socialLinks: SocialLinks;
}

export interface About {
  content: string;
  teamMembers: TeamMember[];
}

// Contact Page Types
export interface FormField {
  label: string;
  type: string;
  required: boolean;
  min?: number;
}

export interface ContactFormFields {
  fullName: FormField;
  departureDate: FormField;
  departureCity: FormField;
  arrivalCity: FormField;
  returnDate: FormField;
  numberOfPassengers: FormField;
  email: FormField;
  phoneNumber: FormField;
}

export interface Contact {
  address: string;
  phone: string;
  email: string;
  googleMapsEmbed: string;
  contactFormSuccessMessage: string;
  inquiryFormFields: ContactFormFields;
}

// Destination Types
export interface Location {
  latitude: number;
  longitude: number;
}

export interface DestinationSection {
  __component: string;
}

export interface TextSection extends DestinationSection {
  __component: "destination.text-section";
  title: string;
  content: string;
}

export interface Destination {
  id: number;
  name: string;
  slug: Slug;
  description: string;
  image: ImagePath;
  gallery: ImagePath[];
  activities: Slug[];
  location: Location;
  sections: TextSection[];
}

// Tour Types
export interface DepartureDate {
  date: string;
  time: string;
  availableSeats: number;
}

export interface ItineraryItem {
  __component: string;
}

export interface ItineraryDay extends ItineraryItem {
  __component: "tour.itinerary-day";
  day: number;
  title: string;
  description: string;
}

export interface ItineraryActivity extends ItineraryItem {
  __component: "tour.itinerary-activity";
  activity: Slug;
  description?: string;
}

export interface Tour {
  id: number;
  title: string;
  slug: Slug;
  shortDescription: string;
  description: string;
  duration: number;
  durationUnit: string;
  price: number;
  currency: string;
  featuredImage: ImagePath;
  gallery: ImagePath[];
  destination: Slug;
  departureDates: DepartureDate[];
  itinerary: (ItineraryDay | ItineraryActivity)[];
  highlights: string[];
  included: string;
  excluded: string;
  difficulty: string;
  groupSize: number;
  bookingLink: string;
  isFeatured: boolean;
}

// Activity Types
export interface Activity {
  id: number;
  name: string;
  slug: Slug;
  description: string;
  image: ImagePath;
  price: number;
  currency: string;
  duration: string;
  location: Location;
}

// Accommodation Types
export interface Amenity {
  name: string;
  icon: string;
}

export interface Accommodation {
  id: number;
  name: string;
  slug: Slug;
  description: string;
  image: ImagePath;
  gallery: ImagePath[];
  address: string;
  location: Location;
  amenities: Amenity[];
  rating: number;
  type: string;
}

// Review Types
export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  tour: Slug;
  isApproved: boolean;
  avatar?: ImagePath;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: Slug;
  description: string;
  image: ImagePath;
}
