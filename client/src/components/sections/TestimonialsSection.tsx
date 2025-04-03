import { Link } from 'wouter';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ 
  title, 
  description = "Read about the experiences of travelers who have explored the world with us",
  testimonials 
}: TestimonialsSectionProps) => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-3">{title}</h2>
          {description && <p className="text-neutral-600 max-w-2xl mx-auto">{description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              tourName={index === 0 ? "Paris Cultural Tour" : 
                        index === 1 ? "Bali Temple Tour" : "Santorini Sunset Cruise"}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/reviews" className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-md transition-all">
            Read More Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
