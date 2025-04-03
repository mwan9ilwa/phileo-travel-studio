import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { activities, destinations } from '@/utils/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ActivityCard from '@/components/cards/ActivityCard';
import ContactCTA from '@/components/sections/ContactCTA';
import { Search } from 'lucide-react';

const ActivitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all-destinations');
  const [priceRange, setPriceRange] = useState('all-prices');

  // Price ranges for filtering
  const priceRanges = [
    { label: 'All Prices', value: 'all-prices' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200-999999' }
  ];

  const { data: allActivities = [] } = useQuery({
    queryKey: ['/activities'],
    queryFn: () => activities,
    initialData: activities,
  });

  const { data: allDestinations = [] } = useQuery({
    queryKey: ['/destinations'],
    queryFn: () => destinations,
    initialData: destinations,
  });

  const filteredActivities = allActivities.filter(activity => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Destination filter (we don't have direct destination in activity, so this would need to be expanded)
    const matchesDestination = selectedDestination === 'all-destinations';
    
    // Price filter
    let matchesPrice = priceRange === 'all-prices';
    if (!matchesPrice) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      matchesPrice = activity.price >= minPrice && activity.price <= maxPrice;
    }
    
    return matchesSearch && matchesDestination && matchesPrice;
  });

  return (
    <>
      <section className="relative h-[50vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80" 
            alt="Activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              Discover Amazing Activities
            </h1>
            <p className="text-lg md:text-xl text-neutral-100 mb-8">
              Explore unique experiences that will make your journey unforgettable
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-neutral-50 p-6 rounded-lg shadow-md mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-destinations">All Destinations</SelectItem>
                  {allDestinations.map(destination => (
                    <SelectItem key={destination.slug} value={destination.slug}>{destination.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Price Ranges" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.slug} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-display font-bold mb-4">No activities found</h3>
              <p className="text-neutral-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      <ContactCTA
        title="Need help finding the perfect activity?"
        description="Our travel experts are ready to assist you in picking the best activities for your adventure. Get in touch with us today!"
      />
    </>
  );
};

export default ActivitiesPage;