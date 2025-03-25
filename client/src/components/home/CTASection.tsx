import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
          Join thousands of travelers who have experienced our carefully crafted tours. Let us help you create memories that last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/destinations" className="btn-white">
            Browse Destinations
          </Link>
          <Link href="/contact" className="btn-outline-white">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
