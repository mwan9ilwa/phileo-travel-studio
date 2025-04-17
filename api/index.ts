import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up your routes - make sure this doesn't try to use vite or static file middleware
const server = registerRoutes(app);

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 3003;
  app.listen(Number(port), () => {
    console.log(`API server listening on port ${port}`);
  });
}