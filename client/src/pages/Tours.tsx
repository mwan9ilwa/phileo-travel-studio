import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Star, StarHalf, Clock, MapPin, Filter, ChevronDown } from "lucide-react";
import type { Tour, SearchParams } from "@/lib/types";

const ToursPage = () => {
  const [location, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newParams: SearchParams = {};
    
    if (params.has('destination')) newParams.destination = params.get('destination') || undefined;
    if (params.has('continent')) newParams.continent = params.get('continent') || undefined;
    if (params.has('difficulty')) newParams.difficulty = params.get('difficulty') || undefined;
    if (params.has('minPrice')) newParams.minPrice = params.get('minPrice') || undefined;
    if (params.has('maxPrice')) newParams.maxPrice = params.get('maxPrice') || undefined;
    if (params.has('duration')) newParams.duration = params.get('duration') || undefined;
    
    setSearchParams(newParams);
  }, [location]);

  // Fetch all tours
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/tours'],
    staleTime: 60000, // 1 minute
  });

  // Apply filters to tours
  const filteredTours = data?.tours?.filter((tour: Tour) => {
    if (searchParams.destination && tour.destinationId.toString() !== searchParams.destination) return false;
    if (searchParams.continent) {
      // This would typically query destination by continent, but for simplicity we'll skip
      // A full implementation would fetch destinations by continent first
    }
    if (searchParams.difficulty && tour.difficulty !== searchParams.difficulty) return false;
    if (searchParams.minPrice && tour.price < parseInt(searchParams.minPrice)) return false;
    if (searchParams.maxPrice && tour.price > parseInt(searchParams.maxPrice)) return false;
    if (searchParams.duration) {
      const duration = parseInt(searchParams.duration);
      if (duration === 1 && tour.duration > 3) return false;
      if (duration === 2 && (tour.duration <= 3 || tour.duration > 7)) return false;
      if (duration === 3 && (tour.duration <= 7 || tour.duration > 14)) return false;
      if (duration === 4 && tour.duration <= 14) return false;
    }
    return true;
  }) || [];

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newParams: SearchParams = {};
    
    if (formData.get('difficulty')) newParams.difficulty = formData.get('difficulty') as string;
    if (formData.get('minPrice')) newParams.minPrice = formData.get('minPrice') as string;
    if (formData.get('maxPrice')) newParams.maxPrice = formData.get('maxPrice') as string;
    if (formData.get('duration')) newParams.duration = formData.get('duration') as string;
    
    // Preserve existing destination parameter if it exists
    if (searchParams.destination) newParams.destination = searchParams.destination;
    if (searchParams.continent) newParams.continent = searchParams.continent;
    
    // Build query string
    const queryString = Object.entries(newParams)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    setLocation(`/tours${queryString ? '?' + queryString : ''}`);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    // Preserve only destination or continent if available
    const params: SearchParams = {};
    if (searchParams.destination) params.destination = searchParams.destination;
    if (searchParams.continent) params.continent = searchParams.continent;
    
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    setLocation(`/tours${queryString ? '?' + queryString : ''}`);
  };

  useEffect(() => {
    document.title = "Tours | Phileo Travel Studio";
  }, []);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
              {searchParams.continent ? 
                `${searchParams.continent.charAt(0).toUpperCase() + searchParams.continent.slice(1)} Tours` : 
                searchParams.destination ? 
                  'Destination Tours' : 
                  'Explore Our Tours'}
            </h1>
            <p className="text-neutral-medium">Discover extraordinary experiences with our handcrafted tours</p>
          </div>
          <button 
            className="mt-4 md:mt-0 flex items-center bg-neutral-lightest px-4 py-2 rounded-md hover:bg-neutral-light transition"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter Tours
            <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter panel */}
        {isFilterOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleFilterSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select 
                    name="difficulty" 
                    className="w-full border border-neutral-light rounded-md p-2"
                    defaultValue={searchParams.difficulty || ""}
                  >
                    <option value="">Any difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      name="minPrice" 
                      placeholder="Min" 
                      className="border border-neutral-light rounded-md p-2"
                      defaultValue={searchParams.minPrice || ""}
                    />
                    <input 
                      type="number" 
                      name="maxPrice" 
                      placeholder="Max" 
                      className="border border-neutral-light rounded-md p-2"
                      defaultValue={searchParams.maxPrice || ""}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <select 
                    name="duration" 
                    className="w-full border border-neutral-light rounded-md p-2"
                    defaultValue={searchParams.duration || ""}
                  >
                    <option value="">Any duration</option>
                    <option value="1">1-3 days</option>
                    <option value="2">4-7 days</option>
                    <option value="3">8-14 days</option>
                    <option value="4">15+ days</option>
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
        ) : isError ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-2">Unable to load tours</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour: Tour) => (
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
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No tours match your filters</h2>
            <p className="text-neutral-medium mb-6">Try adjusting your filters or browse our full tour collection.</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ToursPage;
