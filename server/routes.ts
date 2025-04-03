import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

// Function to read JSON data from files
const readDataFile = (filename: string) => {
  const filePath = path.join(process.cwd(), 'data', filename);
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for serving data from JSON files
  app.get('/api/homepage', (req, res) => {
    const data = readDataFile('homepage.json');
    if (!data) {
      return res.status(404).json({ message: 'Homepage data not found' });
    }
    res.json(data);
  });

  app.get('/api/about', (req, res) => {
    const data = readDataFile('about.json');
    if (!data) {
      return res.status(404).json({ message: 'About data not found' });
    }
    res.json(data);
  });

  app.get('/api/contact', (req, res) => {
    const data = readDataFile('contact.json');
    if (!data) {
      return res.status(404).json({ message: 'Contact data not found' });
    }
    res.json(data);
  });

  app.get('/api/destinations', (req, res) => {
    const data = readDataFile('destinations.json');
    if (!data) {
      return res.status(404).json({ message: 'Destinations data not found' });
    }
    res.json(data);
  });

  app.get('/api/destinations/:slug', (req, res) => {
    const { slug } = req.params;
    const data = readDataFile('destinations.json');
    if (!data) {
      return res.status(404).json({ message: 'Destinations data not found' });
    }
    
    const destination = data.find((dest: any) => dest.slug === slug);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.json(destination);
  });

  app.get('/api/tours', (req, res) => {
    const data = readDataFile('tours.json');
    if (!data) {
      return res.status(404).json({ message: 'Tours data not found' });
    }
    res.json(data);
  });

  app.get('/api/tours/:slug', (req, res) => {
    const { slug } = req.params;
    const data = readDataFile('tours.json');
    if (!data) {
      return res.status(404).json({ message: 'Tours data not found' });
    }
    
    const tour = data.find((t: any) => t.slug === slug);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json(tour);
  });

  app.get('/api/tours/destination/:destinationSlug', (req, res) => {
    const { destinationSlug } = req.params;
    const data = readDataFile('tours.json');
    if (!data) {
      return res.status(404).json({ message: 'Tours data not found' });
    }
    
    const tours = data.filter((t: any) => t.destination === destinationSlug);
    res.json(tours);
  });

  app.get('/api/activities', (req, res) => {
    const data = readDataFile('activities.json');
    if (!data) {
      return res.status(404).json({ message: 'Activities data not found' });
    }
    res.json(data);
  });

  app.get('/api/activities/:slug', (req, res) => {
    const { slug } = req.params;
    const data = readDataFile('activities.json');
    if (!data) {
      return res.status(404).json({ message: 'Activities data not found' });
    }
    
    const activity = data.find((a: any) => a.slug === slug);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    res.json(activity);
  });

  app.get('/api/activities/destination/:destinationSlug', (req, res) => {
    const { destinationSlug } = req.params;
    const data = readDataFile('destinations.json');
    const activities = readDataFile('activities.json');
    
    if (!data || !activities) {
      return res.status(404).json({ message: 'Data not found' });
    }
    
    const destination = data.find((d: any) => d.slug === destinationSlug);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    const destinationActivities = activities.filter((a: any) => 
      destination.activities.includes(a.slug)
    );
    
    res.json(destinationActivities);
  });

  app.get('/api/accommodations', (req, res) => {
    const data = readDataFile('accommodations.json');
    if (!data) {
      return res.status(404).json({ message: 'Accommodations data not found' });
    }
    res.json(data);
  });

  app.get('/api/accommodations/:slug', (req, res) => {
    const { slug } = req.params;
    const data = readDataFile('accommodations.json');
    if (!data) {
      return res.status(404).json({ message: 'Accommodations data not found' });
    }
    
    const accommodation = data.find((a: any) => a.slug === slug);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    res.json(accommodation);
  });

  app.get('/api/reviews', (req, res) => {
    const data = readDataFile('reviews.json');
    if (!data) {
      return res.status(404).json({ message: 'Reviews data not found' });
    }
    
    // Only return approved reviews by default
    const approvedReviews = data.filter((r: any) => r.isApproved);
    res.json(approvedReviews);
  });

  app.get('/api/reviews/tour/:tourSlug', (req, res) => {
    const { tourSlug } = req.params;
    const data = readDataFile('reviews.json');
    if (!data) {
      return res.status(404).json({ message: 'Reviews data not found' });
    }
    
    const tourReviews = data.filter((r: any) => r.tour === tourSlug && r.isApproved);
    res.json(tourReviews);
  });

  app.get('/api/categories', (req, res) => {
    const data = readDataFile('categories.json');
    if (!data) {
      return res.status(404).json({ message: 'Categories data not found' });
    }
    res.json(data);
  });

  app.get('/api/categories/:slug', (req, res) => {
    const { slug } = req.params;
    const data = readDataFile('categories.json');
    if (!data) {
      return res.status(404).json({ message: 'Categories data not found' });
    }
    
    const category = data.find((c: any) => c.slug === slug);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  });

  // Contact form submission endpoint
  app.post('/api/contact/inquiry', (req, res) => {
    const formData = req.body;
    
    // Here we would typically send an email or store the inquiry in a database
    // For now, just return a success response
    res.json({ 
      success: true, 
      message: 'Thank you for your inquiry! Our travel experts will contact you within 24 hours.' 
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
