import { Link } from 'wouter';

interface ContactCTAProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

const ContactCTA = ({
  title,
  description,
  primaryButtonText = "Contact Us",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Browse Destinations",
  secondaryButtonLink = "/destinations",
  backgroundImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
}: ContactCTAProps) => {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={backgroundImage} 
          alt="World map" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white/80 text-lg mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryButtonLink} className="inline-block bg-white text-primary hover:bg-neutral-100 font-medium py-3 px-8 rounded-md transition-all">
              {primaryButtonText}
            </Link>
            <Link href={secondaryButtonLink} className="inline-block bg-secondary hover:bg-secondary-600 text-neutral-800 font-medium py-3 px-8 rounded-md transition-all">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
