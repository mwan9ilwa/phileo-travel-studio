import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Tour } from "@/lib/types";
import { Star, StarHalf, ChevronRight, Clock, MapPin } from "lucide-react";

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
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
  );
};

const FeaturedTours = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/tours/featured'],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-2">Featured Tours</h2>
              <p className="text-neutral-medium">Handpicked experiences for unforgettable journeys</p>
            </div>
          </div>
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
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-2">Unable to load tours</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  const { tours } = data;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold font-playfair mb-2">Featured Tours</h2>
            <p className="text-neutral-medium">Handpicked experiences for unforgettable journeys</p>
          </div>
          <Link href="/tours" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
            View all tours <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour: Tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
