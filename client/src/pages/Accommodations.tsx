import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { Accommodation } from "../lib/types";

export default function Accommodations() {
  const [location, navigate] = useLocation();
  const search = location.includes('?') ? location.split('?')[1] : '';
  const urlParams = new URLSearchParams(search);

  const destination = urlParams.get("destination") || "";
  const price = urlParams.get("price") || "";
  const type = urlParams.get("type") || "";
  const rating = urlParams.get("rating") || "";

  interface AccommodationsResponse {
    accommodations: Accommodation[];
  }

  const { data, isLoading, error } = useQuery<AccommodationsResponse>({
    queryKey: ["/api/accommodations"],
  });

  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);

  // Convert accommodations data to proper array if not already
  useEffect(() => {
    if (data && data.accommodations) {
      const accommodations = data.accommodations;
      setFilteredAccommodations(
        accommodations.filter((accommodation: Accommodation) => {
          const matchesDestination = !destination || 
            accommodation.destinationName.toLowerCase().includes(destination.toLowerCase());
          const matchesPrice = !price || 
            (price === "low" && accommodation.price < 100) ||
            (price === "medium" && accommodation.price >= 100 && accommodation.price < 300) ||
            (price === "high" && accommodation.price >= 300);
          const matchesType = !type || 
            accommodation.type.toLowerCase() === type.toLowerCase();
          const matchesRating = !rating || 
            accommodation.rating >= parseInt(rating);

          return matchesDestination && matchesPrice && matchesType && matchesRating;
        })
      );
    }
  }, [data, destination, price, type, rating]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Navigate to the new URL with the updated parameters
    navigate(`/accommodations?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Accommodations</h1>
        <div className="mt-6">Loading accommodations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Accommodations</h1>
        <div className="mt-6 text-red-500">Error loading accommodations.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Accommodations</h1>
          <div className="mt-6 text-gray-600">
            Find the perfect place to stay during your travels
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const subject = `Accommodation Booking Request`;
                const body = `Hi, I'm interested in booking accommodation for my stay.`;
                window.location.href = `mailto:bookings@youragency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
            >
              Book via Email
            </button>
            <a 
              href={`https://wa.me/1234567890?text=${encodeURIComponent(
                'Hi, I\'m interested in booking accommodation for my stay.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-md transition text-center"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="col-span-1">
          <div className="rounded-lg border p-4 shadow-sm">
            <h3 className="text-lg font-medium">Filters</h3>
            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Destination</h4>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  value={destination}
                  onChange={(e) => updateFilter("destination", e.target.value)}
                >
                  <option value="">All Destinations</option>
                  <option value="paris">Paris</option>
                  <option value="kyoto">Kyoto</option>
                  <option value="santorini">Santorini</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium">Price Range</h4>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  value={price}
                  onChange={(e) => updateFilter("price", e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="low">Under $100/night</option>
                  <option value="medium">$100 - $300/night</option>
                  <option value="high">$300+/night</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium">Accommodation Type</h4>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  value={type}
                  onChange={(e) => updateFilter("type", e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="hotel">Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium">Rating</h4>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  value={rating}
                  onChange={(e) => updateFilter("rating", e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              <Button 
                className="w-full"
                onClick={() => {
                  navigate("/accommodations");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3">
          <div className="mb-4">
            <span className="text-gray-600">
              {filteredAccommodations.length} accommodations found
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAccommodations.map((accommodation: Accommodation) => (
              <Card key={accommodation.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={accommodation.image}
                    alt={accommodation.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white text-black">{accommodation.type}</Badge>
                  </div>
                </div>

                <CardHeader className="p-4 pb-0">
                  <div>
                    <h3 className="font-bold">{accommodation.name}</h3>
                    <div className="text-sm text-gray-500">
                      {accommodation.destinationName}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-2">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < accommodation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      ({accommodation.rating}/5)
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {accommodation.description}
                  </p>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {accommodation.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{accommodation.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div>
                    <span className="font-bold text-primary">${accommodation.price}</span>
                    <span className="text-sm text-gray-500"> / night</span>
                  </div>
                  <Button size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}