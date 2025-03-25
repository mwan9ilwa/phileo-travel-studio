import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  app.use('/api', apiRouter);
  
  // Destinations routes
  apiRouter.get('/destinations', async (req: Request, res: Response) => {
    try {
      const destinations = await storage.getDestinations();
      res.json({ destinations });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch destinations', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/destinations/featured', async (req: Request, res: Response) => {
    try {
      const featuredDestinations = await storage.getFeaturedDestinations();
      res.json({ destinations: featuredDestinations });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured destinations', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/destinations/:slug', async (req: Request, res: Response) => {
    try {
      const destination = await storage.getDestinationBySlug(req.params.slug);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.json({ destination });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch destination', error: (error as Error).message });
    }
  });
  
  // Tours routes
  apiRouter.get('/tours', async (req: Request, res: Response) => {
    try {
      const tours = await storage.getTours();
      res.json({ tours });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tours', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/tours/featured', async (req: Request, res: Response) => {
    try {
      const featuredTours = await storage.getFeaturedTours();
      res.json({ tours: featuredTours });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured tours', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/tours/:slug', async (req: Request, res: Response) => {
    try {
      const tour = await storage.getTourBySlug(req.params.slug);
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json({ tour });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tour', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/destinations/:id/tours', async (req: Request, res: Response) => {
    try {
      const destinationId = parseInt(req.params.id);
      const tours = await storage.getToursByDestination(destinationId);
      res.json({ tours });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tours for destination', error: (error as Error).message });
    }
  });
  
  // Activities routes
  apiRouter.get('/activities', async (req: Request, res: Response) => {
    try {
      const activities = await storage.getActivities();
      res.json({ activities });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch activities', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/activities/featured', async (req: Request, res: Response) => {
    try {
      const featuredActivities = await storage.getFeaturedActivities();
      res.json({ activities: featuredActivities });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured activities', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/destinations/:id/activities', async (req: Request, res: Response) => {
    try {
      const destinationId = parseInt(req.params.id);
      const activities = await storage.getActivitiesByDestination(destinationId);
      res.json({ activities });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch activities for destination', error: (error as Error).message });
    }
  });
  
  // Accommodations routes
  apiRouter.get('/accommodations', async (req: Request, res: Response) => {
    try {
      const accommodations = await storage.getAccommodations();
      res.json({ accommodations });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch accommodations', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/accommodations/featured', async (req: Request, res: Response) => {
    try {
      const featuredAccommodations = await storage.getFeaturedAccommodations();
      res.json({ accommodations: featuredAccommodations });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured accommodations', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/destinations/:id/accommodations', async (req: Request, res: Response) => {
    try {
      const destinationId = parseInt(req.params.id);
      const accommodations = await storage.getAccommodationsByDestination(destinationId);
      res.json({ accommodations });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch accommodations for destination', error: (error as Error).message });
    }
  });
  
  // Reviews routes
  apiRouter.get('/reviews', async (req: Request, res: Response) => {
    try {
      const reviews = await storage.getReviews();
      res.json({ reviews });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews', error: (error as Error).message });
    }
  });
  
  apiRouter.get('/tours/:id/reviews', async (req: Request, res: Response) => {
    try {
      const tourId = parseInt(req.params.id);
      const reviews = await storage.getReviewsByTour(tourId);
      res.json({ reviews });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews for tour', error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
