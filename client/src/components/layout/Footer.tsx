import { Link } from "wouter";
import { Globe, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-darkest text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="text-primary text-2xl mr-2" />
              <span className="text-xl font-bold font-playfair text-white">Voyageur</span>
            </div>
            <p className="text-neutral-light mb-4">
              Creating unforgettable travel experiences since 2010. Our expert team crafts journeys that combine adventure, culture, and relaxation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li><Link href="/destinations?continent=europe" className="text-neutral-light hover:text-white">Europe</Link></li>
              <li><Link href="/destinations?continent=asia" className="text-neutral-light hover:text-white">Asia</Link></li>
              <li><Link href="/destinations?continent=africa" className="text-neutral-light hover:text-white">Africa</Link></li>
              <li><Link href="/destinations?continent=north-america" className="text-neutral-light hover:text-white">North America</Link></li>
              <li><Link href="/destinations?continent=south-america" className="text-neutral-light hover:text-white">South America</Link></li>
              <li><Link href="/destinations?continent=oceania" className="text-neutral-light hover:text-white">Australia & Oceania</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral-light hover:text-white">About Us</Link></li>
              <li><Link href="/tours" className="text-neutral-light hover:text-white">Tours</Link></li>
              <li><Link href="/activities" className="text-neutral-light hover:text-white">Activities</Link></li>
              <li><Link href="/accommodations" className="text-neutral-light hover:text-white">Accommodations</Link></li>
              <li><Link href="/blog" className="text-neutral-light hover:text-white">Travel Blog</Link></li>
              <li><Link href="/faq" className="text-neutral-light hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-neutral-light">123 Travel Street, Voyageur Tower, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-neutral-light">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-neutral-light">info@voyageur.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-neutral-dark my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-light text-sm mb-4 md:mb-0">© 2023 Voyageur. All rights reserved.</p>
          <div className="flex space-x-4 text-sm text-neutral-light">
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
