import { Testimonial } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  testimonial: Testimonial;
  tourName?: string;
}

const TestimonialCard = ({ testimonial, tourName }: TestimonialCardProps) => {
  const { author, comment, rating, avatar } = testimonial;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${i < rating ? 'text-secondary' : 'text-gray-300'}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="italic text-neutral-600 mb-6">"{comment}"</p>
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          {avatar && <AvatarImage src={avatar} alt={author} />}
          <AvatarFallback className="bg-neutral-300 text-neutral-700 font-bold">
            {author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold text-neutral-800">{author}</h4>
          {tourName && <p className="text-sm text-neutral-500">{tourName}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
