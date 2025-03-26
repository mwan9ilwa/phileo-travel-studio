import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Accommodation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Waves, Utensils, Coffee } from "lucide-react";

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

  // Available amenities with their corresponding icons
  const amenitiesIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    pool: <Waves className="w-5 h-5" />,
    restaurant: <Utensils className="w-5 h-5" />,
    breakfast: <Coffee className="w-5 h-5" />
  };

  // Mock amenities for display - in a real app you'd get these from your data
  const amenities = ["wifi", "pool", "restaurant", "breakfast"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={accommodation.image}
          alt={accommodation.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{accommodation.name}</h1>
          <div className="flex items-center gap-4 mb-4 text-neutral-medium">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{accommodation.destinationName}</span>
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Star 
                  key={starNum}
                  className={`w-5 h-5 ${starNum <= accommodation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2">{accommodation.rating}/5</span>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-lg mb-4">{accommodation.description}</p>

            <h3 className="font-bold text-xl mb-2">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 p-3 border rounded-md">
                  {amenitiesIcons[amenity]}
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-xl mb-2">Details</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Room type: {accommodation.type || "Standard"}</li>
              <li>Max occupancy: {accommodation.maxOccupancy || 2} guests</li>
              <li>Size: {accommodation.size || "30m²"}</li>
              <li>Check-in: {accommodation.checkIn || "2:00 PM"}</li>
              <li>Check-out: {accommodation.checkOut || "11:00 AM"}</li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-primary">${accommodation.price}</span>
              <span className="text-neutral-medium"> / night</span>
            </div>
            <div className="space-x-4">
              <Button 
                onClick={() => {
                  const subject = `Booking Request: ${accommodation.name}`;
                  const body = `Hi, I'm interested in booking a stay at "${accommodation.name}".`;
                  window.location.href = `mailto:bookings@youragency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                Book via Email
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const text = `Hi, I'm interested in booking a stay at "${accommodation.name}".`;
                  window.location.href = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
                }}
              >
                Book via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}