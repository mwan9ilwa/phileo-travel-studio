import { useQuery } from '@tanstack/react-query';
import { about } from '@/utils/data';
import ContactCTA from '@/components/sections/ContactCTA';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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

      <ContactCTA
        title="Ready to Travel with Us?"
        description="Contact our team to start planning your next adventure. We're here to help create your perfect travel experience."
      />
    </>
  );
};

export default AboutPage;
