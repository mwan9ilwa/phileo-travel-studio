import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter/use-location";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity } from "../lib/types";

type SearchParams = {
  destination?: string;
  price?: string;
  duration?: string;
};

export default function Activities() {
  const [search, setSearch] = useSearch();
  const searchParams = new URLSearchParams(search);
  const destination = searchParams.get("destination") || "";
  const price = searchParams.get("price") || "";
  const duration = searchParams.get("duration") || "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/activities"],
  });

  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  // Filter activities based on search parameters
  useEffect(() => {
    if (data?.activities) {
      setFilteredActivities(
        data.activities.filter((activity: Activity) => {
          const matchesDestination = !destination || 
            activity.destinationName.toLowerCase().includes(destination.toLowerCase());
          const matchesPrice = !price || 
            (price === "low" && activity.price < 100) ||
            (price === "medium" && activity.price >= 100 && activity.price < 200) ||
            (price === "high" && activity.price >= 200);
          const matchesDuration = !duration || 
            activity.duration.toLowerCase().includes(duration.toLowerCase());
          
          return matchesDestination && matchesPrice && matchesDuration;
        })
      );
    }
  }, [data, destination, price, duration]);

  const updateFilter = (key: string, value: string) => {
    const newParams: SearchParams = {};
    
    // Keep existing params
    if (destination && key !== "destination") newParams.destination = destination;
    if (price && key !== "price") newParams.price = price;
    if (duration && key !== "duration") newParams.duration = duration;
    
    // Add new param
    if (value) newParams[key as keyof SearchParams] = value;
    
    // Create the search string
    const params: SearchParams = {};
    Object.entries(newParams).forEach(([k, v]) => {
      if (v) params[k as keyof SearchParams] = v;
    });
    
    setSearch(params);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Activities</h1>
        <div className="mt-6">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Activities</h1>
        <div className="mt-6 text-red-500">Error loading activities.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Activities</h1>
          <p className="mt-2 text-gray-600">
            Discover amazing activities and experiences around the world
          </p>
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
                  <option value="low">Under $100</option>
                  <option value="medium">$100 - $200</option>
                  <option value="high">$200+</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium">Duration</h4>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  value={duration}
                  onChange={(e) => updateFilter("duration", e.target.value)}
                >
                  <option value="">All Durations</option>
                  <option value="hour">Few Hours</option>
                  <option value="half-day">Half Day</option>
                  <option value="day">Full Day</option>
                </select>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => {
                  setSearch({});
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
              {filteredActivities.length} activities found
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity: Activity) => (
              <Card key={activity.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{activity.name}</h3>
                    <Badge variant="secondary">{activity.duration}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity.destinationName}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-2">
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {activity.description}
                  </p>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="font-bold text-primary">${activity.price}</div>
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