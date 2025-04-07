import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import logoPath from '../../assets/logo2.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="relative z-10">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src={logoPath} alt="Phileo Travel Studio" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-primary font-display text-2xl font-bold leading-tight">Phileo Travel Studio</span>
                {/* <span className="text-neutral-600 font-display text-sm leading-tight">Travel Studio</span> */}
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className={`nav-link ${isActive('/') ? 'text-primary' : 'text-neutral-700'}`}>
                Home
              </Link>
              <Link href="/destinations" className={`nav-link ${isActive('/destinations') ? 'text-primary' : 'text-neutral-700'}`}>
                Destinations
              </Link>
              <Link href="/tours" className={`nav-link ${isActive('/tours') ? 'text-primary' : 'text-neutral-700'}`}>
                Tours
              </Link>
              <Link href="/activities" className={`nav-link ${isActive('/activities') ? 'text-primary' : 'text-neutral-700'}`}>
                Activities
              </Link>
              <Link href="/about" className={`nav-link ${isActive('/about') ? 'text-primary' : 'text-neutral-700'}`}>
                About
              </Link>
              <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'text-primary' : 'text-neutral-700'}`}>
                Contact
              </Link>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu} 
                className="text-neutral-700 focus:outline-none"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full">
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
              <Link href="/" className="py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded">
                Home
              </Link>
              <Link href="/destinations" className="py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded">
                Destinations
              </Link>
              <Link href="/tours" className="py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded">
                Tours
              </Link>
              <Link href="/activities" className="py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded">
                Activities
              </Link>
              <Link href="/about" className="py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded">
                About
              </Link>
              <Link href="/contact" className="py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
