import axios from 'axios';
import { IStorage } from './storage';
import {
  Destination, InsertDestination,
  Tour, InsertTour,
  Activity, InsertActivity,
  Accommodation, InsertAccommodation,
  Review, InsertReview
} from '../shared/schema';

/**
 * StrapiStorage implements the IStorage interface but uses Strapi CMS as 
 * the data source instead of in-memory storage
 */
export class StrapiStorage implements IStorage {
  private apiUrl: string;
  private apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  // Helper method to make API requests
  private async apiRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<T> {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const response = await axios({
        method,
        url,
        headers: this.headers,
        data,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Strapi API error (${method} ${endpoint}):`, error.message);
      throw error;
    }
  }

  // Transform Strapi data to our app's schema
  private transformDestination(strapiData: any): Destination {
    const data = strapiData.attributes;
    return {
      id: strapiData.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image.data?.attributes?.url || '',
      gallery: data.gallery.data?.map((img: any) => img.attributes.url) || [],
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
      tourCount: data.tourCount || 0,
      continent: data.continent || '',
      isFeatured: data.isFeatured ? 1 : 0,
    };
  }

  private transformTour(strapiData: any): Tour {
    const data = strapiData.attributes;
    return {
      id: strapiData.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      duration: data.duration,
      price: data.price,
      image: data.featuredImage.data?.attributes?.url || '',
      gallery: data.gallery.data?.map((img: any) => img.attributes.url) || [],
      destinationId: data.destination.data?.id || 0,
      destinationName: data.destination.data?.attributes?.name || '',
      departureDates: data.departureDates || [],
      itinerary: data.itinerary || {},
      highlights: data.highlights || [],
      included: data.included || [],
      excluded: data.excluded || [],
      difficulty: data.difficulty || '',
      groupSize: data.groupSize || 0,
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
      isFeatured: data.isFeatured ? 1 : 0,
      tag: data.tag || '',
    };
  }

  private transformActivity(strapiData: any): Activity {
    const data = strapiData.attributes;
    return {
      id: strapiData.id,
      name: data.name,
      description: data.description,
      image: data.image.data?.attributes?.url || '',
      price: data.price,
      duration: data.duration,
      destinationId: data.destination.data?.id || 0,
      destinationName: data.destination.data?.attributes?.name || '',
      isFeatured: data.isFeatured ? 1 : 0,
    };
  }

  private transformAccommodation(strapiData: any): Accommodation {
    const data = strapiData.attributes;
    return {
      id: strapiData.id,
      name: data.name,
      description: data.description,
      image: data.image.data?.attributes?.url || '',
      address: data.address,
      amenities: data.amenities || [],
      rating: data.rating || 0,
      price: data.price,
      destinationId: data.destination.data?.id || 0,
      destinationName: data.destination.data?.attributes?.name || '',
      type: data.type || '',
      isFeatured: data.isFeatured ? 1 : 0,
    };
  }

  private transformReview(strapiData: any): Review {
    const data = strapiData.attributes;
    return {
      id: strapiData.id,
      author: data.author,
      authorImage: data.authorImage.data?.attributes?.url || '',
      rating: data.rating,
      comment: data.comment,
      tourId: data.tour.data?.id || 0,
      tourTitle: data.tour.data?.attributes?.title || '',
    };
  }

  // Users
  async getUser(id: number): Promise<any> {
    const response = await this.apiRequest<any>('GET', `/api/users/${id}`);
    return response;
  }

  async getUserByUsername(username: string): Promise<any> {
    const response = await this.apiRequest<any>('GET', `/api/users?filters[username][$eq]=${username}`);
    return response.data[0] || undefined;
  }

  async createUser(user: any): Promise<any> {
    const response = await this.apiRequest<any>('POST', `/api/users`, user);
    return response;
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    const response = await this.apiRequest<any>('GET', '/api/destinations?populate=image,gallery');
    return response.data.map(this.transformDestination);
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/destinations/${id}?populate=image,gallery`);
    return this.transformDestination(response.data);
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/destinations?filters[slug][$eq]=${slug}&populate=image,gallery`);
    return response.data[0] ? this.transformDestination(response.data[0]) : undefined;
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    const response = await this.apiRequest<any>('GET', '/api/destinations?filters[isFeatured][$eq]=true&populate=image,gallery');
    return response.data.map(this.transformDestination);
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const response = await this.apiRequest<any>('POST', '/api/destinations', {
      data: destination
    });
    return this.transformDestination(response.data);
  }

  // Tours
  async getTours(): Promise<Tour[]> {
    const response = await this.apiRequest<any>('GET', '/api/tours?populate=featuredImage,gallery,destination');
    return response.data.map(this.transformTour);
  }

  async getTour(id: number): Promise<Tour | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/tours/${id}?populate=featuredImage,gallery,destination`);
    return this.transformTour(response.data);
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/tours?filters[slug][$eq]=${slug}&populate=featuredImage,gallery,destination`);
    return response.data[0] ? this.transformTour(response.data[0]) : undefined;
  }

  async getToursByDestination(destinationId: number): Promise<Tour[]> {
    const response = await this.apiRequest<any>('GET', `/api/tours?filters[destination][id][$eq]=${destinationId}&populate=featuredImage,gallery,destination`);
    return response.data.map(this.transformTour);
  }

  async getFeaturedTours(): Promise<Tour[]> {
    const response = await this.apiRequest<any>('GET', '/api/tours?filters[isFeatured][$eq]=true&populate=featuredImage,gallery,destination');
    return response.data.map(this.transformTour);
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const response = await this.apiRequest<any>('POST', '/api/tours', {
      data: tour
    });
    return this.transformTour(response.data);
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    const response = await this.apiRequest<any>('GET', '/api/activities?populate=image,destination');
    return response.data.map(this.transformActivity);
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/activities/${id}?populate=image,destination`);
    return this.transformActivity(response.data);
  }

  async getActivitiesByDestination(destinationId: number): Promise<Activity[]> {
    const response = await this.apiRequest<any>('GET', `/api/activities?filters[destination][id][$eq]=${destinationId}&populate=image,destination`);
    return response.data.map(this.transformActivity);
  }

  async getFeaturedActivities(): Promise<Activity[]> {
    const response = await this.apiRequest<any>('GET', '/api/activities?filters[isFeatured][$eq]=true&populate=image,destination');
    return response.data.map(this.transformActivity);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const response = await this.apiRequest<any>('POST', '/api/activities', {
      data: activity
    });
    return this.transformActivity(response.data);
  }

  // Accommodations
  async getAccommodations(): Promise<Accommodation[]> {
    const response = await this.apiRequest<any>('GET', '/api/accommodations?populate=image,destination');
    return response.data.map(this.transformAccommodation);
  }

  async getAccommodation(id: number): Promise<Accommodation | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/accommodations/${id}?populate=image,destination`);
    return this.transformAccommodation(response.data);
  }

  async getAccommodationsByDestination(destinationId: number): Promise<Accommodation[]> {
    const response = await this.apiRequest<any>('GET', `/api/accommodations?filters[destination][id][$eq]=${destinationId}&populate=image,destination`);
    return response.data.map(this.transformAccommodation);
  }

  async getFeaturedAccommodations(): Promise<Accommodation[]> {
    const response = await this.apiRequest<any>('GET', '/api/accommodations?filters[isFeatured][$eq]=true&populate=image,destination');
    return response.data.map(this.transformAccommodation);
  }

  async createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation> {
    const response = await this.apiRequest<any>('POST', '/api/accommodations', {
      data: accommodation
    });
    return this.transformAccommodation(response.data);
  }

  // Reviews
  async getReviews(): Promise<Review[]> {
    const response = await this.apiRequest<any>('GET', '/api/reviews?populate=authorImage,tour');
    return response.data.map(this.transformReview);
  }

  async getReview(id: number): Promise<Review | undefined> {
    const response = await this.apiRequest<any>('GET', `/api/reviews/${id}?populate=authorImage,tour`);
    return this.transformReview(response.data);
  }

  async getReviewsByTour(tourId: number): Promise<Review[]> {
    const response = await this.apiRequest<any>('GET', `/api/reviews?filters[tour][id][$eq]=${tourId}&populate=authorImage,tour`);
    return response.data.map(this.transformReview);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const response = await this.apiRequest<any>('POST', '/api/reviews', {
      data: review
    });
    return this.transformReview(response.data);
  }
}

// Create a factory function to initialize the Strapi storage
export function createStrapiStorage(apiUrl: string, apiToken: string): IStorage {
  return new StrapiStorage(apiUrl, apiToken);
}