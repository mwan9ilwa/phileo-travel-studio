import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage, initStorage } from "./storage";
import { createStrapiStorage } from "./strapi";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";

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

  // Strapi CMS related endpoints
  apiRouter.post('/strapi/test', async (req: Request, res: Response) => {
    try {
      const { url, token } = req.body;
      
      if (!url || !token) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing Strapi URL or API token' 
        });
      }
      
      try {
        // Test connection to Strapi by fetching destinations
        const response = await axios.get(`${url}/destinations`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // If we get here, the connection was successful
        res.json({ 
          success: true, 
          message: 'Successfully connected to Strapi CMS' 
        });
      } catch (error: any) {
        console.error('Strapi connection test failed:', error.message);
        res.status(400).json({ 
          success: false, 
          message: 'Failed to connect to Strapi CMS. Please check your URL and API token.' 
        });
      }
    } catch (error: any) {
      console.error('Error testing Strapi connection:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while testing the Strapi connection' 
      });
    }
  });

  apiRouter.post('/strapi/config', async (req: Request, res: Response) => {
    try {
      const { url, token } = req.body;
      
      if (!url || !token) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing Strapi URL or API token' 
        });
      }
      
      // Save the Strapi configuration to .env file
      const envPath = path.resolve(process.cwd(), '.env');
      
      let envContent = '';
      
      // Read existing .env file if it exists
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      // Update or add the Strapi configuration
      const strapiUrlRegex = /^STRAPI_API_URL=.*/m;
      const strapiTokenRegex = /^STRAPI_API_TOKEN=.*/m;
      
      if (strapiUrlRegex.test(envContent)) {
        envContent = envContent.replace(strapiUrlRegex, `STRAPI_API_URL=${url}`);
      } else {
        envContent += `\nSTRAPI_API_URL=${url}`;
      }
      
      if (strapiTokenRegex.test(envContent)) {
        envContent = envContent.replace(strapiTokenRegex, `STRAPI_API_TOKEN=${token}`);
      } else {
        envContent += `\nSTRAPI_API_TOKEN=${token}`;
      }
      
      // Add a flag to use Strapi storage
      const useStratpiRegex = /^USE_STRAPI=.*/m;
      if (useStratpiRegex.test(envContent)) {
        envContent = envContent.replace(useStratpiRegex, `USE_STRAPI=true`);
      } else {
        envContent += `\nUSE_STRAPI=true`;
      }
      
      // Write the updated .env file
      fs.writeFileSync(envPath, envContent);
      
      // Switch to Strapi storage
      const strapiStorage = createStrapiStorage(url, token);
      
      res.json({ 
        success: true, 
        message: 'Strapi configuration saved successfully' 
      });
    } catch (error: any) {
      console.error('Error saving Strapi configuration:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while saving the Strapi configuration' 
      });
    }
  });
  
  apiRouter.get('/strapi/status', async (req: Request, res: Response) => {
    try {
      const strapiUrl = process.env.STRAPI_API_URL;
      const strapiToken = process.env.STRAPI_API_TOKEN;
      const useStrapi = process.env.USE_STRAPI === 'true';
      
      res.json({
        configured: !!(strapiUrl && strapiToken),
        url: strapiUrl || '',
        active: useStrapi
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while checking Strapi status' 
      });
    }
  });

  apiRouter.post('/strapi/switch', async (req: Request, res: Response) => {
    try {
      const { useStrapi } = req.body;
      
      if (typeof useStrapi !== 'boolean') {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid useStrapi parameter. Must be true or false.' 
        });
      }
      
      // Update the USE_STRAPI flag in the .env file
      const envPath = path.resolve(process.cwd(), '.env');
      
      if (!fs.existsSync(envPath)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Strapi is not configured yet. Please configure it first.' 
        });
      }
      
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      const useStratpiRegex = /^USE_STRAPI=.*/m;
      if (useStratpiRegex.test(envContent)) {
        envContent = envContent.replace(useStratpiRegex, `USE_STRAPI=${useStrapi}`);
      } else {
        envContent += `\nUSE_STRAPI=${useStrapi}`;
      }
      
      // Write the updated .env file
      fs.writeFileSync(envPath, envContent);
      
      // Reinitialize the storage with the new setting
      initStorage();
      
      res.json({ 
        success: true, 
        message: `Successfully ${useStrapi ? 'enabled' : 'disabled'} Strapi integration` 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while switching storage mode' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
