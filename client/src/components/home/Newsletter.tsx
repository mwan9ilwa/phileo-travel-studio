import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-12 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold font-playfair mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-neutral-medium">Get exclusive travel deals, insider tips, and inspiration delivered to your inbox</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className={`flex-grow px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-red-500' : 'border-neutral-light'}`}
              required
              disabled={isSubmitting || isSuccess}
            />
            <button 
              type="submit" 
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition font-medium whitespace-nowrap disabled:opacity-70"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? 'Subscribing...' : isSuccess ? 'Subscribed!' : 'Subscribe Now'}
            </button>
          </form>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {isSuccess && <p className="text-green-500 text-xs mt-2">Successfully subscribed! Thank you.</p>}
          <p className="text-neutral-medium text-xs mt-4 text-center">By subscribing, you agree to our Privacy Policy and consent to receive travel-related emails.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
