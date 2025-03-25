import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Star, StarHalf, MapPin, ChevronRight, Filter, ChevronDown } from "lucide-react";
import type { Destination, SearchParams } from "@/lib/types";

const DestinationsPage = () => {
  const [location, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newParams: SearchParams = {};
    
    if (params.has('continent')) newParams.continent = params.get('continent') || undefined;
    
    setSearchParams(newParams);
  }, [location]);

  // Fetch all destinations
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/destinations'],
    staleTime: 60000, // 1 minute
  });

  // Apply filters to destinations
  const filteredDestinations = data?.destinations?.filter((destination: Destination) => {
    if (searchParams.continent && destination.continent.toLowerCase() !== searchParams.continent.toLowerCase()) {
      return false;
    }
    return true;
  }) || [];

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newParams: SearchParams = {};
    
    if (formData.get('continent')) newParams.continent = formData.get('continent') as string;
    
    // Build query string
    const queryString = Object.entries(newParams)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    setLocation(`/destinations${queryString ? '?' + queryString : ''}`);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setLocation('/destinations');
  };

  useEffect(() => {
    document.title = "Destinations | Voyageur";
  }, []);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
              {searchParams.continent ? 
                `${searchParams.continent.charAt(0).toUpperCase() + searchParams.continent.slice(1)} Destinations` : 
                'Explore Our Destinations'}
            </h1>
            <p className="text-neutral-medium">Discover amazing places around the world</p>
          </div>
          <button 
            className="mt-4 md:mt-0 flex items-center bg-neutral-lightest px-4 py-2 rounded-md hover:bg-neutral-light transition"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
            <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter panel */}
        {isFilterOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleFilterSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Continent</label>
                  <select 
                    name="continent" 
                    className="w-full border border-neutral-light rounded-md p-2"
                    defaultValue={searchParams.continent || ""}
                  >
                    <option value="">All continents</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                    <option value="north-america">North America</option>
                    <option value="south-america">South America</option>
                    <option value="oceania">Australia & Oceania</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button type="submit" className="flex-1 btn-primary">
                    Apply Filters
                  </button>
                  <button type="button" onClick={clearFilters} className="btn-secondary">
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
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
        ) : isError ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-2">Unable to load destinations</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination: Destination) => (
              <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
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
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No destinations match your filters</h2>
            <p className="text-neutral-medium mb-6">Try adjusting your filters or browse our full destination collection.</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default DestinationsPage;
