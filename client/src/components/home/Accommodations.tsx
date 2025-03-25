import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Accommodation } from "@/lib/types";
import { ChevronRight, Star, MapPin } from "lucide-react";

const AccommodationCard = ({ accommodation }: { accommodation: Accommodation }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col md:flex-row">
      <div className="md:w-2/5 relative">
        <img 
          src={accommodation.image}
          alt={accommodation.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-neutral-darkest/70 text-white text-xs font-bold px-2 py-1 rounded">
          {accommodation.type}
        </div>
      </div>
      <div className="md:w-3/5 p-4">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold font-poppins">{accommodation.name}</h3>
          <div className="ml-auto text-yellow-400 flex">
            {[...Array(Math.floor(accommodation.rating))].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            {accommodation.rating % 1 >= 0.5 && (
              <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 16.277L5.13 20l1.548-7.243L.571 7.573l7.279-.643L12 0l3.149 6.93 7.279.643-5.108 5.184L18.87 20z" clipRule="evenodd" fillRule="evenodd"/>
              </svg>
            )}
          </div>
        </div>
        <p className="text-neutral-medium text-sm mb-2">
          <MapPin className="inline-block mr-1 h-4 w-4 text-primary" /> {accommodation.destinationName}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {accommodation.amenities.map((amenity, index) => (
            <span key={index} className="bg-neutral-lightest text-neutral-medium text-xs px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>
        <p className="text-neutral-medium text-sm mb-4 line-clamp-2">{accommodation.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-neutral-medium text-sm">From</span>
            <span className="text-lg font-bold text-primary ml-1">${accommodation.price}</span>
            <span className="text-neutral-medium text-xs">/night</span>
          </div>
          <Link href={`/accommodations/${accommodation.id}`} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const Accommodations = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/accommodations/featured'],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-2">Recommended Accommodations</h2>
              <p className="text-neutral-medium">Carefully selected places to stay during your journey</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-64 animate-pulse flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-neutral-light"></div>
                <div className="md:w-3/5 p-4">
                  <div className="h-6 bg-neutral-light rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/2 mb-2"></div>
                  <div className="flex gap-2 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-6 bg-neutral-light rounded w-16"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-neutral-light rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-neutral-light rounded w-20"></div>
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
            <h2 className="text-2xl font-bold mb-2">Unable to load accommodations</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  const { accommodations } = data;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold font-playfair mb-2">Recommended Accommodations</h2>
            <p className="text-neutral-medium">Carefully selected places to stay during your journey</p>
          </div>
          <Link href="/accommodations" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
            View all accommodations <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {accommodations.map((accommodation: Accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
