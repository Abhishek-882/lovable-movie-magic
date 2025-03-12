
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="relative text-2xl font-semibold tracking-tight z-10"
          >
            <span className="text-gradient">Cinematic</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink 
              to="/movies" 
              isActive={location.pathname.includes("/movies") && location.pathname !== "/movies/coming-soon"}
            >
              Now Showing
            </NavLink>
            <NavLink 
              to="/movies/coming-soon" 
              isActive={location.pathname === "/movies/coming-soon"}
            >
              Coming Soon
            </NavLink>
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/search"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Search
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center justify-center h-10 px-4 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  {user?.name.split(' ')[0] || 'Account'}
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Bookings
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow"
              >
                Sign In
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm transition-all-300 ${
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden py-0"
        }`}
      >
        <div className="container mx-auto px-4 space-y-4">
          <MobileNavLink to="/" isActive={location.pathname === "/"}>
            Home
          </MobileNavLink>
          <MobileNavLink 
            to="/movies" 
            isActive={location.pathname.includes("/movies") && location.pathname !== "/movies/coming-soon"}
          >
            Now Showing
          </MobileNavLink>
          <MobileNavLink 
            to="/movies/coming-soon" 
            isActive={location.pathname === "/movies/coming-soon"}
          >
            Coming Soon
          </MobileNavLink>
          <MobileNavLink to="/search" isActive={location.pathname === "/search"}>
            Search
          </MobileNavLink>
          
          {isAuthenticated ? (
            <>
              <MobileNavLink to="/profile" isActive={location.pathname === "/profile"}>
                My Profile
              </MobileNavLink>
              <MobileNavLink to="/bookings" isActive={location.pathname === "/bookings"}>
                My Bookings
              </MobileNavLink>
              <div className="pt-2 pb-1">
                <button 
                  onClick={logout}
                  className="flex items-center justify-center w-full h-12 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 pb-1">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center justify-center w-full h-12 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab="login"
      />
    </header>
  );
};

// Desktop navigation link component
const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => (
  <Link 
    to={to}
    className={`text-sm font-medium transition-colors ${
      isActive ? "text-primary" : "text-gray-700 hover:text-primary"
    }`}
  >
    {children}
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => (
  <Link 
    to={to}
    className={`block py-2 text-base font-medium transition-colors ${
      isActive ? "text-primary" : "text-gray-700"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
