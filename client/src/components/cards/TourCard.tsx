import { Link } from 'wouter';
import { Clock, MapPin } from 'lucide-react';
import { Tour } from '@/types';

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  const { 
    title, 
    slug, 
    shortDescription, 
    price, 
    currency, 
    duration, 
    durationUnit, 
    destination, 
    featuredImage 
  } = tour;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  return (
    <div className="tour-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <div className="overflow-hidden h-56">
        <img 
          src={featuredImage} 
          alt={title} 
          className="tour-image w-full h-full object-cover transition-all duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-xl font-bold text-neutral-800">{title}</h3>
          <span className="bg-secondary text-neutral-800 px-3 py-1 text-xs font-bold rounded-full">
            {formattedPrice}
          </span>
        </div>
        <div className="flex items-center text-sm text-neutral-500 mb-3">
          <span className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration} {durationUnit}</span>
          </span>
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{destination}</span>
          </span>
        </div>
        <p className="text-neutral-600 text-sm mb-4">
          {shortDescription}
        </p>
        <Link href={`/tours/${slug}`} className="block text-center bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-all">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
