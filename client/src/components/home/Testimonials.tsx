import { useQuery } from "@tanstack/react-query";
import { Review } from "@/lib/types";
import { Star } from "lucide-react";

const TestimonialCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-yellow-400 flex mb-4">
        {[...Array(Math.floor(review.rating))].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-neutral-medium mb-4 italic">"{review.comment}"</p>
      <div className="flex items-center">
        <img src={review.authorImage} alt={review.author} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h4 className="font-bold">{review.author}</h4>
          <p className="text-neutral-medium text-sm">{review.tourTitle}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/reviews'],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-playfair mb-2">What Our Travelers Say</h2>
            <p className="text-neutral-medium max-w-lg mx-auto">Hear from customers who have experienced our tours and services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 mr-1 bg-neutral-light rounded-full"></div>
                  ))}
                </div>
                <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-light rounded w-3/4 mb-4"></div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-light mr-3"></div>
                  <div>
                    <div className="h-4 bg-neutral-light rounded w-24 mb-1"></div>
                    <div className="h-3 bg-neutral-light rounded w-32"></div>
                  </div>
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
            <h2 className="text-2xl font-bold mb-2">Unable to load testimonials</h2>
            <p className="text-neutral-medium">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  const { reviews } = data;

  return (
    <section className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-playfair mb-2">What Our Travelers Say</h2>
          <p className="text-neutral-medium max-w-lg mx-auto">Hear from customers who have experienced our tours and services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review: Review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
