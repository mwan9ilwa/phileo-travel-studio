import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedDestinations from '@/components/sections/FeaturedDestinations';
import FeaturedTours from '@/components/sections/FeaturedTours';
import ExperienceSection from '@/components/sections/ExperienceSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactCTA from '@/components/sections/ContactCTA';
import { homepage } from '@/utils/data';
import { getFeaturedDestinations, getFeaturedTours } from '@/utils/data';

const HomePage = () => {
  const { data: featuredDestinations = [] } = useQuery({
    queryKey: ['/destinations/featured'],
    queryFn: () => getFeaturedDestinations(),
    initialData: getFeaturedDestinations(),
  });

  const { data: featuredTours = [] } = useQuery({
    queryKey: ['/tours/featured'],
    queryFn: () => getFeaturedTours(),
    initialData: getFeaturedTours(),
  });

  // Find the testimonials section
  const testimonialsSection = homepage.sections.find(
    section => section.__component === 'homepage.section-testimonials'
  );

  return (
    <>
      <HeroSection
        title={homepage.heroTitle}
        description={homepage.heroDescription}
        image={homepage.heroImage}
      />
      
      <FeaturedDestinations
        title="Featured Destinations"
        destinations={featuredDestinations}
      />
      
      <FeaturedTours
        title="Popular Tours"
        tours={featuredTours}
      />
      
      <ExperienceSection
        title="Crafting Unique Travel Experiences"
        description={[
          "At Phileo Travel Studio, we believe that travel should be transformative. Our team of seasoned travel experts specializes in creating personalized journeys that go beyond the ordinary tourist trail.",
          "Whether you're seeking cultural immersion, culinary adventures, or off-the-beaten-path explorations, we'll design an itinerary that reflects your unique interests and travel style."
        ]}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80"
        benefits={[
          {
            title: "Expert Guides",
            description: "Local knowledge and insights"
          },
          {
            title: "Personalized Service",
            description: "Tailored to your preferences"
          },
          {
            title: "Authentic Experiences",
            description: "Beyond tourist attractions"
          },
          {
            title: "24/7 Support",
            description: "Assistance throughout your journey"
          }
        ]}
      />
      
      {testimonialsSection && 'testimonials' in testimonialsSection && (
        <TestimonialsSection
          title={testimonialsSection.title}
          testimonials={testimonialsSection.testimonials}
        />
      )}
      
      <ContactCTA
        title="Ready to Start Your Journey?"
        description="Let our travel experts help you plan your perfect trip. Tell us your dream destination and preferences, and we'll handle the rest."
      />
    </>
  );
};

export default HomePage;
