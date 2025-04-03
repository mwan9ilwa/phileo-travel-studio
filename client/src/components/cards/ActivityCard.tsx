import { Link } from 'wouter';
import { Activity } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const { slug, name, image, description, price, currency, duration } = activity;
  
  // Format price with currency symbol
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-xl">
          <Link href={`/activities/${slug}`} className="hover:text-primary">
            {name}
          </Link>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1 text-primary" />
            <span>{formattedPrice}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <CardDescription className="line-clamp-3 text-neutral-700">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/activities/${slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;