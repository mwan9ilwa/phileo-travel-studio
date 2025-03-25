import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Star, StarHalf, ChevronRight } from "lucide-react";
import { Destination } from "@/lib/types";

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-darkest/80 to-transparent">
          <h3 className="text-xl font-bold text-white font-playfair">{destination.name}</h3>
          <p className="text-white/90 text-sm">{destination.tourCount} tours available</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="text-yellow-400 flex">
            {[...Array(Math.floor(destination.rating))].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            {destination.rating % 1 >= 0.5 && <StarHalf className="h-4 w-4 fill-current" />}
          </div>
          <span className="ml-1 text-sm text-neutral-medium">
            {destination.rating.toFixed(1)} ({destination.reviewCount} reviews)
          </span>
        </div>
        <p className="text-neutral-medium mb-4 line-clamp-2">{destination.description}</p>
        <Link href={`/destinations/${destination.slug}`} className="text-primary font-medium hover:underline inline-flex items-center">
          Explore destination <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedDestinations = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/destinations/featured'],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-2">Popular Destinations</h2>
              <p className="text-neutral-medium">Explore our most sought-after travel locations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-96 animate-pulse">
                <div className="h-64 bg-neutral-light"></div>
                <div className="p-4">
                  <div className="h-4 bg-neutral-light rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-2">Unable to load destinations</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  const { destinations } = data;

  return (
    <section className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold font-playfair mb-2">Popular Destinations</h2>
            <p className="text-neutral-medium">Explore our most sought-after travel locations</p>
          </div>
          <Link href="/destinations" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
            View all destinations <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination: Destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
