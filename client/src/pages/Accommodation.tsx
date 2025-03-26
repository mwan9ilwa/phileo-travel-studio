
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Accommodation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

export default function AccommodationDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery<{ accommodation: Accommodation }>({
    queryKey: [`/api/accommodations/${id}`],
  });

  if (isLoading || !data) return <div>Loading...</div>;

  const { accommodation } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={accommodation.image}
          alt={accommodation.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{accommodation.name}</h1>
            <div className="flex items-center">
              {[...Array(Math.floor(Number(accommodation.rating)))].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="flex items-center mb-4 text-neutral-medium">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{accommodation.address}</span>
          </div>
          <p className="text-lg mb-6">{accommodation.description}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {accommodation.amenities.map((amenity, index) => (
                <span key={index} className="bg-neutral-lightest text-neutral-medium px-3 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>
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
