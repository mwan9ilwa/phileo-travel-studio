import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tours, destinations, categories } from '@/utils/data';
import TourCard from '@/components/cards/TourCard';
import ContactCTA from '@/components/sections/ContactCTA';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all-destinations');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');

  const { data: allTours = [] } = useQuery({
    queryKey: ['/tours'],
    queryFn: () => tours,
    initialData: tours,
  });

  const { data: allDestinations = [] } = useQuery({
    queryKey: ['/destinations'],
    queryFn: () => destinations,
    initialData: destinations,
  });

  const { data: allCategories = [] } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => categories,
    initialData: categories,
  });

  const filteredTours = allTours.filter(tour => {
    const matchesSearch = searchTerm === '' || 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDestination = selectedDestination === 'all-destinations' || tour.destination === selectedDestination;
    
    // Note: Tour categories are not in the data model, so this is a placeholder
    const matchesCategory = selectedCategory === 'all-categories';
    
    return matchesSearch && matchesDestination && matchesCategory;
  });

  return (
    <>
      <section className="relative h-[50vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Tours"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              Find Your Perfect Tour
            </h1>
            <p className="text-lg md:text-xl text-neutral-100 mb-8">
              Discover our curated selection of unforgettable travel experiences
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
                  placeholder="Search tours..."
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
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category.slug} value={category.slug}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-display font-bold mb-4">No tours found</h3>
              <p className="text-neutral-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      <ContactCTA
        title="Need help finding the right tour?"
        description="Our travel experts are here to help you plan your perfect journey. Let us know your preferences and we'll suggest the best options for you."
      />
    </>
  );
};

export default ToursPage;
