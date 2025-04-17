import fs from 'fs';
import path from 'path';

export function readDataFile(filename: string) {
  try {
    const dataPath = path.resolve(process.cwd(), 'data', filename);
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}