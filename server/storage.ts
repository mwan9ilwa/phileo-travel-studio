import { 
  users, type User, type InsertUser,
  destinations, type Destination, type InsertDestination,
  tours, type Tour, type InsertTour,
  activities, type Activity, type InsertActivity,
  accommodations, type Accommodation, type InsertAccommodation,
  reviews, type Review, type InsertReview
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
  getFeaturedDestinations(): Promise<Destination[]>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Tours
  getTours(): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  getTourBySlug(slug: string): Promise<Tour | undefined>;
  getToursByDestination(destinationId: number): Promise<Tour[]>;
  getFeaturedTours(): Promise<Tour[]>;
  createTour(tour: InsertTour): Promise<Tour>;
  
  // Activities
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  getActivitiesByDestination(destinationId: number): Promise<Activity[]>;
  getFeaturedActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Accommodations
  getAccommodations(): Promise<Accommodation[]>;
  getAccommodation(id: number): Promise<Accommodation | undefined>;
  getAccommodationsByDestination(destinationId: number): Promise<Accommodation[]>;
  getFeaturedAccommodations(): Promise<Accommodation[]>;
  createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation>;
  
  // Reviews
  getReviews(): Promise<Review[]>;
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByTour(tourId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private tours: Map<number, Tour>;
  private activities: Map<number, Activity>;
  private accommodations: Map<number, Accommodation>;
  private reviews: Map<number, Review>;
  
  currentUserId: number;
  currentDestinationId: number;
  currentTourId: number;
  currentActivityId: number;
  currentAccommodationId: number;
  currentReviewId: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.destinations = new Map();
    this.tours = new Map();
    this.activities = new Map();
    this.accommodations = new Map();
    this.reviews = new Map();
    
    // Initialize IDs
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentTourId = 1;
    this.currentActivityId = 1;
    this.currentAccommodationId = 1;
    this.currentReviewId = 1;
    
    // Seed with sample data
    this.seedData();
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Destination Methods
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    return Array.from(this.destinations.values()).find(
      (destination) => destination.slug === slug
    );
  }
  
  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(
      (destination) => destination.isFeatured === 1
    );
  }
  
  async createDestination(destination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const newDestination: Destination = { ...destination, id };
    this.destinations.set(id, newDestination);
    return newDestination;
  }
  
  // Tour Methods
  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }
  
  async getTour(id: number): Promise<Tour | undefined> {
    return this.tours.get(id);
  }
  
  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    return Array.from(this.tours.values()).find(
      (tour) => tour.slug === slug
    );
  }
  
  async getToursByDestination(destinationId: number): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(
      (tour) => tour.destinationId === destinationId
    );
  }
  
  async getFeaturedTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(
      (tour) => tour.isFeatured === 1
    );
  }
  
  async createTour(tour: InsertTour): Promise<Tour> {
    const id = this.currentTourId++;
    const newTour: Tour = { ...tour, id };
    this.tours.set(id, newTour);
    return newTour;
  }
  
  // Activity Methods
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }
  
  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }
  
  async getActivitiesByDestination(destinationId: number): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => activity.destinationId === destinationId
    );
  }
  
  async getFeaturedActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => activity.isFeatured === 1
    );
  }
  
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const newActivity: Activity = { ...activity, id };
    this.activities.set(id, newActivity);
    return newActivity;
  }
  
  // Accommodation Methods
  async getAccommodations(): Promise<Accommodation[]> {
    return Array.from(this.accommodations.values());
  }
  
  async getAccommodation(id: number): Promise<Accommodation | undefined> {
    return this.accommodations.get(id);
  }
  
  async getAccommodationsByDestination(destinationId: number): Promise<Accommodation[]> {
    return Array.from(this.accommodations.values()).filter(
      (accommodation) => accommodation.destinationId === destinationId
    );
  }
  
  async getFeaturedAccommodations(): Promise<Accommodation[]> {
    return Array.from(this.accommodations.values()).filter(
      (accommodation) => accommodation.isFeatured === 1
    );
  }
  
  async createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation> {
    const id = this.currentAccommodationId++;
    const newAccommodation: Accommodation = { ...accommodation, id };
    this.accommodations.set(id, newAccommodation);
    return newAccommodation;
  }
  
  // Review Methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }
  
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
  
  async getReviewsByTour(tourId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.tourId === tourId
    );
  }
  
  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const newReview: Review = { ...review, id };
    this.reviews.set(id, newReview);
    return newReview;
  }
  
  // Seed data
  private seedData() {
    // Seed destinations
    const paris: Destination = {
      id: this.currentDestinationId++,
      name: "Paris, France",
      slug: "paris-france",
      description: "Discover the city of lights with its iconic monuments, world-class cuisine, and charming neighborhoods.",
      image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      ],
      rating: 4.8,
      reviewCount: 240,
      tourCount: 120,
      continent: "Europe",
      isFeatured: 1
    };
    
    const kyoto: Destination = {
      id: this.currentDestinationId++,
      name: "Kyoto, Japan",
      slug: "kyoto-japan",
      description: "Experience the perfect blend of ancient traditions and modern life in Japan's cultural capital.",
      image: "https://images.unsplash.com/photo-1506665531195-3566af98b107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ],
      rating: 4.9,
      reviewCount: 198,
      tourCount: 87,
      continent: "Asia",
      isFeatured: 1
    };
    
    const santorini: Destination = {
      id: this.currentDestinationId++,
      name: "Santorini, Greece",
      slug: "santorini-greece",
      description: "Relax on this stunning island with its iconic white buildings, blue domes and breathtaking sunsets.",
      image: "https://images.unsplash.com/photo-1580619305358-6fe0b8de2841?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d3c6882c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ],
      rating: 4.7,
      reviewCount: 156,
      tourCount: 64,
      continent: "Europe",
      isFeatured: 1
    };
    
    // Add destinations to map
    this.destinations.set(paris.id, paris);
    this.destinations.set(kyoto.id, kyoto);
    this.destinations.set(santorini.id, santorini);
    
    // Seed tours
    const italyCuisine: Tour = {
      id: this.currentTourId++,
      title: "Italian Cuisine & Culture Tour",
      slug: "italian-cuisine-culture-tour",
      description: "Experience the best of Italian cuisine, from pasta making classes to wine tastings, while exploring Rome's historic sites.",
      duration: 7,
      price: 1299,
      image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
      ],
      destinationId: 1,
      destinationName: "Rome, Italy",
      departureDates: ["2023-06-15", "2023-07-10", "2023-08-05"],
      itinerary: {
        day1: "Arrival and welcome dinner",
        day2: "Pasta making class and Colosseum tour",
        day3: "Vatican visit and evening wine tasting",
        day4: "Day trip to Tuscany vineyards",
        day5: "Roman Forum exploration and pizza class",
        day6: "Market visit and cooking competition",
        day7: "Farewell breakfast and departure"
      },
      highlights: [
        "Handson pasta making with local chefs",
        "Wine tasting in ancient cellars",
        "Skip-the-line tours of major attractions",
        "Small group size for personalized experience"
      ],
      included: [
        "6 nights accommodation",
        "All cooking classes and materials",
        "Breakfast daily, 4 lunches, 3 dinners",
        "Wine tastings",
        "All entrance fees",
        "English-speaking guides"
      ],
      excluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Gratuities"
      ],
      difficulty: "Easy",
      groupSize: 12,
      rating: 5.0,
      reviewCount: 48,
      isFeatured: 1,
      tag: "Trending"
    };
    
    const tanzaniaSafari: Tour = {
      id: this.currentTourId++,
      title: "Tanzania Safari Adventure",
      slug: "tanzania-safari-adventure",
      description: "Witness the incredible wildlife of Serengeti National Park, including the Big Five, with expert guides and luxury accommodations.",
      duration: 10,
      price: 3499,
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
      ],
      destinationId: 3,
      destinationName: "Serengeti, Tanzania",
      departureDates: ["2023-07-05", "2023-08-15", "2023-09-20"],
      itinerary: {
        day1: "Arrival in Arusha and welcome dinner",
        day2: "Flight to Serengeti and afternoon game drive",
        day3: "Full day game drive in Central Serengeti",
        day4: "Visit to Maasai village and evening safari",
        day5: "Hot air balloon safari and breakfast in the bush",
        day6: "Travel to Ngorongoro Conservation Area",
        day7: "Full day in Ngorongoro Crater",
        day8: "Lake Manyara National Park visit",
        day9: "Tarangire National Park exploration",
        day10: "Return to Arusha and departure"
      },
      highlights: [
        "Big Five wildlife viewing",
        "Hot air balloon safari over Serengeti",
        "Visit to authentic Maasai village",
        "Luxury lodges and tented camps"
      ],
      included: [
        "9 nights luxury accommodation",
        "All meals while on safari",
        "Private 4x4 safari vehicle with roof hatch",
        "Professional safari guide",
        "Park fees and game drives",
        "Internal flights",
        "Bottled water"
      ],
      excluded: [
        "International flights",
        "Travel insurance",
        "Visa fees",
        "Personal expenses",
        "Gratuities"
      ],
      difficulty: "Moderate",
      groupSize: 6,
      rating: 4.8,
      reviewCount: 32,
      isFeatured: 1,
      tag: ""
    };
    
    const kyotoCultural: Tour = {
      id: this.currentTourId++,
      title: "Kyoto Cultural Experience",
      slug: "kyoto-cultural-experience",
      description: "Immerse yourself in Japanese traditions with tea ceremonies, temple visits, and an authentic ryokan stay in historic Kyoto.",
      duration: 5,
      price: 1899,
      image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ],
      destinationId: 2,
      destinationName: "Kyoto, Japan",
      departureDates: ["2023-05-20", "2023-06-10", "2023-09-15"],
      itinerary: {
        day1: "Arrival in Kyoto and check-in to ryokan",
        day2: "Morning meditation at Zen temple, afternoon tea ceremony",
        day3: "Fushimi Inari Shrine and kimono experience",
        day4: "Arashiyama bamboo grove and traditional crafts",
        day5: "Nishiki Market visit and departure"
      },
      highlights: [
        "Stay in authentic Japanese ryokan",
        "Traditional tea ceremony experience",
        "Zen meditation with Buddhist monks",
        "Kimono fitting and photography session"
      ],
      included: [
        "4 nights accommodation (3 in ryokan, 1 in hotel)",
        "Daily breakfast, 2 traditional dinners",
        "Tea ceremony and meditation sessions",
        "Kimono rental for one day",
        "Public transportation passes",
        "English-speaking guide"
      ],
      excluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Some meals"
      ],
      difficulty: "Easy",
      groupSize: 8,
      rating: 4.9,
      reviewCount: 56,
      isFeatured: 1,
      tag: "Best Seller"
    };
    
    // Add tours to map
    this.tours.set(italyCuisine.id, italyCuisine);
    this.tours.set(tanzaniaSafari.id, tanzaniaSafari);
    this.tours.set(kyotoCultural.id, kyotoCultural);
    
    // Seed activities
    const activities = [
      {
        id: this.currentActivityId++,
        name: "Cooking Classes",
        description: "Learn authentic culinary techniques from local chefs.",
        image: "https://images.unsplash.com/photo-1510072015985-a5ac454c4940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 89,
        duration: "2-3 hours",
        destinationId: 1,
        destinationName: "Paris, France",
        isFeatured: 1
      },
      {
        id: this.currentActivityId++,
        name: "Guided Hikes",
        description: "Explore breathtaking landscapes with experienced guides.",
        image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 49,
        duration: "Half-day",
        destinationId: 2,
        destinationName: "Kyoto, Japan",
        isFeatured: 1
      },
      {
        id: this.currentActivityId++,
        name: "Snorkeling Tours",
        description: "Discover vibrant marine life in pristine coral reefs.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 65,
        duration: "3 hours",
        destinationId: 3,
        destinationName: "Santorini, Greece",
        isFeatured: 1
      },
      {
        id: this.currentActivityId++,
        name: "Private City Tours",
        description: "Explore hidden gems with knowledgeable local guides.",
        image: "https://images.unsplash.com/photo-1477064996809-dae46985eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 35,
        duration: "2 hours",
        destinationId: 1,
        destinationName: "Paris, France",
        isFeatured: 1
      }
    ];
    
    // Add activities to map
    activities.forEach(activity => this.activities.set(activity.id, activity));
    
    // Seed accommodations
    const accommodations = [
      {
        id: this.currentAccommodationId++,
        name: "The Azure Resort & Spa",
        description: "Luxurious beachfront resort featuring stunning ocean views, world-class spa treatments, and gourmet dining options.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "Jalan Pantai Indah, Bali, Indonesia",
        amenities: ["Infinity Pool", "Spa", "Ocean View", "Restaurant", "Free WiFi"],
        rating: 5.0,
        price: 350,
        destinationId: 3,
        destinationName: "Bali, Indonesia",
        type: "LUXURY",
        isFeatured: 1
      },
      {
        id: this.currentAccommodationId++,
        name: "Maison Lumière Hotel",
        description: "Charming boutique hotel in the heart of Paris, combining classic Parisian elegance with modern amenities just steps away from major attractions.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "15 Rue de Rivoli, Paris, France",
        amenities: ["City Center", "Breakfast", "Rooftop Bar", "Free WiFi"],
        rating: 4.5,
        price: 245,
        destinationId: 1,
        destinationName: "Paris, France",
        type: "BOUTIQUE",
        isFeatured: 1
      }
    ];
    
    // Add accommodations to map
    accommodations.forEach(accommodation => this.accommodations.set(accommodation.id, accommodation));
    
    // Seed reviews
    const reviews = [
      {
        id: this.currentReviewId++,
        author: "Sarah Johnson",
        authorImage: "https://randomuser.me/api/portraits/women/45.jpg",
        rating: 5.0,
        comment: "The Italy tour exceeded all our expectations. Our guide Marco was knowledgeable and passionate. The cooking class in Tuscany was a highlight we'll never forget!",
        tourId: 1,
        tourTitle: "Italian Cuisine & Culture Tour"
      },
      {
        id: this.currentReviewId++,
        author: "David Miller",
        authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5.0,
        comment: "Our safari in Tanzania was the trip of a lifetime. We saw the Big Five within two days! The accommodations were luxurious and the staff went above and beyond.",
        tourId: 2,
        tourTitle: "Tanzania Safari Adventure"
      },
      {
        id: this.currentReviewId++,
        author: "Emily Chen",
        authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 5.0,
        comment: "The tea ceremony and stay at the traditional ryokan in Kyoto were incredible experiences. Our guide Yuki made us feel like locals instead of tourists.",
        tourId: 3,
        tourTitle: "Kyoto Cultural Experience"
      }
    ];
    
    // Add reviews to map
    reviews.forEach(review => this.reviews.set(review.id, review));
  }
}

export const storage = new MemStorage();
