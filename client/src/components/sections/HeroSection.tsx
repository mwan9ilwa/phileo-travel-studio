import { Link } from 'wouter';

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const HeroSection = ({
  title,
  description,
  image,
  primaryButtonText = "Explore Destinations",
  primaryButtonLink = "/destinations",
  secondaryButtonText = "Plan Your Trip",
  secondaryButtonLink = "/contact"
}: HeroSectionProps) => {
  return (
    <section className="relative h-[70vh] bg-neutral-800">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40"></div>
      </div>
      <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
            {title}
          </h1>
          <div className="text-lg md:text-xl text-neutral-100 mb-8" dangerouslySetInnerHTML={{ __html: description }} />
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href={primaryButtonLink} className="inline-block bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-all">
              {primaryButtonText}
            </Link>
            <Link href={secondaryButtonLink} className="inline-block bg-secondary hover:bg-secondary-600 text-neutral-800 font-medium py-3 px-6 rounded-md transition-all">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
