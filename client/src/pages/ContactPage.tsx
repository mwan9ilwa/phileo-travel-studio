import { useQuery } from '@tanstack/react-query';
import { contact } from '@/utils/data';
import ContactCTA from '@/components/sections/ContactCTA';
import InquiryForm from '@/components/forms/InquiryForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const { data: contactData } = useQuery({
    queryKey: ['/contact'],
    queryFn: () => contact,
    initialData: contact,
  });

  return (
    <>
      <section className="relative h-[40vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-neutral-100">
              Get in touch with our travel experts to plan your perfect trip
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-neutral-800 mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Address</h3>
                    <p className="text-neutral-600">{contactData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-neutral-600">{contactData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-neutral-600">{contactData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                    <p className="text-neutral-600">Monday - Friday: 8am - 5pm CAT</p>
                    <p className="text-neutral-600">Saturday: 9am - 12pm CAT</p>
                    <p className="text-neutral-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden h-64 w-full">
                <div dangerouslySetInnerHTML={{ __html: contactData.googleMapsEmbed }} />
              </div>
            </div>
            
            <div>
              <h2 className="font-display text-3xl font-bold text-neutral-800 mb-8">Travel Inquiry Form</h2>
              <div className="bg-neutral-50 p-6 md:p-8 rounded-lg shadow-md">
                <InquiryForm contact={contactData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Ready for Your Next Adventure?"
        description="Follow us on social media for travel inspiration, tips, and exclusive offers."
        primaryButtonText="Follow on Instagram"
        primaryButtonLink="https://instagram.com/phileotravelstudio"
        secondaryButtonText="Like on Facebook"
        secondaryButtonLink="https://web.facebook.com/phileo.travel"
      />
    </>
  );
};

export default ContactPage;
