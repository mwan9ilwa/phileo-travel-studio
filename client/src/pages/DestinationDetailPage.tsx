import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { getDestinationBySlug, getToursByDestination, getActivitiesByDestination } from '@/utils/data';
import TourCard from '@/components/cards/TourCard';
import ContactCTA from '@/components/sections/ContactCTA';
import { MapPin } from 'lucide-react';

const DestinationDetailPage = () => {
  const { slug } = useParams();
  
  const { data: destination } = useQuery({
    queryKey: [`/destinations/${slug}`],
    queryFn: () => getDestinationBySlug(slug || ''),
  });

  const { data: relatedTours = [] } = useQuery({
    queryKey: [`/destinations/${slug}/tours`],
    queryFn: () => getToursByDestination(slug || ''),
    enabled: !!destination,
  });

  const { data: activities = [] } = useQuery({
    queryKey: [`/destinations/${slug}/activities`],
    queryFn: () => getActivitiesByDestination(slug || ''),
    enabled: !!destination,
  });

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Destination not found</h1>
        <p className="mt-4">
          <Link href="/destinations" className="text-primary hover:underline">
            Return to destinations
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-[60vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-end pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center text-white/80 mb-2">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{destination.location.latitude.toFixed(6)}, {destination.location.longitude.toFixed(6)}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: destination.description }} />
            
            {destination.sections.map((section, index) => {
              if (section.__component === 'destination.text-section') {
                return (
                  <div key={index} className="mt-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-800 mb-4">{section.title}</h2>
                    <div className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </div>
                );
              }
              return null;
            })}
            
            {destination.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-800 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.gallery.map((image, i) => (
                    <div key={i} className="overflow-hidden rounded-lg h-64">
                      <img src={image} alt={`${destination.name} - Image ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedTours.length > 0 && (
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-neutral-800 mb-6 text-center">
              Available Tours in {destination.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {relatedTours.map(tour => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {activities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-neutral-800 mb-6 text-center">
              Popular Activities in {destination.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {activities.map(activity => (
                <div key={activity.slug} className="bg-neutral-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                  <Link href={`/activities/${activity.slug}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/activities/${activity.slug}`}>
                      <h3 className="font-display text-xl font-bold mb-2 hover:text-primary transition-colors duration-300">{activity.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-neutral-600">{activity.duration}</span>
                      <span className="font-bold text-primary">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: activity.currency,
                        }).format(activity.price)}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm line-clamp-3">
                      {activity.description.replace(/<[^>]*>/g, '')}
                    </p>
                    <div className="mt-4">
                      <Link 
                        href={`/activities/${activity.slug}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        title={`Ready to explore ${destination.name}?`}
        description="Let our travel experts help you plan the perfect trip to this amazing destination."
      />
    </>
  );
};

export default DestinationDetailPage;
