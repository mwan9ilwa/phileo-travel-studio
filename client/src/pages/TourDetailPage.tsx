import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { getTourBySlug, getReviewsByTourSlug, getDestinationBySlug } from '@/utils/data';
import ContactCTA from '@/components/sections/ContactCTA';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { Clock, Calendar, Users, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TourDetailPage = () => {
  const { slug } = useParams();
  
  const { data: tour } = useQuery({
    queryKey: [`/tours/${slug}`],
    queryFn: () => getTourBySlug(slug || ''),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: [`/tours/${slug}/reviews`],
    queryFn: () => getReviewsByTourSlug(slug || ''),
    enabled: !!tour,
  });

  const { data: destination } = useQuery({
    queryKey: [`/destinations/${tour?.destination}`],
    queryFn: () => getDestinationBySlug(tour?.destination || ''),
    enabled: !!tour,
  });

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Tour not found</h1>
        <p className="mt-4">
          <Link href="/tours" className="text-primary hover:underline">
            Return to tours
          </Link>
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      <section className="relative h-[60vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={tour.featuredImage} 
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-end pb-16">
          <div className="max-w-3xl">
            <div className="inline-block bg-secondary text-neutral-800 px-4 py-1 text-sm font-bold rounded-full mb-4">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: tour.currency,
              }).format(tour.price)} per person
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
              {tour.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-white/90">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{tour.duration} {tour.durationUnit}</span>
              </div>
              {destination && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{destination.name}</span>
                </div>
              )}
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>Max {tour.groupSize} people</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-secondary mr-2"></div>
                <span>{tour.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tour.description }} />
                  
                  {tour.highlights.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-display text-2xl font-bold mb-4">Highlights</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="text-primary h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {tour.gallery.length > 0 && (
                    <div className="mt-10">
                      <h3 className="font-display text-2xl font-bold mb-4">Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tour.gallery.map((image, i) => (
                          <div key={i} className="overflow-hidden rounded-lg h-48">
                            <img src={image} alt={`${tour.title} - Image ${i+1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="itinerary">
                  <h3 className="font-display text-2xl font-bold mb-6">Tour Itinerary</h3>
                  <div className="space-y-8">
                    {tour.itinerary.map((item, index) => {
                      if (item.__component === 'tour.itinerary-day') {
                        return (
                          <div key={index} className="border-l-4 border-primary pl-6 pb-8">
                            <div className="flex items-center mb-2">
                              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                {item.day}
                              </div>
                              <h4 className="font-display text-xl font-bold">{item.title}</h4>
                            </div>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-4">What's Included</h3>
                      <div className="prose" dangerouslySetInnerHTML={{ __html: tour.included }} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-4">What's Not Included</h3>
                      <div className="prose" dangerouslySetInnerHTML={{ __html: tour.excluded }} />
                    </div>
                  </div>
                  
                  {tour.departureDates.length > 0 && (
                    <div className="mt-10">
                      <h3 className="font-display text-2xl font-bold mb-4">Departure Dates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tour.departureDates.map((date, index) => (
                          <div key={index} className="border border-neutral-200 rounded-lg p-4 flex items-center">
                            <Calendar className="h-10 w-10 text-primary mr-4" />
                            <div>
                              <p className="font-bold">{formatDate(date.date)}</p>
                              <div className="flex justify-between text-sm text-neutral-600">
                                <span>{date.time}</span>
                                <span>{date.availableSeats} seats left</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="reviews">
                  <h3 className="font-display text-2xl font-bold mb-6">Customer Reviews</h3>
                  
                  {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {reviews.map((review) => (
                        <TestimonialCard key={review.id} testimonial={review} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-600">No reviews yet for this tour.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg shadow-md sticky top-6">
                <h3 className="font-display text-xl font-bold mb-4 pb-4 border-b border-neutral-200">Book This Tour</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-bold text-primary">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: tour.currency,
                      }).format(tour.price)} per person
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{tour.duration} {tour.durationUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Group Size:</span>
                    <span>Up to {tour.groupSize} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Difficulty:</span>
                    <span>{tour.difficulty}</span>
                  </div>
                </div>
                
                <a href={tour.bookingLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-primary mb-4" size="lg">
                    Book Now
                  </Button>
                </a>
                
                <Link href="/contact">
                  <Button variant="outline" className="w-full" size="lg">
                    Inquire for Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Need help with this tour?"
        description="Contact our travel experts to customize this tour to your preferences or to answer any questions you might have."
      />
    </>
  );
};

export default TourDetailPage;
