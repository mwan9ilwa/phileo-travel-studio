import { Link } from 'wouter';
import DestinationCard from '@/components/cards/DestinationCard';
import { Destination } from '@/types';

interface FeaturedDestinationsProps {
  title: string;
  description?: string;
  destinations: Destination[];
}

const FeaturedDestinations = ({ 
  title, 
  description = "Explore our hand-picked destinations offering unforgettable experiences and adventures",
  destinations 
}: FeaturedDestinationsProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-3">{title}</h2>
          {description && <p className="text-neutral-600 max-w-2xl mx-auto">{description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/destinations" className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-md transition-all">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
