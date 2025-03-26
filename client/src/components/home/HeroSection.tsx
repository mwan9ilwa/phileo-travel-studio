import { useState } from 'react';
import { useLocation } from 'wouter';

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState({
    destination: "",
    date: "",
    travelers: "1"
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (searchParams.destination) {
      queryParams.set('continent', searchParams.destination);
    }

    if (searchParams.date) {
      queryParams.set('date', searchParams.date);
    }

    if (searchParams.travelers) {
      queryParams.set('travelers', searchParams.travelers);
    }

    setLocation(`/tours?${queryParams.toString()}`);
  };

  return (
    <section className="relative h-[85vh] md:h-[80vh]">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80" 
          alt="Stunning coastal view of Santorini, Greece with white buildings and blue domes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-darkest/20 to-neutral-darkest/70"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-playfair max-w-lg">
          Discover the World's Breathtaking Destinations
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-lg">
          Explore handcrafted tours to extraordinary places with experienced guides and authentic experiences.
        </p>
        
        {/* Search form */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSearchSubmit}>
            <div className="flex flex-col">
              <label htmlFor="destination" className="text-neutral-dark text-sm font-medium mb-1">Where</label>
              <select 
                id="destination" 
                name="destination"
                value={searchParams.destination} 
                onChange={handleSearchChange}
                className="border border-neutral-light rounded-md p-2 text-neutral-darkest"
              >
                <option value="">Any destination</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="namerica">North America</option>
                <option value="samerica">South America</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-neutral-dark text-sm font-medium mb-1">When</label>
              <input 
                type="date" 
                id="date" 
                name="date"
                value={searchParams.date}
                onChange={handleSearchChange}
                className="border border-neutral-light rounded-md p-2 text-neutral-darkest"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="travelers" className="text-neutral-dark text-sm font-medium mb-1">Travelers</label>
              <select 
                id="travelers" 
                name="travelers"
                value={searchParams.travelers}
                onChange={handleSearchChange}
                className="border border-neutral-light rounded-md p-2 text-neutral-darkest"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-primary-dark transition font-medium">
                <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;