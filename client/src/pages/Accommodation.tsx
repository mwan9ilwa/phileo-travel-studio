
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Accommodation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Pool, Utensils, Coffee } from "lucide-react";

export default function AccommodationDetails() {
  const { slug } = useParams();

  const { data, isLoading } = useQuery<{ accommodations: Accommodation[] }>({
    queryKey: ["/api/accommodations"],
    queryFn: async () => {
      const response = await fetch('/api/accommodations');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  const accommodation = data?.accommodations.find(a => a.slug === slug || a.id.toString() === slug);

  if (!accommodation) {
    return <div className="container mx-auto px-4 py-8">Accommodation not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={accommodation.image}
            alt={accommodation.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full">
            {accommodation.type}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{accommodation.name}</h1>
            <div className="flex items-center">
              {[...Array(Math.floor(Number(accommodation.rating)))].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-neutral-medium">({accommodation.rating}/5)</span>
            </div>
          </div>
          <div className="flex items-center mb-4 text-neutral-medium">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{accommodation.address}</span>
          </div>
          <div className="flex items-center mb-6 text-neutral-medium">
            <span className="text-primary text-2xl font-bold">${accommodation.price}</span>
            <span className="ml-2">per night</span>
          </div>
          <div className="prose max-w-none mb-6">
            <p className="text-lg mb-6">{accommodation.description}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {accommodation.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center bg-neutral-lightest p-3 rounded-lg">
                  {amenity.includes('WiFi') && <Wifi className="w-5 h-5 mr-2 text-primary" />}
                  {amenity.includes('Pool') && <Pool className="w-5 h-5 mr-2 text-primary" />}
                  {amenity.includes('Restaurant') && <Utensils className="w-5 h-5 mr-2 text-primary" />}
                  {amenity.includes('Breakfast') && <Coffee className="w-5 h-5 mr-2 text-primary" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1"
              onClick={() => {
                const subject = `Booking Request: ${accommodation.name}`;
                const body = `Hi, I'm interested in booking "${accommodation.name}" in ${accommodation.destinationName}.`;
                window.location.href = `mailto:bookings@youragency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              Book via Email
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                const text = `Hi, I'm interested in booking "${accommodation.name}" in ${accommodation.destinationName}.`;
                window.location.href = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
              }}
            >
              Book via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
