import { Link } from 'wouter';
import TourCard from '@/components/cards/TourCard';
import { Tour } from '@/types';

interface FeaturedToursProps {
  title: string;
  description?: string;
  tours: Tour[];
}

const FeaturedTours = ({ 
  title, 
  description = "Explore our most sought-after travel experiences curated by our expert team",
  tours 
}: FeaturedToursProps) => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-3">{title}</h2>
          {description && <p className="text-neutral-600 max-w-2xl mx-auto">{description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/tours" className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-md transition-all">
            Browse All Tours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
