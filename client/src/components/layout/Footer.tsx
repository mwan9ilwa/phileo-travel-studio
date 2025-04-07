import { Link } from 'wouter';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import logoPath from '../../assets/logo1.png';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <img src={logoPath} alt="Phileo Travel Studio" className="h-20 w-auto" />
              {/* <div className="flex flex-col">
                <span className="text-white font-display text-2xl font-bold leading-tight">Phileo</span>
                <span className="text-neutral-400 font-display text-sm leading-tight">Travel Studio</span>
              </div> */}
            </div>
            <p className="mb-4">Your one stop travel shop dedicated to you...</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Tours</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <li><Link href="/destinations/paris" className="hover:text-white transition-colors">Paris, France</Link></li>
              <li><Link href="/destinations/bali" className="hover:text-white transition-colors">Bali, Indonesia</Link></li>
              <li><Link href="/destinations/santorini" className="hover:text-white transition-colors">Santorini, Greece</Link></li>
              <li><Link href="/destinations/kyoto" className="hover:text-white transition-colors">Kyoto, Japan</Link></li>
              <li><Link href="/destinations/costa-rica" className="hover:text-white transition-colors">Costa Rica</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors">View All Destinations</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mt-1 mr-3 text-neutral-400">📍</span>
                <span>Plot #17, Nangwenya Road, Rhodes Park, Lusaka.</span>
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-3 text-neutral-400">📞</span>
                <span>+260970629899</span>
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-3 text-neutral-400">✉️</span>
                <span>phileo.travelstudio@gmail.com</span>
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-3 text-neutral-400">🕒</span>
                <span>Mon-Fri: 8:00 am - 5:00 pm CAT</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Phileo Travel Studio. All rights reserved.</p>
          <div className="flex space-x-4 text-sm">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
