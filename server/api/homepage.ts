import { VercelRequest, VercelResponse } from '@vercel/node';
import { readDataFile } from '../utils';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const data = readDataFile('homepage.json');
  if (!data) {
    return res.status(404).json({ message: 'Homepage data not found' });
  }
  
  return res.status(200).json(data);
}