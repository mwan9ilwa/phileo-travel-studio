import { useQuery } from '@tanstack/react-query';
import { about } from '@/utils/data';
import ContactCTA from '@/components/sections/ContactCTA';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Map,
  Globe,
  Hotel,
  User,
  CalendarCheck,
  LifeBuoy,
  ExternalLink
} from 'lucide-react';

const AboutPage = () => {
  const { data: aboutData } = useQuery({
    queryKey: ['/about'],
    queryFn: () => about,
    initialData: about,
  });

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'map':
        return <Map className="h-10 w-10 text-primary" />;
      case 'globe':
        return <Globe className="h-10 w-10 text-primary" />;
      case 'hotel':
        return <Hotel className="h-10 w-10 text-primary" />;
      case 'user':
        return <User className="h-10 w-10 text-primary" />;
      case 'calendar-check':
        return <CalendarCheck className="h-10 w-10 text-primary" />;
      case 'life-buoy':
        return <LifeBuoy className="h-10 w-10 text-primary" />;
      default:
        return <Globe className="h-10 w-10 text-primary" />;
    }
  };

  return (
    <>
      <section className="relative h-[50vh] bg-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-0 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              About Phileo Travel Studio
            </h1>
            <p className="text-lg md:text-xl text-neutral-100">
              Learn about our story, our mission, and the passionate team behind our travel experiences
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose lg:prose-xl mx-auto" dangerouslySetInnerHTML={{ __html: aboutData.content }} />
          </div>
        </div>
      </section>

      {aboutData.services && aboutData.services.length > 0 && (
        <section className="py-16 bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-4 text-center">
              Our Services
            </h2>
            <p className="text-neutral-600 text-lg text-center max-w-3xl mx-auto mb-12">
              Experience exceptional travel services designed to make your journey unforgettable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutData.services.map((service) => (
                <div key={service.id} className="p-6 bg-neutral-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex justify-center md:justify-start">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-center md:text-left">{service.title}</h3>
                  <p className="text-neutral-600 text-center md:text-left">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {aboutData.teamMembers.length > 0 && (
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {aboutData.teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.title}</p>
                    <p className="text-neutral-600 mb-4">{member.bio}</p>
                    
                    <div className="flex space-x-3">
                      {Object.entries(member.socialLinks).map(([platform, url]) => 
                        url ? (
                          <a 
                            key={platform} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-primary transition-colors"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {aboutData.partners && aboutData.partners.length > 0 && (
        <section className="py-16 bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-4 text-center">
              Our Partners
            </h2>
            <p className="text-neutral-600 text-lg text-center max-w-3xl mx-auto mb-12">
              We collaborate with trusted partners worldwide to provide you with exceptional travel experiences.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {aboutData.partners.map((partner) => (
                <a 
                  key={partner.id} 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="h-12 object-contain mb-3" 
                    />
                    <p className="text-sm font-medium text-neutral-700 text-center">{partner.name}</p>
                    <div className="text-primary flex items-center mt-1 text-xs">
                      <span className="mr-1">Visit</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        title="Ready to Travel with Us?"
        description="Contact our team to start planning your next adventure. We're here to help create your perfect travel experience."
      />
    </>
  );
};

export default AboutPage;
