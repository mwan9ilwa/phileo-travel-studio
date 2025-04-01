import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import FeaturedTours from "@/components/home/FeaturedTours";
import Activities from "@/components/home/Activities";
import Accommodations from "@/components/home/Accommodations";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import Newsletter from "@/components/home/Newsletter";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Set document title
    document.title = "Phileo Travel Studio | Discover Amazing Destinations";
  }, []);

  return (
    <main>
      <HeroSection />
      <FeaturedDestinations />
      <FeaturedTours />
      <Activities />
      <Accommodations />
      <Testimonials />
      <CTASection />
      <Newsletter />
    </main>
  );
};

export default Home;
