import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const { name, slug, description, image } = destination;
  
  // Extract a short description from the HTML description
  const shortDescription = description
    .replace(/<[^>]*>/g, '')
    .slice(0, 60)
    .trim() + (description.length > 60 ? '...' : '');

  return (
    <Link href={`/destinations/${slug}`}>
      <div className="destination-card group rounded-lg overflow-hidden shadow-lg bg-white relative h-80 cursor-pointer">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>
        <div className="destination-overlay absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent opacity-70 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-6 z-10">
          <h3 className="font-display text-white text-2xl font-bold mb-1">{name}</h3>
          <p className="text-white text-sm opacity-90">{shortDescription}</p>
          <span className="mt-3 inline-block text-neutral-100 hover:text-secondary text-sm font-medium">
            Explore <ArrowRight className="inline-block h-4 w-4 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
