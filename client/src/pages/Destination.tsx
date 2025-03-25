import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Star, StarHalf, Calendar, Users, Clock, ChevronRight, MapPin } from "lucide-react";
import { Tour, Activity, Accommodation } from "@/lib/types";
import { useEffect } from "react";

const Destination = () => {
  const { slug } = useParams();
  
  const { data: destinationData, isLoading: isLoadingDestination, isError: isErrorDestination } = 
    useQuery({
      queryKey: [`/api/destinations/${slug}`],
      staleTime: 60000,
    });

  const { data: toursData, isLoading: isLoadingTours } = 
    useQuery({
      queryKey: [`/api/destinations/${destinationData?.destination?.id}/tours`],
      staleTime: 60000,
      enabled: !!destinationData?.destination?.id,
    });

  const { data: activitiesData, isLoading: isLoadingActivities } = 
    useQuery({
      queryKey: [`/api/destinations/${destinationData?.destination?.id}/activities`],
      staleTime: 60000,
      enabled: !!destinationData?.destination?.id,
    });
  
  const { data: accommodationsData, isLoading: isLoadingAccommodations } = 
    useQuery({
      queryKey: [`/api/destinations/${destinationData?.destination?.id}/accommodations`],
      staleTime: 60000,
      enabled: !!destinationData?.destination?.id,
    });

  useEffect(() => {
    if (destinationData?.destination) {
      document.title = `${destinationData.destination.name} | Voyageur`;
    }
  }, [destinationData]);

  if (isLoadingDestination) {
    return (
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-light rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-neutral-light rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="h-48 bg-neutral-light rounded"></div>
              <div className="h-48 bg-neutral-light rounded"></div>
              <div className="h-48 bg-neutral-light rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isErrorDestination || !destinationData?.destination) {
    return (
      <main className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the destination you're looking for.</p>
          <Link href="/destinations" className="btn-primary">
            Browse All Destinations
          </Link>
        </div>
      </main>
    );
  }

  const { destination } = destinationData;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-darkest/20 to-neutral-darkest/70"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-playfair">
            {destination.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="text-yellow-400 flex mr-2">
              {[...Array(Math.floor(destination.rating))].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              {destination.rating % 1 >= 0.5 && <StarHalf className="h-5 w-5 fill-current" />}
            </div>
            <span>{destination.rating.toFixed(1)} ({destination.reviewCount} reviews)</span>
          </div>
          <p className="text-lg md:text-xl max-w-2xl">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-2">Available Tours</h2>
              <p className="text-neutral-medium">Explore {destination.name} with our guided tours</p>
            </div>
            <Link href={`/tours?destination=${destination.id}`} className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
              View all tours <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {isLoadingTours ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-80 animate-pulse">
                  <div className="h-48 bg-neutral-light"></div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-light rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-neutral-light rounded w-20"></div>
                      <div className="h-8 bg-neutral-light rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : toursData?.tours && toursData.tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toursData.tours.map((tour: Tour) => (
                <div key={tour.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="relative">
                    <img 
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-48 object-cover"
                    />
                    {tour.tag && (
                      <div className="absolute top-4 left-4 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
                        {tour.tag}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 text-neutral-darkest text-sm font-bold px-2 py-1 rounded-full">
                      <Clock className="inline-block mr-1 h-4 w-4 text-primary" /> {tour.duration} Days
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-sm mb-2">
                      <span className="text-neutral-medium">
                        <MapPin className="inline-block mr-1 h-4 w-4 text-primary" /> {tour.destinationName}
                      </span>
                      <span className="mx-2 text-neutral-light">|</span>
                      <div className="text-yellow-400 flex">
                        {[...Array(Math.floor(tour.rating))].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                        {tour.rating % 1 >= 0.5 && <StarHalf className="h-3 w-3 fill-current" />}
                      </div>
                      <span className="ml-1 text-sm text-neutral-medium">{tour.rating.toFixed(1)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-poppins">{tour.title}</h3>
                    <p className="text-neutral-medium mb-4 text-sm line-clamp-2">{tour.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-neutral-medium text-sm">From</span>
                        <span className="text-lg font-bold text-primary ml-1">${tour.price.toFixed(0)}</span>
                      </div>
                      <Link href={`/tours/${tour.slug}`} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition text-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-neutral-lightest rounded-lg">
              <h3 className="text-xl font-bold mb-2">No Tours Available</h3>
              <p className="text-neutral-medium mb-4">We're currently working on adding tours for this destination.</p>
              <Link href="/tours" className="text-primary font-medium hover:underline">
                Browse other tours
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-2">Things to Do</h2>
              <p className="text-neutral-medium">Popular activities in {destination.name}</p>
            </div>
          </div>

          {isLoadingActivities ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-64 animate-pulse">
                  <div className="h-48 bg-neutral-light"></div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-light rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activitiesData?.activities && activitiesData.activities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activitiesData.activities.map((activity: Activity) => (
                <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group">
                  <div className="relative h-48">
                    <img 
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-neutral-darkest/80 to-transparent">
                      <h3 className="text-white font-bold">{activity.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-neutral-medium text-sm mb-3">{activity.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">From ${activity.price}</span>
                      <span className="text-neutral-medium text-sm">{activity.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-2">No Activities Available</h3>
              <p className="text-neutral-medium">We're currently working on adding activities for this destination.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Ready to Explore {destination.name}?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            Start planning your dream vacation today. Browse our tours and activities, or contact us for a customized experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn-white">
              Contact Us
            </Link>
            <Link href={`/tours?destination=${destination.id}`} className="btn-outline-white">
              Browse Tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Destination;
