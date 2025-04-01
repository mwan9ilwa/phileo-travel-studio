import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Users, 
  Heart, 
  Shield, 
  Compass, 
  Award, 
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Phileo Travel Studio</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          We're on a mission to make travel experiences accessible to everyone,
          connecting travelers with authentic local experiences worldwide.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
          <p className="mb-4 text-gray-600">
            Founded in 2018, Phileo Travel Studio began with a simple idea: to create a travel
            platform that connects travelers with authentic experiences while
            supporting local communities.
          </p>
          <p className="mb-4 text-gray-600">
            What started as a small team of passionate travelers has grown into a
            global network connecting thousands of travelers with local tour
            operators, activities, and accommodations in over 50 countries.
          </p>
          <p className="text-gray-600">
            Our platform helps travelers discover hidden gems, support local
            businesses, and create meaningful connections through travel
            experiences that go beyond the typical tourist attractions.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop"
            alt="Team meeting"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Globe className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Sustainability</h3>
              <p className="text-gray-600">
                We promote eco-friendly travel options and partner with
                organizations committed to environmental sustainability.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Users className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Community</h3>
              <p className="text-gray-600">
                We support local communities by partnering with local businesses
                and promoting cultural exchange.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Heart className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Authenticity</h3>
              <p className="text-gray-600">
                We curate genuine experiences that showcase the true essence of
                each destination and its culture.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Shield className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Trust</h3>
              <p className="text-gray-600">
                We ensure safety, reliability, and transparency in all our
                services and partnerships.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Meet Our Team</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-60 w-60 overflow-hidden rounded-full">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop"
                alt="CEO"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Michael Carter</h3>
            <p className="text-gray-600">Co-Founder & CEO</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 h-60 w-60 overflow-hidden rounded-full">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop"
                alt="COO"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Sophia Chen</h3>
            <p className="text-gray-600">Co-Founder & COO</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 h-60 w-60 overflow-hidden rounded-full">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop"
                alt="CTO"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">David Martinez</h3>
            <p className="text-gray-600">CTO</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 h-60 w-60 overflow-hidden rounded-full">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop"
                alt="CMO"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Emma Wilson</h3>
            <p className="text-gray-600">CMO</p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-16 rounded-2xl bg-gray-50 p-8">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Achievements</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Compass className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-4xl font-bold">50+</h3>
            <p className="text-gray-600">Countries Covered</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Users className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-4xl font-bold">100,000+</h3>
            <p className="text-gray-600">Happy Travelers</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Award className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-4xl font-bold">15+</h3>
            <p className="text-gray-600">Industry Awards</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">What People Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                "Phileo Travel Studio helped me discover hidden gems in Japan that I never
                would have found on my own. Their local guides were knowledgeable
                and passionate. An unforgettable experience!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1557555187-23d685287bc3?q=80&w=100&auto=format&fit=crop"
                    alt="Customer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Tokyo Explorer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                "Their commitment to sustainability is what drew me to Phileo Travel Studio,
                but the amazing experiences they curated in Costa Rica exceeded all
                my expectations. Will definitely book with them again!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop"
                    alt="Customer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Marcus Bennett</h4>
                  <p className="text-sm text-gray-600">Eco-Traveler</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                "As a solo female traveler, safety is my top priority. Phileo Travel Studio
                not only ensured I felt secure throughout my journey in Morocco,
                but also connected me with incredible local experiences."
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=100&auto=format&fit=crop"
                    alt="Customer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Elena Rodriguez</h4>
                  <p className="text-sm text-gray-600">Adventure Seeker</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 gap-8 rounded-2xl bg-gray-50 p-8 md:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <MapPin className="mb-4 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-xl font-bold">Our Office</h3>
          <p className="text-gray-600">
            123 Travel Lane, Suite 456<br />
            San Francisco, CA 94105<br />
            United States
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Phone className="mb-4 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-xl font-bold">Phone</h3>
          <p className="text-gray-600">
            +1 (555) 123-4567<br />
            Monday - Friday: 9am - 6pm<br />
            Saturday: 10am - 4pm
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Mail className="mb-4 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-xl font-bold">Email</h3>
          <p className="text-gray-600">
            info@Phileo Travel Studio.com<br />
            support@Phileo Travel Studio.com<br />
            partnerships@Phileo Travel Studio.com
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Join Our Journey</h2>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          Ready to explore the world with us? Join our community of travelers and
          start planning your next adventure.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg">
            Explore Tours
          </Button>
          <Button variant="outline" size="lg">
            Become a Partner
          </Button>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <Facebook className="h-6 w-6 text-gray-600 hover:text-primary" />
          <Instagram className="h-6 w-6 text-gray-600 hover:text-primary" />
          <Twitter className="h-6 w-6 text-gray-600 hover:text-primary" />
          <Linkedin className="h-6 w-6 text-gray-600 hover:text-primary" />
        </div>
      </div>
    </div>
  );
}