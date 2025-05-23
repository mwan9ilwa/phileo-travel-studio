import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API is working' });
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}