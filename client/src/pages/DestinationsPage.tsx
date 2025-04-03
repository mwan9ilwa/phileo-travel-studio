import { useQuery } from '@tanstack/react-query';
import { destinations } from '@/utils/data';
import DestinationCard from '@/components/cards/DestinationCard';
import ContactCTA from '@/components/sections/ContactCTA';

const DestinationsPage = () => {
  const { data: allDestinations = [] } = useQuery({
    queryKey: ['/destinations'],
    queryFn: () => destinations,
    initialData: destinations,
  });

  return (
    <>
      <section className="relative h-[50vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              Explore Our Destinations
            </h1>
            <p className="text-lg md:text-xl text-neutral-100 mb-8">
              Discover unique travel experiences in our carefully selected destinations around the world
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDestinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Find Your Perfect Destination"
        description="Not sure where to go? Our travel experts can help you choose the perfect destination based on your preferences."
      />
    </>
  );
};

export default DestinationsPage;
