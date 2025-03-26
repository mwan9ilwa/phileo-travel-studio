
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Activity } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

export default function ActivityDetails() {
  const { slug } = useParams();

  const { data, isLoading } = useQuery<{ activity: Activity }>({
    queryKey: [`/api/activities/${slug}`],
  });

  if (isLoading || !data) return <div>Loading...</div>;

  const { activity } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{activity.name}</h1>
          <div className="flex items-center gap-4 mb-4 text-neutral-medium">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{activity.destinationName}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{activity.duration}</span>
            </div>
          </div>
          <div className="prose max-w-none mb-6">
            {activity.description.split('\n\n').map((paragraph, index) => {
              if (paragraph.includes(':')) {
                const [title, items] = paragraph.split(':');
                return (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <ul className="list-disc pl-6">
                      {items.split('\n-').map((item, i) => (
                        item.trim() && <li key={i}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return <p key={index} className="text-lg mb-4">{paragraph}</p>;
            })}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-primary">${activity.price}</span>
              <span className="text-neutral-medium"> / person</span>
            </div>
            <div className="space-x-4">
              <Button 
                onClick={() => {
                  const subject = `Booking Request: ${activity.name}`;
                  const body = `Hi, I'm interested in booking the "${activity.name}" activity.`;
                  window.location.href = `mailto:bookings@youragency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                Book via Email
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const text = `Hi, I'm interested in booking the "${activity.name}" activity.`;
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
