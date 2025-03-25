import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Activity } from "@/lib/types";
import { ChevronRight } from "lucide-react";

const ActivityCard = ({ activity }: { activity: Activity }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group">
      <div className="relative h-48">
        <img 
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-neutral-darkest/80 to-transparent">
          <h3 className="text-white font-bold">{activity.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-neutral-medium text-sm mb-3">{activity.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">From ${activity.price}</span>
          <span className="text-neutral-medium text-sm">{activity.duration}</span>
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/activities/featured'],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-2">Popular Activities</h2>
              <p className="text-neutral-medium">Unforgettable experiences to enhance your journey</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-64 animate-pulse">
                <div className="h-48 bg-neutral-light"></div>
                <div className="p-4">
                  <div className="h-4 bg-neutral-light rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-2">Unable to load activities</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  const { activities } = data;

  return (
    <section className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold font-playfair mb-2">Popular Activities</h2>
            <p className="text-neutral-medium">Unforgettable experiences to enhance your journey</p>
          </div>
          <Link href="/activities" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
            Browse all activities <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity: Activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
