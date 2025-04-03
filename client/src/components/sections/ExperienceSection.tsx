import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';

interface ExperienceBenefit {
  title: string;
  description: string;
}

interface ExperienceSectionProps {
  title: string;
  description: string[];
  image: string;
  benefits: ExperienceBenefit[];
  buttonText?: string;
  buttonLink?: string;
}

const ExperienceSection = ({
  title,
  description,
  image,
  benefits,
  buttonText = "About Our Approach",
  buttonLink = "/about"
}: ExperienceSectionProps) => {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-6">{title}</h2>
            {description.map((paragraph, index) => (
              <p key={index} className="text-neutral-600 mb-6">{paragraph}</p>
            ))}
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-primary h-5 w-5 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-neutral-700 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-neutral-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href={buttonLink} className="inline-block bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-all">
              {buttonText}
            </Link>
          </div>
          
          <div className="relative">
            <img 
              src={image} 
              alt="Travel experience" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-neutral-700 font-medium">500+ 5-star reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
