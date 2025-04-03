import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { getActivityBySlug, getToursByDestination } from '@/utils/data';
import TourCard from '@/components/cards/TourCard';
import ContactCTA from '@/components/sections/ContactCTA';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Map, Tag, Calendar, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotFound from './not-found';

const ActivityDetailPage = () => {
  // Get the slug from the URL
  const [, params] = useRoute<{ slug: string }>('/activities/:slug');
  const slug = params?.slug;

  // Get activity data
  const { data: activity } = useQuery({
    queryKey: ['/activities', slug],
    queryFn: () => getActivityBySlug(slug!),
    enabled: !!slug,
  });

  // If activity doesn't exist, show 404
  if (!activity) {
    return <NotFound />;
  }

  // Format price with currency symbol
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: activity.currency,
    minimumFractionDigits: 0,
  }).format(activity.price);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={activity.image} 
            alt={activity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-neutral-900/20"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-end pb-12">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              {activity.name}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-primary/90 hover:bg-primary text-white px-3 py-1 text-sm rounded-full">
                <Clock className="w-4 h-4 mr-1" /> {activity.duration}
              </Badge>
              <Badge className="bg-primary/90 hover:bg-primary text-white px-3 py-1 text-sm rounded-full">
                <Tag className="w-4 h-4 mr-1" /> {formattedPrice}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Details Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content - Description */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="mb-6 w-full justify-start">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-0">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-display font-bold mb-4">About This Activity</h2>
                    <p className="text-neutral-800">{activity.description}</p>
                    
                    <h3 className="text-xl font-display font-bold mt-8 mb-4">What to Expect</h3>
                    <ul className="space-y-2">
                      <li>Professional guides who are experts in their field</li>
                      <li>Small group sizes for a personalized experience</li>
                      <li>All necessary equipment included</li>
                      <li>Unforgettable memories and experiences</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="mt-0">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-display font-bold mb-4">Location Information</h2>
                    <div className="bg-neutral-100 p-4 rounded-lg mb-6 flex items-start">
                      <Map className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Coordinates</h3>
                        <p>Latitude: {activity.location.latitude}, Longitude: {activity.location.longitude}</p>
                      </div>
                    </div>
                    
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      {/* Here you would integrate Google Maps if available */}
                      <div className="bg-neutral-200 h-full w-full flex items-center justify-center text-neutral-600">
                        <Info className="mr-2" /> Interactive map would be displayed here
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar - Booking and Info */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-display font-bold mb-4">Book This Activity</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-primary" />
                  <span className="text-sm text-neutral-700">Available year-round</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-600">Price per person:</span>
                    <span className="font-bold text-lg">{formattedPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-neutral-600">Duration:</span>
                    <span>{activity.duration}</span>
                  </div>
                </div>
                
                <Button className="w-full mb-3" size="lg">
                  Book Now
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  Inquire About Availability
                </Button>
                
                <div className="mt-6 text-sm text-neutral-600">
                  <p className="mb-2"><strong>Free cancellation</strong> up to 24 hours before the activity</p>
                  <p><strong>Instant confirmation</strong> when you book</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">Related Tours You Might Like</h2>
          
          {/* Display some related tours (for now, we'll show a few random tours) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getToursByDestination(activity.location.latitude.toString()).slice(0, 3).map(tour => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
            {getToursByDestination(activity.location.latitude.toString()).length === 0 && (
              <div className="text-center col-span-full py-6">
                <p className="text-neutral-600">Discover our tours featuring this activity</p>
                <Button asChild className="mt-4">
                  <Link href="/tours">Browse All Tours</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Need help planning your trip?"
        description="Our travel experts are ready to help you create the perfect itinerary with this activity and more."
      />
    </>
  );
};

export default ActivityDetailPage;