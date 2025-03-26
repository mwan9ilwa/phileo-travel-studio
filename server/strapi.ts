import axios from 'axios';
import {
  IStorage,
  User,
  InsertUser,
  Destination,
  InsertDestination,
  Tour,
  InsertTour,
  Activity,
  InsertActivity,
  Accommodation,
  InsertAccommodation,
  Review,
  InsertReview
} from './storage';

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
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json'
    };
  }

  private async apiRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<T> {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const response = await axios({
        method,
        url,
        headers: this.headers,
        data
      });
      return response.data;
    } catch (error: any) {
      console.error(`Strapi API Error (${endpoint}):`, error.message);
      throw new Error(`Strapi API Error: ${error.message}`);
    }
  }

  // Transformation methods to convert Strapi data format to our app's format
  private transformDestination(strapiData: any): Destination {
    const data = strapiData.attributes || strapiData;
    const gallery = data.gallery?.data?.map((img: any) => img.attributes.url) || [];
    
    return {
      id: strapiData.id || 0,
      name: data.name || '',
      slug: data.slug || '',
      description: data.description || '',
      image: data.image?.data?.attributes?.url || data.image || '',
      gallery: gallery,
      rating: data.rating || '0',
      reviewCount: data.reviewCount || 0,
      tourCount: data.tourCount || 0,
      continent: data.continent || '',
      isFeatured: data.isFeatured ? 1 : 0
    };
  }

  private transformTour(strapiData: any): Tour {
    const data = strapiData.attributes || strapiData;
    const gallery = data.gallery?.data?.map((img: any) => img.attributes.url) || [];
    
    return {
      id: strapiData.id || 0,
      title: data.title || '',
      slug: data.slug || '',
      description: data.description || '',
      duration: data.duration || 0,
      price: data.price?.toString() || '0',
      image: data.image?.data?.attributes?.url || data.image || '',
      gallery: gallery,
      destinationId: data.destination?.data?.id || data.destinationId || 0,
      destinationName: data.destination?.data?.attributes?.name || data.destinationName || '',
      departureDates: data.departureDates || [],
      itinerary: data.itinerary || {},
      highlights: data.highlights || [],
      included: data.included || [],
      excluded: data.excluded || [],
      difficulty: data.difficulty || 'Easy',
      groupSize: data.groupSize || 10,
      rating: data.rating || '0',
      reviewCount: data.reviewCount || 0,
      isFeatured: data.isFeatured ? 1 : 0,
      tag: data.tag || null
    };
  }

  private transformActivity(strapiData: any): Activity {
    const data = strapiData.attributes || strapiData;
    
    return {
      id: strapiData.id || 0,
      name: data.name || '',
      description: data.description || '',
      image: data.image?.data?.attributes?.url || data.image || '',
      price: data.price?.toString() || '0',
      duration: data.duration || '',
      destinationId: data.destination?.data?.id || data.destinationId || 0,
      destinationName: data.destination?.data?.attributes?.name || data.destinationName || '',
      isFeatured: data.isFeatured ? 1 : 0
    };
  }

  private transformAccommodation(strapiData: any): Accommodation {
    const data = strapiData.attributes || strapiData;
    
    return {
      id: strapiData.id || 0,
      name: data.name || '',
      description: data.description || '',
      image: data.image?.data?.attributes?.url || data.image || '',
      address: data.address || '',
      amenities: data.amenities || [],
      rating: data.rating || '0',
      price: data.price?.toString() || '0',
      destinationId: data.destination?.data?.id || data.destinationId || 0,
      destinationName: data.destination?.data?.attributes?.name || data.destinationName || '',
      type: data.type || 'Hotel',
      isFeatured: data.isFeatured ? 1 : 0
    };
  }

  private transformReview(strapiData: any): Review {
    const data = strapiData.attributes || strapiData;
    
    return {
      id: strapiData.id || 0,
      author: data.author || '',
      authorImage: data.authorImage?.data?.attributes?.url || data.authorImage || '',
      rating: data.rating || '0',
      comment: data.comment || '',
      tourId: data.tour?.data?.id || data.tourId || 0,
      tourTitle: data.tour?.data?.attributes?.title || data.tourTitle || ''
    };
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const response = await this.apiRequest<any>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const response = await this.apiRequest<any>(`/users?filters[username][$eq]=${username}`);
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const response = await this.apiRequest<any>('/users', 'POST', user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Destinations methods
  async getDestinations(): Promise<Destination[]> {
    try {
      const response = await this.apiRequest<any>('/destinations?populate=*');
      return response.data.map(this.transformDestination);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    try {
      const response = await this.apiRequest<any>(`/destinations/${id}?populate=*`);
      return this.transformDestination(response.data);
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      return undefined;
    }
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    try {
      const response = await this.apiRequest<any>(`/destinations?filters[slug][$eq]=${slug}&populate=*`);
      if (response.data && response.data.length > 0) {
        return this.transformDestination(response.data[0]);
      }
      return undefined;
    } catch (error) {
      console.error(`Error fetching destination by slug ${slug}:`, error);
      return undefined;
    }
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    try {
      const response = await this.apiRequest<any>('/destinations?filters[isFeatured][$eq]=true&populate=*');
      return response.data.map(this.transformDestination);
    } catch (error) {
      console.error('Error fetching featured destinations:', error);
      return [];
    }
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    try {
      const response = await this.apiRequest<any>('/destinations', 'POST', { data: destination });
      return this.transformDestination(response.data);
    } catch (error) {
      console.error('Error creating destination:', error);
      throw error;
    }
  }

  // Tours methods
  async getTours(): Promise<Tour[]> {
    try {
      const response = await this.apiRequest<any>('/tours?populate=*');
      return response.data.map(this.transformTour);
    } catch (error) {
      console.error('Error fetching tours:', error);
      return [];
    }
  }

  async getTour(id: number): Promise<Tour | undefined> {
    try {
      const response = await this.apiRequest<any>(`/tours/${id}?populate=*`);
      return this.transformTour(response.data);
    } catch (error) {
      console.error(`Error fetching tour ${id}:`, error);
      return undefined;
    }
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    try {
      const response = await this.apiRequest<any>(`/tours?filters[slug][$eq]=${slug}&populate=*`);
      if (response.data && response.data.length > 0) {
        return this.transformTour(response.data[0]);
      }
      return undefined;
    } catch (error) {
      console.error(`Error fetching tour by slug ${slug}:`, error);
      return undefined;
    }
  }

  async getToursByDestination(destinationId: number): Promise<Tour[]> {
    try {
      const response = await this.apiRequest<any>(
        `/tours?filters[destination][id][$eq]=${destinationId}&populate=*`
      );
      return response.data.map(this.transformTour);
    } catch (error) {
      console.error(`Error fetching tours for destination ${destinationId}:`, error);
      return [];
    }
  }

  async getFeaturedTours(): Promise<Tour[]> {
    try {
      const response = await this.apiRequest<any>('/tours?filters[isFeatured][$eq]=true&populate=*');
      return response.data.map(this.transformTour);
    } catch (error) {
      console.error('Error fetching featured tours:', error);
      return [];
    }
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    try {
      const response = await this.apiRequest<any>('/tours', 'POST', { data: tour });
      return this.transformTour(response.data);
    } catch (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
  }

  // Activities methods
  async getActivities(): Promise<Activity[]> {
    try {
      const response = await this.apiRequest<any>('/activities?populate=*');
      return response.data.map(this.transformActivity);
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    try {
      const response = await this.apiRequest<any>(`/activities/${id}?populate=*`);
      return this.transformActivity(response.data);
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error);
      return undefined;
    }
  }

  async getActivitiesByDestination(destinationId: number): Promise<Activity[]> {
    try {
      const response = await this.apiRequest<any>(
        `/activities?filters[destination][id][$eq]=${destinationId}&populate=*`
      );
      return response.data.map(this.transformActivity);
    } catch (error) {
      console.error(`Error fetching activities for destination ${destinationId}:`, error);
      return [];
    }
  }

  async getFeaturedActivities(): Promise<Activity[]> {
    try {
      const response = await this.apiRequest<any>('/activities?filters[isFeatured][$eq]=true&populate=*');
      return response.data.map(this.transformActivity);
    } catch (error) {
      console.error('Error fetching featured activities:', error);
      return [];
    }
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    try {
      const response = await this.apiRequest<any>('/activities', 'POST', { data: activity });
      return this.transformActivity(response.data);
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  // Accommodations methods
  async getAccommodations(): Promise<Accommodation[]> {
    try {
      const response = await this.apiRequest<any>('/accommodations?populate=*');
      return response.data.map(this.transformAccommodation);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      return [];
    }
  }

  async getAccommodation(id: number): Promise<Accommodation | undefined> {
    try {
      const response = await this.apiRequest<any>(`/accommodations/${id}?populate=*`);
      return this.transformAccommodation(response.data);
    } catch (error) {
      console.error(`Error fetching accommodation ${id}:`, error);
      return undefined;
    }
  }

  async getAccommodationsByDestination(destinationId: number): Promise<Accommodation[]> {
    try {
      const response = await this.apiRequest<any>(
        `/accommodations?filters[destination][id][$eq]=${destinationId}&populate=*`
      );
      return response.data.map(this.transformAccommodation);
    } catch (error) {
      console.error(`Error fetching accommodations for destination ${destinationId}:`, error);
      return [];
    }
  }

  async getFeaturedAccommodations(): Promise<Accommodation[]> {
    try {
      const response = await this.apiRequest<any>('/accommodations?filters[isFeatured][$eq]=true&populate=*');
      return response.data.map(this.transformAccommodation);
    } catch (error) {
      console.error('Error fetching featured accommodations:', error);
      return [];
    }
  }

  async createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation> {
    try {
      const response = await this.apiRequest<any>('/accommodations', 'POST', { data: accommodation });
      return this.transformAccommodation(response.data);
    } catch (error) {
      console.error('Error creating accommodation:', error);
      throw error;
    }
  }

  // Reviews methods
  async getReviews(): Promise<Review[]> {
    try {
      const response = await this.apiRequest<any>('/reviews?populate=*');
      return response.data.map(this.transformReview);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  async getReview(id: number): Promise<Review | undefined> {
    try {
      const response = await this.apiRequest<any>(`/reviews/${id}?populate=*`);
      return this.transformReview(response.data);
    } catch (error) {
      console.error(`Error fetching review ${id}:`, error);
      return undefined;
    }
  }

  async getReviewsByTour(tourId: number): Promise<Review[]> {
    try {
      const response = await this.apiRequest<any>(
        `/reviews?filters[tour][id][$eq]=${tourId}&populate=*`
      );
      return response.data.map(this.transformReview);
    } catch (error) {
      console.error(`Error fetching reviews for tour ${tourId}:`, error);
      return [];
    }
  }

  async createReview(review: InsertReview): Promise<Review> {
    try {
      const response = await this.apiRequest<any>('/reviews', 'POST', { data: review });
      return this.transformReview(response.data);
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }
}

export function createStrapiStorage(apiUrl: string, apiToken: string): IStorage {
  return new StrapiStorage(apiUrl, apiToken);
}