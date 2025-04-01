import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, ChevronDown, Search } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo-header.png" 
                alt="Phileo Travel Studio Logo" 
                className="h-10 mr-2" 
              />
              <span className="text-2xl font-bold font-playfair text-primary">Phileo Travel Studio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/destinations" className={`font-medium ${isActive('/destinations') ? 'text-primary' : 'hover:text-primary'}`}>Destinations</Link>
            <Link href="/tours" className={`font-medium ${isActive('/tours') ? 'text-primary' : 'hover:text-primary'}`}>Tours</Link>
            <Link href="/activities" className={`font-medium ${isActive('/activities') ? 'text-primary' : 'hover:text-primary'}`}>Activities</Link>
            <Link href="/accommodations" className={`font-medium ${isActive('/accommodations') ? 'text-primary' : 'hover:text-primary'}`}>Accommodations</Link>
            <Link href="/about" className={`font-medium ${isActive('/about') ? 'text-primary' : 'hover:text-primary'}`}>About Us</Link>
            <Link href="/contact" className={`font-medium ${isActive('/contact') ? 'text-primary' : 'hover:text-primary'}`}>Contact</Link>
          </nav>

          {/* Auth and Search */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-lightest rounded-full">
              <Search className="h-5 w-5 text-neutral-medium" />
            </button>
            {/* <button className="hidden md:block btn-secondary">
              Sign In
            </button>
            <button className="hidden md:block btn-primary">
              Sign Up
            </button> */}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-neutral-lightest"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-neutral-dark" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-white border-t ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          <Link href="/destinations" className="block px-3 py-2 rounded-md hover:bg-neutral-lightest">Destinations</Link>
          <Link href="/tours" className="block px-3 py-2 rounded-md hover:bg-neutral-lightest">Tours</Link>
          <Link href="/activities" className="block px-3 py-2 rounded-md hover:bg-neutral-lightest">Activities</Link>
          <Link href="/accommodations" className="block px-3 py-2 rounded-md hover:bg-neutral-lightest">Accommodations</Link>
          <Link href="/about" className="block px-3 py-2 rounded-md hover:bg-neutral-lightest">About Us</Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md hover:bg-neutral-lightest">Contact</Link>
          <div className="pt-4 flex space-x-3">
            <button className="flex-1 btn-secondary">
              Sign In
            </button>
            <button className="flex-1 btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;